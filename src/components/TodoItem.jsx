import "./TodoItem.css"
import {memo, useContext} from "react";
import {TodoDispatchContext} from "../App.jsx";

const TodoItem = ({id, content, date, isDone}) => {
    const {onUpdate, onDelete} = useContext(TodoDispatchContext);
    const onChangeCheckBox = () => {
        onUpdate(id);
    };

    const onClickDelete = () => {
        onDelete(id);
    };

    return (
        <div className={"TodoItem"}>
            <input type={"checkbox"} checked={isDone} onChange={onChangeCheckBox}/>
            <div className={"content"}>{content}</div>
            <div className={"date"}>{new Date(date).toLocaleDateString()}</div>
            <button onClick={onClickDelete}>삭제</button>
        </div>
    )
}

// 고차 컴포넌트 (HOC)
/*
const areTodoItemPropsEqual = (prevProps, nextProps) => {
    // 반환값에 따라, Props가 바뀌었는지 판단
    // True -> Props 바뀌지 않음 -> 리렌더링 X
    // False -> Props 바뀜 -> 리렌더링 O
    return prevProps.isDone === nextProps.isDone &&
        prevProps.content === nextProps.content &&
        prevProps.date === nextProps.date &&
        prevProps.id === nextProps.id;
};
 */

export default memo(TodoItem);