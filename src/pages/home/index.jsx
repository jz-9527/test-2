import React from "react";
import MyPie from "./component/pie";
import MySvg1 from "./component/svgdemo1";
import MyLine from "./component/line";
import DownTime from "./component/downTime";
import JqueryWookMarkLoad from "./component/jqueryWookmarkLoad";
import "./index.css"
const Home = () => {
    return (
        <>
            <div className="home">
                <div className="home-item">
                    <MyPie></MyPie>
                </div>
                <div className="home-item">
                    <MyLine></MyLine>
                </div>
                <div className="home-item">
                    <MySvg1></MySvg1>
                </div>
                <div className="home-item">
                    <DownTime></DownTime>
                </div>
                <div className="home-item">
                    <JqueryWookMarkLoad></JqueryWookMarkLoad>
                </div>
            </div>
        </>
    )
}
export default Home;