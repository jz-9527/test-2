import React, { useEffect, useRef, useState } from "react";

var timer = null;
const DownTime = () => {
    const [time, setTime] = useState("");
    const [downCount, setDownCount] = useState("00:00:00");
    const [is, setIs] = useState(true);
    const inp = useRef();
    useEffect(() => {
        
        return () => {
            clearInterval(timer);
            timer = null
        }
    }, [time])

    const timeFn = (str) => {
        var nowtime = 0;
        if (new Date(str).getTime() - new Date().getTime() > 0) {
            //倒计时
            nowtime = (new Date(str).getTime() - new Date().getTime()) / 1000;
        } else {
            //超时
            nowtime = (new Date().getTime() - new Date(str).getTime()) / 1000;
            setIs(false);
        }
        var h = parseInt(nowtime / 60 / 60 % 24);//剩余小时
        h = h < 10 ? "0" + h : h;
        var m = parseInt(nowtime / 60 % 60);//剩余分钟
        m = m < 10 ? "0" + m : m;
        var s = parseInt(nowtime % 60);//剩余秒
        s = s < 10 ? "0" + s : s;
        return `${h}:${m}:${s}`
    }

    const start = () => {
        clearInterval(timer);
        setTime(inp.current.value)
        timer = setInterval(() => {
            setDownCount(timeFn(time));
        }, 1000)
    }
    const stop = () => {
        clearInterval(timer);
    }
    const addTime = () => {
        //停止计时器
        clearInterval(timer);
        //给原定时间+10秒
        setTime(time => {
            let date = new Date(time).getTime() + 10 * 1000;
            var year= new Date(date).getFullYear();
            var mon= new Date(date).getMonth() + 1;
            mon = mon < 10 ? "0" + mon : mon;
            var day = new Date(date).getDate();
            day = day < 10 ? "0" + day : day;
            var h = new Date(date).getHours();//剩余小时
            h = h < 10 ? "0" + h : h;
            var m = new Date(date).getMinutes();//剩余分钟
            m = m < 10 ? "0" + m : m;
            var s = new Date(date).getSeconds();//剩余秒
            s = s < 10 ? "0" + s : s;
            console.log(`${year}-${mon}-${day} ${h}:${m}:${s}`)
            return `${year}-${mon}-${day} ${h}:${m}:${s}`
        })
        //开启计时器
        timer = setInterval(() => {
            setDownCount(timeFn(time));
        }, 1000)
    }
    return (
        <>
            <input type="text" ref={inp} />
            <button onClick={start}>开始</button>
            <button onClick={stop}>暂停</button>
            <button onClick={addTime}>加10秒</button>
            {is ? "倒计时" : "超时"}：{downCount}
        </>
    )
}
export default DownTime;