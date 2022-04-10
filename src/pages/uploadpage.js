import React from 'react';
import { Form, Input , message, Upload, Select, Button, InputNumber, DatePicker, Row, Col, Layout, PageHeader } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import '../App.css';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { getAuthToken } from '../utils';
// import { History } from 'history';

const { Dragger } = Upload;

class upload extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fileName: '',
            collector: '',
            sourceTarget: '',
            age: '',
            headCounts: '',
            collectDate: [],
            collectMethod: '',
            context: '',
            fileList: [],    // fileList
            UPLoading: false
        };
        this.inputFilename = this.inputFilename.bind(this);
        this.inputCollector = this.inputCollector.bind(this);
        this.getSourceTarget = this.getSourceTarget.bind(this);
        this.getAge = this.getAge.bind(this);
        this.getHeadCounts = this.getHeadCounts.bind(this);
        this.getCollectDate = this.getCollectDate.bind(this);
        this.getCollectMethod = this.getCollectMethod.bind(this);
        this.getContext = this.getContext.bind(this);
        this.HandlefileChange = this.HandlefileChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillUnmount() {
        this.setState = () => false;
    }

    inputFilename = e => {
        if (e.target instanceof HTMLInputElement) {
            // console.log('file name ', e.target.value);
            this.setState({ fileName: e.target.value });
        }
    }

    inputCollector = e => {
        if (e.target instanceof HTMLInputElement) {
            // console.log('collector ', e);
            this.setState({ collector: e.target.value });
        }
    }

    getSourceTarget = e => {
        console.log('source target ', e);
        this.setState({ sourceTarget: e });

    }

    getAge = (e) => {
      console.log('age ', e);
      this.setState({ age: e });
    };

    getHeadCounts = (e) => {
        console.log('head counts ', e);
        this.setState({ headCounts: e });
      };

    getCollectDate = (date, dateString) => {
        console.log('collect date ', dateString);
        this.setState({ collectDate: dateString })
    }

    getCollectMethod = (e) => {
        console.log('collect method ', e.target.value);
        this.setState({ collectMethod: e.target.value });
    }

    getContext = (e) => {
        console.log('context ', e.target.value);
        this.setState({ context: e.target.value });
    }

    dummyRequest({ file, onSuccess }) {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    }

    HandlefileChange = ({file, fileList}) => {// Processing file Change, guaranteed that the user selected by one is only one
        console.log("upload file...");
        // this.setState({fileList: event.target.files[0]});
        this.setState({
            'fileList': fileList.length? [fileList[fileList.length - 1]] : []
        });
    }
        
    handleSubmit = fields => {
        if(!this.state.fileList.length) {
            message.warning ("Please select the file you want to upload")
        }
        // if(!this.state.codeSys.length) {
        //     message.warning ("Please select the file you want to upload")
        // }
        // console.log(fields);
        // const userId = "61cd8404c5f3234a331e3ac4";
        const userId = getAuthToken();
        const { fileName, collector, sourceTarget, age, headCounts, collectDate, collectMethod, context } = fields;
        const data = new FormData();
        data.append('userId', userId);
        data.append('fileName', fileName);
        data.append('collector', collector);
        data.append('sourceTarget', sourceTarget);
        data.append('age', age);
        data.append('headCounts', headCounts);
        data.append('collectDate', collectDate);
        data.append('collectMethod', collectMethod);
        data.append('context', context);
        data.append('file', this.state.fileList[0].originFileObj);

        this.setState({
            UPLoading: true,
        })

        console.log(userId, fileName, collector, sourceTarget, age, headCounts, collectDate, collectMethod, context, this.state.fileList[0].originFileObj);
        axios({
            method: 'post',
            url: "http://localhost:8080/file", 
            data: data, 
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then (({data}) => {
            this.props.history.push("/list")
            message.success("Upload successful~");
            console.log("data", data);
        }).catch (error => {
            message.error(error.message);
        }).finally(() => {
            this.setState({
                UPLoading: false,
            })
        })
    }

    render() {
        const { fileList } = this.state;
        const { value } = this.state;
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
            <div className='App'>
                <Navbar/>
            <div style={{ width: "90%", margin: "0px auto", padding: "20px"}}>
                <PageHeader title="上傳檔案"/>
                <header className='App-header'>
                    <Form name="file-upload-form" onFinish={this.handleSubmit}>
                        <Row>
                            <Col span={11}>
                                <Form.Item 
                                    name='fileName'
                                    label="資料名稱"  
                                    hasFeedback 
                                    rules={[{ require: true, message: "Please enter filename" },]}
                                >
                                    <Input name='fileName' value={this.state.fileName} onChange={this.inputFilename}/>
                                </Form.Item>
                            </Col>
                            <Col span={12} push={1}>
                                <Form.Item 
                                    name="collector" 
                                    label="蒐集者姓名" 
                                    hasFeedback
                                    rules={[{ require: true, message: "Please enter collector" },]}
                                >
                                    <Input name='collector' value={this.state.collector} onChange={this.inputCollector}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <Form.Item
                                    name="sourceTarget"
                                    label="來源對象"
                                    hasFeedback
                                    rules={[{ required: true, message: '請填寫來源對象！' }]}
                                >
                                    <Select onChange={this.getSourceTarget} value={this.state.sourceTarget}>
                                        <Select.Option value="elementarySchool">國小</Select.Option>
                                        <Select.Option value="secondary">國中</Select.Option>
                                        <Select.Option value="highSchool">高中</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8} push={1}>
                                <Form.Item
                                    name="age"
                                    label="年紀"
                                    rules={[{ required: true, message: '請填寫資料蒐集對象年紀！' }]}
                                >
                                    <InputNumber min={6} max={25} onChange={this.getAge} value={this.state.age}/>
                                </Form.Item>
                            </Col>
                            <Col span={8} push={1}>
                                 <Form.Item
                                    name="headCounts"
                                    label="人數"
                                    rules={[{ required: true, message: '請填寫人數！' }]}
                                >
                                    <InputNumber min={1} max={1000} onChange={this.getHeadCounts} value={this.state.headCounts}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={11}>
                                <Form.Item
                                    name="collectDate"
                                    label="蒐集日期"
                                    validateStatus="success"
                                    rules={[{ required: true, message: '請選擇資料蒐集日期！' }]}
                                >
                                  <DatePicker style={{ width: '100%' }} onChange={this.getCollectDate} />
                                </Form.Item>
                            </Col>
                            <Col  span={12} push={1}>
                                <Form.Item 
                                    name="collectMethod" 
                                    label="蒐集方式" 
                                    hasFeedback
                                    rules={[{ required: true, message: '請填寫收集方式！' }]}
                                    // style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                                >
                                    <Input name='collectMethod'  value={this.state.collectMethod} onChange={this.getCollectMethod}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item
                                  name="context"
                                  label="學習情境（任務）"
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Please input Intro',
                                    },
                                  ]}
                                >
                                  <Input.TextArea showCount maxLength={100} value={this.state.context} onChange={this.getContext}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                    <Form.Item 
                                        name="file" 
                                        initialValue={this.props.data && this.props.data.filename ? this.props.data.filename : []}
                                        valuePropName= 'fileList'
                                        getValueFromEvent= {normFile}
                                        // className="form-group files" 
                                        wrapperCol={{ span: 24 }}
                                    >
                                        <Dragger fileList={this.state.fileList} customRequest={this.dummyRequest} {...props} beforeUpload={(f, fList) => false} onChange={this.HandlefileChange}>
                                            <p className="ant-upload-drag-icon">
                                                <InboxOutlined />
                                            </p>
                                            <p className="ant-upload-text">點擊或拖曳檔案至此</p>
                                        </Dragger>
                                    </Form.Item>
                            </Col>
                        </Row>
                        <Row justify='center'>
                            <Col>
                                <Form.Item>
                                    <Button block className="btn1" onClick={() => { this.props.history.push("/list") }}>
                                        Cancel
                                    </Button>
                                </Form.Item>
                            </Col>
                            <Col push={1}>
                                <Form.Item>
                                    <Button block type='primary' htmlType='submit' className="btn">
                                        Upload
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </header>
                </div>
            </div>
        )
    }
}
export default upload