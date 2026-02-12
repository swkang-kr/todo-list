import './App.css'

import Header from './components/Header';
import Editor from './components/Editor';
import List from './components/List';
import {useRef, useReducer, useCallback, createContext, useMemo, useEffect} from "react";
import { db } from './firebase';
import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    orderBy,
    Timestamp
} from 'firebase/firestore';

function reducer(state, action) {
    switch (action.type) {
        case "INIT":
            return action.data;
        case "CREATE":
            return [action.data, ...state];
        case "UPDATE":
            return state.map((item) => item.id === action.targetId ? {...item, isDone: !item.isDone} : item);
        case "DELETE":
            return state.filter((item) => item.id !== action.targetId);
        default:
            return state;
    }
}

// 변경되는 값 : todos
export const TodoStateContext = createContext(undefined);
// 변경되지 않는 값 : onCreate, onUpdate, onDelete
export const TodoDispatchContext = createContext(undefined);

function App() {
    const [todos, dispatch] = useReducer(reducer, []);
    const idRef = useRef(3);

    // Firestore 실시간 동기화
    useEffect(() => {
        const q = query(collection(db, 'todos'), orderBy('date', 'desc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const todosData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                // Firestore Timestamp를 밀리초로 변환
                date: doc.data().date?.toMillis() || Date.now(),
            }));

            dispatch({
                type: "INIT",
                data: todosData
            });
        }, (error) => {
            console.error("Error fetching todos:", error);
        });

        return () => unsubscribe();
    }, []);

    // Mount 시 한번만 생성 by useCallback
    const onCreate = useCallback(async (content) => {
        try {
            const newTodo = {
                isDone: false,
                content,
                date: Timestamp.now(),
            };

            const docRef = await addDoc(collection(db, 'todos'), newTodo);

            // 로컬 상태 업데이트 (onSnapshot이 자동으로 처리하지만, 즉각적인 UI 반영을 위해)
            dispatch({
                type: "CREATE",
                data: {
                    id: docRef.id,
                    ...newTodo,
                    date: newTodo.date.toMillis(),
                }
            });
        } catch (error) {
            console.error("Error creating todo:", error);
        }
    }, []);

    // Mount 시 한번만 생성 by useCallback
    const onUpdate = useCallback(async (targetId) => {
        try {
            const todoRef = doc(db, 'todos', targetId);
            const currentTodo = todos.find(todo => todo.id === targetId);

            if (currentTodo) {
                await updateDoc(todoRef, {
                    isDone: !currentTodo.isDone
                });

                // 로컬 상태 업데이트 (onSnapshot이 자동으로 처리)
                dispatch({
                    type: "UPDATE",
                    targetId: targetId,
                });
            }
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    }, [todos]);

    // Mount 시 한번만 생성 by useCallback
    const onDelete = useCallback(async (targetId) => {
        try {
            await deleteDoc(doc(db, 'todos', targetId));

            // 로컬 상태 업데이트 (onSnapshot이 자동으로 처리)
            dispatch({
                type: "DELETE",
                targetId: targetId,
            });
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    }, []);

    // 렌더링시 제외시킴
    const memoizedDispatch = useMemo(()=> {
        return { onCreate, onUpdate, onDelete};
    }, [onCreate, onUpdate, onDelete]);

    return (
        <div className="App">
            <Header/>
            <TodoStateContext.Provider value={todos}>
                <TodoDispatchContext.Provider value={memoizedDispatch}>
                    <Editor/>
                    <List/>
                </TodoDispatchContext.Provider>
            </TodoStateContext.Provider>
        </div>
    );
}

export default App
