import React, { PureComponent, Suspense } from "react";
import { Layout } from 'antd';
import Head from "./component/header";
import Foot from "./component/foot";
import GetRoutes from "../router";
import "./layout.css"
const { Content } = Layout;
class MyLayout extends PureComponent {
    render() {
        return (
            <>
                <Layout className="layout">

                    <Head></Head>

                    <Content >
                        <Suspense fallback={<div>...loading</div>}>
                            <GetRoutes></GetRoutes>
                        </Suspense>
                    </Content>

                    <Foot></Foot>

                </Layout>
            </>
        )
    }
}
export default MyLayout;