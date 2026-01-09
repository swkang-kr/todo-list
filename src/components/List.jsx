import "./List.css"
import TodoItem from "./TodoItem";
import {useState, useMemo, useContext} from "react";
import {TodoStateContext} from "../App.jsx";

const List = () => {
    const todos = useContext(TodoStateContext);
    const [searchText, setSearchText] = useState("");
    const onChageSearchText = (e) => {
        setSearchText(e.target.value);
    };
    const getFilteredTodos = () => {
        if (!searchText) {
            return todos;
        }
        return todos.filter((todo) =>
            todo.content.toLowerCase().includes(searchText.toLowerCase())
        );
    };
    // 렌더링시 호출
    const filteredTodos = getFilteredTodos();

    // useMemo : 불필요한 연산 제거
    const {totalCount, doneCount, notDoneCount} = useMemo(()=> {
        const totalCount = todos.length;
        const doneCount = todos.filter((todo) => todo.isDone).length;
        const notDoneCount = totalCount - doneCount;

        return {
            totalCount, doneCount, notDoneCount
        }
    }, [todos]);

    return (
        <div className={"List"}>
            <h4>Todo List 🎶</h4>
            <div>
                <div>total : {totalCount}</div>
                <div>doneCount : {doneCount}</div>
                <div>notDoneCount : {notDoneCount}</div>
            </div>
            <input value={searchText} onChange={onChageSearchText} placeholder={"검색어를 입력하세요"}/>
            <div className={"todos_wrapper"}>
                {
                    filteredTodos.map((todo) => {
                        return <TodoItem key={todo.id} {...todo} />
                    })
                }
            </div>
        </div>
    )
}

export default List;