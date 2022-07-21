import React, { useState } from "react";
import { Button } from 'antd';
import api from "../../../../api/api";
import { requestLimits, TaskWork, Limits } from "../../../../useHook/myFunction";
//实现功能：
//请求同时最多只能进行3个
//任意请求结束，其他请求立马补充
//记录每个请求的执行结果
const RequestLimits = () => {
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([])
    const startReq = async () => {
        setLoading(true);
        let urlList = [
            { api: api.promiseTest1, methods: "POST", key: "test1", priority: 1 },
            { api: api.promiseTest2, methods: "POST", key: "test2", priority: 1 },
            { api: api.promiseTest3, methods: "POST", key: "test3", priority: 1 },
            { api: api.promiseTest4, methods: "GET", key: "test4", priority: 2 }
        ];
        const taskWork = new Limits();
        taskWork.start(urlList, 2);
        const res = await taskWork.getAll();
        console.log(res)
        setList(res)

        setLoading(false);
    }

    return (
        <>
            <Button loading={loading} onClick={startReq}>开始发送</Button>

            {
                list.map((item, index) => {
                    return <p key={index}>{item.data}</p>
                })
            }

        </>
    )
}
export default RequestLimits;

