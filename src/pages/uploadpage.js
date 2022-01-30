import React from 'react';
import { PageHeader, Form, Input , message, Upload, Space, Checkbox, Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import '../App.css';
import axios from 'axios';

const { Dragger } = Upload;

class upload extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userFileName: '',
            codeSys: [],
            fileList: [],    // fileList
            coCode: true,
            UPLoading: false
        };
        this.inputFilename = this.inputFilename.bind(this);
        this.onChangeCoding = this.onChangeCoding.bind(this);
        this.HandlefileChange = this.HandlefileChange.bind(this);
        this.changeAuthority = this.changeAuthority.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    inputFilename = e => {
        if (e.target instanceof HTMLInputElement) {
            this.setState({ userFileName: e.target.value });
        }
    }

    onChangeCoding = (e) => {
      console.log('checked', e);
      this.setState({
        codeSys: e.length? [e[e.length - 1]] : []
    });
    };

    dummyRequest({ file, onSuccess }) {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    }

    changeAuthority(values) {
        console.log(values.target.checked);
        this.setState ({
            coCode: values,
        });
    }

    HandlefileChange = ({file, fileList}) => {// Processing file Change, guaranteed that the user selected by one is only one
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
        const userId = "61cd8404c5f3234a331e3ac4";
        const { userFileName, codeSys, coCode } = fields;
        const data = new FormData();
        data.append('userId', userId);
        data.append('userFileName', userFileName);
        data.append('codeSys', codeSys);
        data.append('coCode', coCode);
        data.append('file', this.state.fileList[0].originFileObj);

        this.setState({
            UPLoading: true,
        })

        console.log(userId, userFileName, codeSys, coCode, this.state.fileList[0].originFileObj);
        axios.post("http://localhost:8080/file", data, {
            // headers: {
            //     'Access-Control-Allow-Origin': '*',    
            //     'Access-Control-Allow-Methods': 'POST',
            //     'Content-Type': 'multipart/form-data',
            // },
        }).then (({data}) => {
            message.success("Upload successful~");
            console.log(data);
        }).catch (error => {
            message.error(error.message);
        }).finally(() => {
            this.setState({
                UPLoading: false
            })
        })
    }

    render() {
        const { value } = this.state;
        const FORM_LAYOUT = {
            labelCol: {
                span: 8
            },
        }

        const FORM_BTN_LAYOUT = {
            wrapperCol: {
                span: 16,
                offset: 8
            }
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

        const props = {
            name: 'file',
            multiple: true,
            accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,",   // 上傳文件類型限於 excel
            // headers: {
            //     'Access-Control-Allow-Origin': '*',
            //     'Access-Control-Allow-Methods': 'POST'
            // },
            action:'http://localhost:8080/file',
            onChange(info) {
               const { status } = info.file;
               console.log(info);
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
                <PageHeader className="site-page-header" title="LabelSystem"/>
                <div>
                    {/* <Link>
                        <img className="upload" src={upload}/>
                    </Link> */}
                </div>
                <header className='App-header'>
                    <Form name="file-upload-form" {...FORM_LAYOUT} onFinish={this.handleSubmit}>
                        <Form.Item 
                            name='userFileName'
                            label="資料名稱"  
                            className='area' 
                            rules={[{ require: true, message: "Please enter filename" },]}
                        >
                            <Input name='filename' className='uploadInput' value={this.state.filename} onChange={this.inputFilename}/>
                        </Form.Item>
                        <Form.Item name="codeSys" label="編碼系統" className='checkbox'>
                            <Checkbox.Group onChange={this.onChangeCoding} options={value} style={{ display: 'grid' }}>
                                <Space direction='vertical'>
                                    <Checkbox value="論點面向">
                                        論點面向
                                    </Checkbox>
                                    <Checkbox value="發言目的">
                                        發言目的
                                    </Checkbox>
                                    {/* <Radio value={3}>
                                        More...
                                        {value === 3 ? <Input style={{ width: 100, marginLeft: 10 }} /> : null}
                                    </Radio> */}
                                </Space>
                            </Checkbox.Group>
                        </Form.Item>
                        <Form.Item name="file"  label="檔案上傳" className="form-group files" wrapperCol={{ span: 24 }}>
                            <Form.Item initialValue={this.props.data && this.props.data.filename ? this.props.data.filename : []}
                                valuePropName= 'fileList'
                                getValueFromEvent= {normFile}
                            >
                                <Dragger name='fileList' fileList={this.state.fileList} {...props} customRequest={this.dummyRequest} onChange={this.HandlefileChange}>
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">點擊或拖曳檔案至此</p>
                                </Dragger>
                            </Form.Item>
                        </Form.Item>
                        <Form.Item name='coCode' label="檔案權限" wrapperCol={{ span: 24 }} onChange={this.changeAuthority} valuePropName='checked'>
                            <Checkbox >
                                {" "}
                                可以編輯（開啟進行任何變更）
                            </Checkbox>
                        </Form.Item>
                        <Form.Item {...FORM_BTN_LAYOUT}>
                            <Button block type='primary' htmlType='submit'>
                                Upload
                            </Button>
                        </Form.Item>
                    </Form>
                </header>
            </div>
        )
    }
}
export default upload