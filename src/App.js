import React from "react";
import MyLayout from "./layout/layout";
import { BrowserRouter } from "react-router-dom";
import 'antd/dist/antd.css';
function App() {
  return (<>
    <BrowserRouter>
      <MyLayout></MyLayout>
    </BrowserRouter>
  </>);
}

export default App;
