import React, { useState, useEffect, useRef } from 'react';

const MySvg2 = () => {
    const [width, setWidth] = useState(300);
    const [height, setHeight] = useState(300);
    const [radius, setRadius] = useState(10);//进度条厚度
    const [progress, setProgress] = useState(70);//进度条百分比
    const [barColor, setBarColor] = useState("#f66");//进度条颜色
    const [bgColor, setBgColor] = useState("#666");//背景色
    const [isAnimation, setIsAnimation] = useState(false);//是否动画效果
    const [isRound, setIsRound] = useState(true);//是否圆形画笔
    const [duration, setDuration] = useState(1000);//动画时长
    const [timeFunciton, setTimefunction] = useState("cubic-bezier(0.99, 0.01, 0.22, 0.94)");//动画缓冲函数

    const annulus = useRef();
    useEffect(() => {
        init();

    }, []);
    const init = () => {


    }
    return (
        <>
            
            <svg width={width} height={height} style={{ transform: "rotate(-90deg)" }}>
                <circle
                    r={(width - radius * 2) / 2}
                    cy={width / 2}
                    cx={width / 2}
                    strokeWidth={radius}
                    stroke={bgColor}
                    fill="none"
                />
                {/* r:半径
                cx,cy:圆心
                stroke:线条颜色
                stroke-width:线条粗细
                stroke-linecap:线条两端类型（圆滑还是矩形）
                stroke-dasharray：线条类型（虚线还是实线），参数为数值
                stroke-dashoffset：线条两端距离 */}
                <circle
                    ref={annulus}
                    r={(width - radius * 2) / 2}
                    cy={width / 2}
                    cx={width / 2}
                    stroke={barColor}
                    strokeWidth={radius + 10}
                    strokeLinecap={isRound ? 'round' : 'square'}
                    strokeDasharray={(width - radius) * 3.14}
                    strokeDashoffset={isAnimation ? (width - radius) * 3.14 : (width - radius) * 3.14 * (100 - progress) / 100}
                    fill="none"
                />
                <text x={width / 10} y={-width / 2} fill="#F66" fontSize="35" transform="rotate(90)">SVG实现环形图</text>
            </svg>
        </>
    )
}
export default MySvg2;
