import * as echarts from 'echarts'// 引入 ECharts 主模块
import React, { useEffect } from "react";

const MyLine = () => {
    useEffect(() => {
        init();
    }, []);
    const init = () => {
        let myChart = echarts.getInstanceByDom(document.getElementById('myline'));
        if (myChart === undefined) {
            myChart = echarts.init(document.getElementById('myline'));
        }
        let option = {
            title: {
                text: 'Temperature Change in the Coming Week'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {},
            color: ["#f66", "#333"],
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value} °C'
                }
            },
            series: [
                {
                    name: 'Highest',
                    type: 'line',
                    data: [10, 11, 13, 11, 12, 12, 9],
                    markPoint: {
                        data: [
                            { type: 'max', name: 'Max' },
                            { type: 'min', name: 'Min' }
                        ]
                    },
                    markLine: {
                        data: [{ type: 'average', name: 'Avg' }]
                    }
                },
                {
                    name: 'Lowest',
                    type: 'line',
                    data: [1, -2, 2, 5, 3, 2, 0],
                    markPoint: {
                        data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }]
                    },
                    markLine: {
                        data: [
                            { type: 'average', name: 'Avg' },
                            [
                                {
                                    symbol: 'none',
                                    x: '90%',
                                    yAxis: 'max'
                                },
                                {
                                    symbol: 'circle',
                                    label: {
                                        position: 'start',
                                        formatter: 'Max'
                                    },
                                    type: 'max',
                                    name: '最高点'
                                }
                            ]
                        ]
                    }
                }
            ]
        };
        myChart.setOption(option);
    }

    return (
        <>
            <div id='myline' style={{ width: "100%", height: 500 }}></div>
        </>
    )
}
export default MyLine;
