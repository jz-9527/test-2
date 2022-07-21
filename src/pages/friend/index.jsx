import React from "react";
import MaMap from "./component/map/map";
import PrevShaking from "./component/function/preventShaking";
import FilesUpload from "./component/filesUpload/filesUpload";
import RequestLimits from "./component/function/requestLimits";
const Friend = ()=>{
   
    return (
        <>
            <MaMap></MaMap>
            <PrevShaking></PrevShaking>
            <FilesUpload></FilesUpload>
            <RequestLimits></RequestLimits>
        </>
    )
}
export default Friend;