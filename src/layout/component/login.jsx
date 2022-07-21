import React, { useState, memo } from 'react';
import { Modal, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { login, unlogin } from '../../store/counterSilce';
import QRCode from "qrcode.react"

const Login = (props) => {
  const [qrcode, setQrcode] = useState("20220607");
  
  const dispatch = useDispatch();
  const refreshCode = () => {
    setQrcode(new Date().getTime())
  }

  const fn = () => {
    dispatch(login("张三"))
  }
  const unfn = () => {
    dispatch(unlogin())
  }

  return (
    <>
      <Modal
        visible={props.show}
        title="登录"
        onCancel={props.onlogin}
        footer={null}
      >
        <div>
          <QRCode value={qrcode} size={200} id="qrcode" />
          <Button type="primary" onClick={refreshCode}>刷新二维码</Button>
          <Button type="primary" onClick={fn}>一键登录</Button>
          <Button type="primary" onClick={unfn}>退出登录</Button>
        </div>
      </Modal>
    </>
  );
};

export default memo(Login);