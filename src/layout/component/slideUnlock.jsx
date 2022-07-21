//滑动验证功能
import React, { useEffect, useRef, useState } from "react";
import MyDialog from "./dialog";

//假设验证图片为40*40，外层图片为500*300
const SlideUnlock = () => {
    //验证状态
    const [status, setStatus] = useState(false);
    //X轴位置，滑块和阴影在同一个Y轴上
    const [positionSite, setPositionSite] = useState({x:0,y:0});
    //获取弹窗组件
    const dialog = useRef();
    //开始时生成随机位置
    useEffect(()=>{
        let x = Math.random()*(500-40);
        console.log(x)
    },[]);

    return (
        <>
            <MyDialog ref={dialog}>
                
            </MyDialog>
        </>
    )
}
export default SlideUnlock;