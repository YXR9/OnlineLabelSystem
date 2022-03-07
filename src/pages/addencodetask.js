import React, { useState, useEffect } from 'react'
import { Form, Select, message, DatePicker, Button, Row, Col } from 'antd';
import { useHistory } from 'react-router-dom';
import axios from "axios";

const { RangePicker } = DatePicker;

export default function Addencodetask() {
    const history = useHistory();
    const [ files, setFiles ] = useState([]);
    const url = 'http://localhost:8080/';
    console.log(files)
    console.log(typeof(files))

    useEffect(() => {
        getAllDatas();
    }, []);

    const getAllDatas = () => {
        axios.get(`${url}code/allEncodeTask/6207e02ab0221e391b69212b`)
        .then((res) => {
            // const allDatas = res.data.datas.allDatas;
            // add data to state
            setFiles(res.data);
            // console.log(res.data)
        })
        .catch(error => console.error(`Error: ${error}`));
    }

    return (
    <div className='App'>
        <div className='App-header'>
            <Form>
                <Form.Item
                    label='選擇編碼檔案'
                >
                    <Select
                        defaultValue={files}
                        showSearch
                        style={{ width: 300 }}
                        placeholder="Search to Select"
                        // value={files}
                        // options={files.status}
                        // optionFilterProp='children'
                        // filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        // filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase()) }
                    >
                        {files.map((item, index) => (
                            <Select.Option key={JSON.stringify(index)} value={JSON.stringify(item)}>{item.status}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label='選擇編碼架構'
                >
                    <Select
                        showSearch
                        style={{ width: 300 }}
                        placeholder="Search to Select"
                        optionFilterProp='children'
                        // filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        // filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase()) }
                    ></Select>
                </Form.Item>
                <Form.Item
                    label='編碼期程'
                >
                    <RangePicker style={{ width: 330}}/>
                </Form.Item>
                <Row justify='center'>
                    <Col>
                        <Form.Item>
                            <Button block className="cancel-form-button" onClick={() => { history.push("/codepage") }}>
                                Cancel
                            </Button>
                        </Form.Item>
                    </Col>
                    <Col push={1}>
                        <Form.Item>
                            <Button block type='primary' htmlType='submit' className="login-form-button">
                                Upload
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    </div>
  )
}
