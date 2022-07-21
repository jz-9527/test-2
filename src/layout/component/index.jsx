import React, { useState } from "react";
import { Modal, Button } from 'antd';

const Login = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };



    return (
        <>
            <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>
            <Modal title="Basic Modal" visible={isModalVisible} footer={null}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    );
}
export default Login;