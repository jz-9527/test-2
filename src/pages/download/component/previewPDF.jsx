import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Pagination,Button, message, Upload } from "antd"
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.0.87/pdf.js`;

var taskDetail = {};
function MyPreviewPDF() {
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    console.log(taskDetail)
    const onDocumentLoadSuccess = ({ numPages }) => {
        // numPages是总页数
        setTotalPage(numPages);
    }
    const handelOnChange = (pages) => {
        setPage(pages);
    };
    return (
        <>
            <MyUp></MyUp>
            <Document
                className="pdf_document"
                file={taskDetail}   //文件路径
                onLoadSuccess={onDocumentLoadSuccess} //成功加载文档后调用
                onLoadError={console.error} //加载失败时调用
                loading="正在努力加载中" //加载时提示语句
            >
                <Page pageNumber={page} />
            </Document>
            <Pagination className="pdf_page" showSizeChanger={false} onChange={handelOnChange} total={totalPage * 10} current={page} /> </>
    )
}


const props = {
  name: 'file',
  action: 'localhost:3000/download/component',
  headers: {
    authorization: 'authorization-text',
  },

  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
      taskDetail = info.file
    }

    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const MyUp = () => (
  <Upload {...props}>
    <Button >Click to Upload</Button>
  </Upload>
);



export default MyPreviewPDF

