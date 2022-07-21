import React, { FC } from "react";
import MyMusicList from "./component/list.tsx";
import MyBtn from "./component/btn.tsx";
import MyFrom from "./component/from.tsx";

const My: FC = () => {
    return (
        <>
            <MyMusicList></MyMusicList>
            <MyBtn></MyBtn>
            <MyFrom></MyFrom>
        </>
    )
}
export default My;