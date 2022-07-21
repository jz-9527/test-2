import React, { useRef } from "react";
import { Button, Form, Input, Select, message, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';
const { Option } = Select;
const layout = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 8
    }
}
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16
    }
}
const props = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
        authorization: "authorization-text"
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }

        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }
}
const FilesUpload = () => {
    const formRef = useRef();
    const onGenderChange = (value) => {
        switch (value) {
            case "man":
                formRef.current.setFieldsValue({
                    note: "张三"
                })
                return
            case "woman":
                formRef.current.setFieldsValue({
                    note: "李四"
                })
                return;
            case "noman":
                formRef.current.setFieldsValue({
                    note: "王五"
                })
                return
            default :
                console.log(value)
        }
    }
    const onFinish = (value) => {
        console.log(value)
        console.log(formRef.current)
        var nowUploadNums = 0;
        //获取文件对象
        const file = value.customize.file;
        //设置分片大小
        const chunkSize = 1*1024*1024;
        //获取slice方法，做兼容处理
        const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
        //设置分片总数
        // const blockCount = Math.ceil(file.size / chunkSize);
        //设置请求总数
        // const axiosPromiseArray = [];//用来存放所有分片请求结果，promise.all(axiosPromiseArray).then()判断是否全部上传成功
        const uploadFile = ()=>{
            const start = nowUploadNums * chunkSize;
            const end = Math.min(file.size,start + chunkSize);
            const form = new FormData();
            form.append("file",blobSlice.call(file,start,end));
            form.append("index",nowUploadNums);
            console.log(form)
            //碍于没人写后台数据配合，后续步骤为
            //1.通过回调或者轮巡发送一个一个文件片段内容
            //2.同时根据发送的片段索引更新进度条
            //3.发送完成告诉后端可以合并分片文件了，调用通知合并请求
            //4.合并成功，进度条100%,上传成功
        }
        uploadFile();
    }
    const onReset = () => {
        formRef.current.resetFields();
    }
    const onFill = () => {
        formRef.current.setFieldsValue({
            note: "张三",
            gender: "man"
        })
    }
    
    return (
        <>
            <Form {...layout} ref={formRef} name="control-ref" onFinish={onFinish}>
                <Form.Item name="note" label="姓名" rules={[{ required: true }]}>
                    <Input></Input>
                </Form.Item>
                <Form.Item name="gender" label="性别" rules={[{ required: true }]}>
                    <Select placeholder="请选择" onChange={onGenderChange} >
                        <Option value="man">男</Option>
                        <Option value="woman">女</Option>
                        <Option value="noman">不男不女</Option>
                    </Select>
                </Form.Item>
                <Form.Item noStyle shouldUpdate={(prevValue, currentValues) => prevValue.gender != currentValues.gender}>
                    {
                        ({ getFieldValue }) => getFieldValue("gender") === "noman" ? (
                            <Form.Item name="customize" label="上传文件">
                                <Upload {...props}>
                                    <Button icon={<UploadOutlined />}>上传文件</Button>
                                </Upload>
                            </Form.Item>
                        ) : null
                    }
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">提交</Button>
                    <Button htmlType="button" onClick={onReset}>清空</Button>
                    <Button type="link" htmlType="button" onClick={onFill}>填充数据</Button>
                </Form.Item>
            </Form>
        </>
    )
}
export default FilesUpload