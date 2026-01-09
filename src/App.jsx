import './App.css'

import Header from './components/Header';
import Editor from './components/Editor';
import List from './components/List';
import {useRef, useReducer, useCallback, createContext, useMemo} from "react";

const mockData = [
    {
        id: 0, isDone: false,
        content: "React 공부하기",
        date: Date.now(),
    },
    {
        id: 1,
        isDone: false,
        content: "빨래하기",
        date: Date.now(),
    },
    {
        id: 2,
        isDone: false,
        content: "노래 연습하기",
        date: Date.now(),
    }
];

function reducer(state, action) {
    switch (action.type) {
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
    const [todos, dispatch] = useReducer(reducer, mockData);
    const idRef = useRef(3);

    // Mount 시 한번만 생성 by useCallback
    const onCreate = useCallback((content) => {
        dispatch({
            type: "CREATE",
            data: {
                id: idRef.current++,
                isDone: false, content,
                date: Date.now(),
            }
        });
    }, []);

    // Mount 시 한번만 생성 by useCallback
    const onUpdate = useCallback((targetId) => {
        dispatch({
            type: "UPDATE", targetId: targetId,
        });
    }, []);

    // Mount 시 한번만 생성 by useCallback
    const onDelete = useCallback((targetId) => {
        dispatch({
            type: "DELETE", targetId: targetId,
        });
    }, []);

    // 렌더링시 제외시킴
    const memoizedDispatch = useMemo(()=> {
        return { onCreate, onUpdate, onDelete};
    }, []);

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
