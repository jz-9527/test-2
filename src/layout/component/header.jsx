import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./head.css"
import { CaretUpOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";
import Login from "./login";

const Head = () => {
    const [actNav, setNav] = useState(0);
    const [show, setShow] = useState(false);
    const name = useSelector((state) => state.counter.userName);
    const changeNav = (val) => {
        setNav(val)
    }

    const onlogin = useCallback(() => {
        setShow((show) => !show);
    }, [])

    useEffect(() => {
        const url = new URL(window.location.href);
        const path = url?.pathname;
        switch (path) {
            case "/home":
                setNav(0);
                break;
            case "/my":
                setNav(1);
                break;
            case "/friend":
                setNav(2);
                break;
            case "/download":
                setNav(3);
                break;
            default:
                setNav(0);
        }
    }, [])
    return (
        <>
            <div className="head">
                <ul>
                    <li className="nav-li">
                        <Link to="/">网易云音乐</Link>
                    </li>
                    <li className="nav-li">
                        <Link to="/home" onClick={() => changeNav(0)}>发现音乐</Link>
                        {
                            actNav === 0 ? <CaretUpOutlined className="nowNav" /> : null
                        }
                    </li>
                    <li className="nav-li">
                        <Link to="/my" onClick={() => changeNav(1)}>我的音乐</Link>
                        {
                            actNav === 1 ? <CaretUpOutlined className="nowNav" /> : null
                        }
                    </li>
                    <li className="nav-li">
                        <Link to="/friend" onClick={() => changeNav(2)}>关注</Link>
                        {
                            actNav === 2 ? <CaretUpOutlined className="nowNav" /> : null
                        }
                    </li>
                    <li className="nav-li">
                        <Link to="/download" onClick={() => changeNav(3)}>下载客户端</Link>
                        {
                            actNav === 3 ? <CaretUpOutlined className="nowNav" /> : null
                        }
                    </li>
                </ul>
                <div className="nav-li" onClick={onlogin}>{
                    name === "" ? "登录" : name
                }</div>
            </div>
            <Login show={show} onlogin={onlogin}></Login>
        </>
    )
}
export default Head;