import React from "react";
import { Form, Input , message, Upload, Select, Button, InputNumber, DatePicker, Row, Col } from 'antd';
import Navbar from "./Navbar";
import { InboxOutlined } from "@ant-design/icons";
import Dragger from "antd/lib/upload/Dragger";

const FileUpload = ({ prevStep, nextStep, handleChange, values }) => {
    
    const Prev = e => {
        e.preventDefault();
        prevStep();
    }

    const Next = e => {
        e.preventDefault();
        nextStep();
    }

    const normFile = (e) => {
        console.log('Upload event:', e);    
               if (Array.isArray(e)) {
          return e;
        }
        if (e.fileList.length > 1) {
            e.fileList.shift();
        }
        return e && e.fileList;
    };
    
    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    }

    const props = {
            name: 'file',
            multiple: true,
            accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,",   // 上傳文件類型限於 excel
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST'
            },
            action:'http://localhost:8080/file',
            onChange(info) {
                // this.setState({fileList: info.target.fileList[0]})
               const { status } = info.file;
               console.log("ok~");
            //    console.log(info);
               if (status !== 'uploading') {
                    console.log(info.file, info.fileList);
               }
               if (status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully.`);
               } else if (status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
               }
            },
            onDrop(e) {
              console.log('Dropped files');
            }
        };
    
    return (
        // <div className='App'>
        //     <Navbar/>
        //     <div style={{ width: "90%", margin: "0px auto", padding: "20px"}}>
        //         <header className='App-header' style={{ margin: "100px 0px"}}>
                    <Form>
                    <Form.Item 
                        name="file" 
                        initialValue={values.data && values.data.filename ? values.data.filename : []}
                        valuePropName= 'fileList'
                        getValueFromEvent= {normFile}
                        className="form-group files" 
                        wrapperCol={{ span: 24 }}
                    >
                        <Dragger fileList={values.fileList} customRequest={dummyRequest} {...props} beforeUpload={(f, fList) => false} onChange={handleChange('fileList')}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">點擊或拖曳檔案至此</p>
                        </Dragger>
                    </Form.Item>
                        <Form.Item>
                            <Button onClick={ Prev }>上一步</Button>
                            <Button onClick={ Next }>下一步</Button>
                        </Form.Item>
                    </Form>
        //         </header>
        //     </div>
        // </div>
    )
}

export default FileUpload