import React, { useEffect } from "react";
import { message } from 'antd';
import AMapLoader from '@amap/amap-jsapi-loader';
import { httpPost } from "../../../../api/request";
import api from "../../../../api/api";
import "./map.css";
const MyMap = () => {
    useEffect(() => {
        httpPost(api.getMarkList).then(res => {
            if (res.status === 1) {
                message.success('获取标记成功');
                var arr = [];
                res.data.forEach(item => {
                    var obj = {
                        position: [item.lng, item.lat],
                        title: item.city + item.name
                    }
                    arr.push(obj)
                })
                mapInit(arr)
            }
        })
    }, []);
    const mapInit = (list) => {
        AMapLoader.load({
            "key": "d344df847a9da05ac91253d6d06712e9",
            "version": "2.0",
            "plugins": [],
        }).then(AMap => {
            var arr = [];
            const map = new AMap.Map("container", {
                zoom: 10,//级别
                center: [120.211981, 30.208332],//中心点坐标
                viewMode: "2D",//使用3D地图
            })
            list.forEach(item => {
                map.add(new AMap.Marker(item))
                arr.push(new AMap.LngLat(item.position[0], item.position[1]))
            });
            // 绘制轨迹
            let polyline = new AMap.Polyline({
                map: map,
                path: arr,
                showDir: true,
                strokeColor: "#28F",  //线颜色
                strokeWeight: 6,      //线宽
                strokeOpacity: 1,     //线透明度
                strokeStyle: "solid"  //线样式
            });
            map.add(polyline);
        }).catch(e => {
            console.log(e)
        })
    }
    return (
        <>
            <div className="map">
                <div id="container" style={{ width: "100%", height: 400 }}></div>
            </div>
        </>
    )
}
export default MyMap;