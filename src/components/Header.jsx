import "./Header.css"
import { memo } from "react";

const Header = () => {
    return (
        <div className={"Header"}>
            <h3>오늘은 📅</h3>
            <h1>{ new Date().toDateString() }</h1>
        </div>
    )
}

// 최적화 : 헤더는 변경 불필요
export default memo(Header);