import React, { useEffect, useMemo, useState } from "react";

const PrevShaking = () => {
    const [count, setCount] = useState(0)
    const [num, setNum] = useState(0)
    const [value,setValue] = useState(0)
    const [a,setA] = useState(0);
    const [b,setB] = useState(0);
    //useEffect的return组件挂载和销毁的时候会执行一次
    useEffect(()=>{
        return ()=>{
            console.log("卸载");
        }
    },[count]);//数组中加入监听的状态,状态改变时也会触发return的内容
    const fn = useMemo(() => {
        //设置一个timer
        let timer = null;
        return () => {
            //如果延时器存在，则清空延时器
            if (timer) {
                clearTimeout(timer)
            }
            //设置延时器延长执行操作的时间
            //核心思想就是一直触发，就一直延长执行时间，啥时候不触发了就执行
            timer = setTimeout(() => {
                setCount(count => count + 1)
            }, 2000)
        }
    }, [count])
    const fn2 = useMemo(() => {
        //设置一个timer延时器
        let timer2 = null;
        return () => {
            //如果延时器不存在，就设置一个延时器
            if (!timer2) {
                timer2 = setTimeout(() => {
                    //延迟过后延迟器置空，触发
                    //核心思想就是在固定的时间间隔中执行操作，并清空延迟器
                    timer2 = null;
                    setNum(num => num + 1)
                }, 2000)
            }

        }
    }, [num])
    const fn3 = ()=>{
        console.log("11111")
        setValue((value)=>value+1)
    }
    const newValue = useMemo(()=>{
        console.log("9999999")
        var n = 0;
        for(var i=0;i<1000;i++){
            n+=1;
        }
        return n
    },[value]);

    useEffect(()=>{
        console.log("111111")
    },[a,b])
    const effectClickCount = ()=>{
        setA((a)=>a+1);
        setTimeout(()=>{
            setB((b)=>b+1);
        },2000)
    } 

    return (
        <>
            <button onClick={fn}>函数防抖</button>----count:{count}
            <button onClick={fn2}>函数节流</button>----num:{num}
            <button onClick={fn3}>自增</button>----num:{value}---{newValue}
            <button onClick={effectClickCount}>测试useEffect执行次数--a:{a}--b:{b}</button>
        </>
    )
}
export default PrevShaking;