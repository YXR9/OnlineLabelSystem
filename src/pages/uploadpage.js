import React from 'react';
import { Steps, Form, Input , message, Upload, Select, Button, InputNumber, DatePicker, Row, Col, Card } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import '../App.css';
import FileDetails from '../components/FileDetails';
import Details from '../components/Details';
import FileUpload from '../components/FileUpload';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { getAuthToken } from '../utils';

const { Dragger } = Upload;
const { Step } = Steps;

class upload extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fileName: '',
            collector: '',
            sourceTarget: '',
            headCounts: '',
            collectDate: [],
            collectMethod: '',
            context: '',
            fileList: [],    // fileList
            UPLoading: false,
            current: 0
        };
        this.inputFilename = this.inputFilename.bind(this);
        this.inputCollector = this.inputCollector.bind(this);
        this.getSourceTarget = this.getSourceTarget.bind(this);
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

    getHeadCounts = (e) => {
        console.log('head counts ', e);
        this.setState({ headCounts: e });
      };

    getCollectDate = (date, dateString) => {
        console.log('collect date ', dateString);
        this.setState({ collectDate: dateString })
    }

    getCollectMethod = (e) => {
        console.log('collect method ', e);
        this.setState({ collectMethod: e });
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

    prevStep = () => {
        const { current } = this.state;
        this.setState({ current: current - 1 });
    }
    
    nextStep = () => {
        const { current } = this.state;
        this.setState({ current: current + 1 });
    }

    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
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
        const { current } = this.state;
        const { fileName, collector, sourceTarget, headCounts, collectDate, collectMethod, context, fileList } = this.state;
        const values = { fileName, collector, sourceTarget, headCounts, collectDate, collectMethod, context, fileList };

        // switch(current) {
        //     case 1:
        //         return (
        //             <FileDetails
        //                 nextStep={ this.nextStep }
        //                 handleChange={ this.handleChange }
        //                 values={ values }
        //             />
        //         )
        //     case 2:
        //         return (
        //             <Details
        //                 prevStep={ this.prevStep }
        //                 nextStep={ this.nextStep }
        //                 handleChange={ this.handleChange }
        //                 values={ values }
        //             />
        //         )
        //     case 3:
        //         return (
        //             <FileUpload
        //                 prevStep={ this.prevStep }
        //                 nextStep={ this.nextStep }
        //                 handleChange={ this.handleChange }
        //                 values={ values }
        //             />
        //         )
        // }
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
        const Prev = e => {
            e.preventDefault();
            this.prevStep();
        }

        const Next = e => {
            e.preventDefault();
            this.nextStep();
        }

        const steps = [
            {
                title: '創建資料',
                content: 
                // <div>
                    <Form name="file-upload-form">
                        <Form.Item 
                            name='fileName'
                            label="資料名稱"  
                            hasFeedback 
                            rules={[{ require: true, message: "Please enter filename" },]}
                        >
                            <Input name='fileName' value={this.state.fileName} onChange={this.inputFilename}/>
                        </Form.Item>
                        <Form.Item>
                            <Button onClick={ Next }>下一步</Button>
                        </Form.Item>
                    </Form>
                // </div>
                    
                
            },
            {
                title: '填寫相關內容',
                content: 
                    <Form>
                        <Form.Item 
                            name="collector" 
                            label="蒐集者姓名" 
                            hasFeedback
                            rules={[{ require: true, message: "Please enter collector" },]}
                        >
                            <Input name='collector' value={this.state.collector} onChange={this.inputCollector}/>
                        </Form.Item>
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
                                <Select.Option value="university">大學</Select.Option>
                                <Select.Option value="graduateSchool">研究所</Select.Option>
                            </Select>
                        </Form.Item>
                         <Form.Item
                            name="headCounts"
                            label="人數"
                            rules={[{ required: true, message: '請填寫人數！' }]}
                        >
                            <InputNumber min={1} max={1000} onChange={this.getHeadCounts} value={this.state.headCounts} style={{ width: "100%" }}/>
                        </Form.Item>
                        <Form.Item
                            name="collectDate"
                            label="蒐集日期"
                            validateStatus="success"
                            rules={[{ required: true, message: '請選擇資料蒐集日期！' }]}
                        >
                          <DatePicker style={{ width: '100%' }} onChange={this.getCollectDate} />
                        </Form.Item>
                        <Form.Item 
                            name="collectMethod" 
                            label="蒐集方式" 
                            hasFeedback
                            rules={[{ required: true, message: '請填寫收集方式！' }]}
                            // style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                        >
                            <Select name='collectMethod' onChange={this.getCollectMethod} value={this.state.collectMethod}>
                                <Select.Option value="elementarySchool">錄音/錄影</Select.Option>
                                <Select.Option value="secondary">線上即時討論</Select.Option>
                                <Select.Option value="highSchool">線上論壇</Select.Option>
                                <Select.Option value="university">紙本資料</Select.Option>
                                <Select.Option value="other">其他</Select.Option>
                            </Select>
                        </Form.Item>
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
                          <Input.TextArea showCount maxLength={100} value={this.state.context} onChange={this.getContext} />
                          <br/>
                          <h6 style={{ textAlign: "left", color: "gray" }}>學習情境（任務）撰寫例子：老師請學生線上討論，或者讓學生參與課堂活動並寫學習單。</h6>
                        </Form.Item>
                        <Form.Item>
                            <Button onClick={ Prev }>上一步</Button>
                            <Button onClick={ Next }>下一步</Button>
                        </Form.Item>
                    </Form>
                
            },
            {
                title: '檔案上傳',
                content: 
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
                        <Form.Item>
                            <Button onClick={ Prev }>上一步</Button>
                            <Button onClick={ Next }>下一步</Button>
                        </Form.Item>
                    </Form.Item>
            }
        ]
        

        return (
            <div className='App'>
                <Navbar/>
            <div style={{ width: "90%", margin: "0px auto", padding: "20px"}}>
                <header className='App-header' style={{ margin: "80px 0px"}}>
                <div>
                    <Steps current={current} style={{ width: '800px' }}>
                        {steps.map(item => (
                            <Step key={item.title} title={item.title}/>
                        ))}
                    </Steps>
                    <br/>
                    <Card className="steps-content">
                        {steps[current].content}
                    </Card>
                    {/* <Form name="file-upload-form" onFinish={this.handleSubmit}>
                        <Row>
                            <Steps current={current}>
                                {steps.map(item => (
                                    <Step key={item.title} title={item.title}/>
                                ))}
                            </Steps>
                        </Row>
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
                            <Col span={11}>
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
                                        <Select.Option value="university">大學</Select.Option>
                                        <Select.Option value="graduateSchool">研究所</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12} push={1}>
                                 <Form.Item
                                    name="headCounts"
                                    label="人數"
                                    rules={[{ required: true, message: '請填寫人數！' }]}
                                >
                                    <InputNumber min={1} max={1000} onChange={this.getHeadCounts} value={this.state.headCounts} style={{ width: "100%" }}/>
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
                                    <Select name='collectMethod' onChange={this.getCollectMethod} value={this.state.collectMethod}>
                                        <Select.Option value="elementarySchool">錄音/錄影</Select.Option>
                                        <Select.Option value="secondary">線上即時討論</Select.Option>
                                        <Select.Option value="highSchool">線上論壇</Select.Option>
                                        <Select.Option value="university">紙本資料</Select.Option>
                                        <Select.Option value="other">其他</Select.Option>
                                    </Select>
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
                                  <Input.TextArea showCount maxLength={100} value={this.state.context} onChange={this.getContext} />
                                  <br/>
                                  <h6 style={{ textAlign: "left", color: "gray" }}>學習情境（任務）撰寫例子：老師請學生線上討論，或者讓學生參與課堂活動並寫學習單。</h6>
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
                        <Row justify='center' style={{margin: '20px 0px'}}>
                            <Col>
                                <Form.Item>
                                    <Button block  style={{ fontFamily: "Comic Sans MS", fontSize: "16px", margin: "0px 0px 0px 0px", textAlign: "center", padding: "0px 0px 7px 0px", float: "right", borderRadius: "5px", width: "150px", height: "50px", boxShadow: "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px", lineHeight: "50px", border: "0px", background: "#f8f7f5", color: "#00bdff" }} onClick={() => { this.props.history.push("/list") }}>
                                        Cancel
                                    </Button>
                                </Form.Item>
                            </Col>
                            <Col push={1}>
                                <Form.Item>
                                    <Button block type='primary' htmlType='submit'  style={{ fontFamily: "Comic Sans MS", fontSize: "16px", margin: "0px 0px 0px 0px", textAlign: "center", padding: "0px 0px 7px 0px", float: "right", borderRadius: "5px", width: "150px", height: "50px", boxShadow: "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px", lineHeight: "50px", border: "0px", background: "#00bdff", color: "#f8f7f5" }}>
                                        Upload
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form> */}
                    </div>
                </header>
                </div>
            </div>
        )
    }
}
export default upload