import React, { FC, useEffect, useRef, useState } from "react";
import { Table, Input, message, Popconfirm, Button } from 'antd';
import { httpGet } from "../../../api/request";
import api from "../../../api/api";
import MyDialog from "../../../layout/component/dialog";
import SlideUnlock from "../../../layout/component/slideUnlock";
const { Search } = Input;

interface addItemType {
    "title": string,
    "subhead": string,
    "duration": string,
    "singer": string,
    "album": string,
    "vote": number,
    "key": string
}
const MyMusicList: FC = () => {
    const [list, setList] = useState(Array<addItemType>);
    const [screen, setScreen] = useState({ title: "", sex: "" });
    const dialog = useRef(null);
    const slide = useRef(null)
    const columns = [
        {
            title: '歌曲标题',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => (
                <span>{text}-{record.subhead}</span>
            ),
        },
        {
            title: '时长',
            dataIndex: 'duration',
            key: 'duration',
        },
        {
            title: '歌手',
            dataIndex: 'singer',
            key: 'singer',
        },
        {
            title: '专辑',
            key: 'album',
            dataIndex: 'album',
        }, {
            title: '粉丝票',
            dataIndex: 'vote',
            sorter: {
                compare: (a, b) => b.vote - a.vote,
                multipele: 1
            }
        },
        {
            title: '操作',
            key: 'action',
            dataIndex: 'action',
            render: (_, record) => (
                list.length >= 1 ? (
                    <Popconfirm title="确定移除?" onConfirm={() => handleDelete(record.key)}>
                        <a>移除</a>
                    </Popconfirm>
                ) : null
            ),
        },
    ];


    const onSearch1 = (value) => {
        setScreen((screen) => {
            return { ...screen, title: value }
        })
    }
    const onSearch2 = (value) => {
        setScreen((screen) => {
            return { ...screen, sex: value }
        })
    }
    //打开自定义弹窗
    const showDialog = () => {
        if (dialog.current) {
            if(dialog.current.open){
                dialog.current.open({ dialogTitle: "测试数据" });
            }
        }
    }
    const showSlideDialog = ()=>{
        if (slide?.current) {
            slide?.current?.open({ dialogTitle: "滑块验证" });
        }
    }
    const handleDelete = (key: string) => {
        const newList: Array<addItemType> = list.filter((item: addItemType) => item.key !== key);
        setList(newList);
    }
    const onChange = (pagination, filters, sorter, extra) => {
        console.log(pagination, filters, sorter, extra)
    }

    useEffect(() => {
        let data = screen;
        httpGet(api.getMusicList, data).then(data => {
            if (data.code === 1) {
                setList(data.list);
                message.success('列表获取成功');
            }
        }).catch(err => {
            console.log(err)
        })
    }, [screen])
    return (
        <>
            <Search
                placeholder="input search text"
                onSearch={onSearch1}
                style={{
                    width: 200,
                }}
            />
            <Search
                placeholder="input search text"
                onSearch={onSearch2}
                style={{
                    width: 200,
                }}
            />
            <Button type="primary" onClick={showDialog}>打开弹窗</Button>
            <Button type="primary" onClick={showSlideDialog}>打开滑块验证</Button>
            <Table columns={columns} dataSource={list} onChange={onChange} />
            <MyDialog ref={dialog}>
                <div style={{ background: "red" }}>
                    这是自定义插入的内容
                </div>
            </MyDialog>
            <SlideUnlock ></SlideUnlock>
        </>
    )
}
export default MyMusicList;