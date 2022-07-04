import React, { useState } from "react";
import { Table, Steps, Empty, Button, message, DatePicker, Form, Layout, Popconfirm, Tag } from "antd";
import { useHistory } from "react-router-dom";
import Navbar from '../components/Navbar';
import { EditOutlined } from "@ant-design/icons";

const { Step } = Steps;
const { Footer } = Layout;

export default function DataTimeline(props) {
    const history = useHistory();
    const [ current, setCurrent ] = useState(0);    // 記錄目前在哪個階段

    
    const displayDatas = (props) => {
        
        const { datas, adjustData } = props;

        const columns = [
            {
                title: '資料',
                dataIndex: 'content',
                key: 'content',
                render: text => <a href="/codingpage">{text}</a>
            }
        ]

        const coCodeColumns = [
            {
                title: '資料',
                dataIndex: 'content',
                width: 300,
                key: 'constent',
                render: text => <p>{text}</p>
            },
            {
                title: '編碼者',
                dataIndex: 'userDetails',
                key: 'userDetails',
                width: 70,
                render: (userDetails) => userDetails.map(userDetail => userDetail.account).join()
            },
            {
                title: '編碼結果',
                dataIndex: 'result',
                key: 'result',
                width: 100,
                render: (result) => (<Tag color='blue' key={result}>{result.map(result => result.code).join()}</Tag>)
            },
            {
                title: '修改',
                width: 40,
                key: 'edit',
                render: (record) => {
                    return (
                            <EditOutlined
                                onClick={() => {
                                    onEditData(record)
                                }}
                            />
                    );
                }
            }
        ]

        const steps = [
            {
                title: '獨立編碼',
                content: <div style={{ padding: '20px 100px', margin: '0px auto', width: '100%' }}>
                            <Table className='table' rowKey="_id" columns={columns} dataSource={datas} pagination={false} scroll={{ y: 430 }} />
                        </div>
            },
            {
                title: '建立編碼校正',
                content: <Form style={{ display: "inline-block", padding: "160px" }}>
                            <Form.Item 
                                label="排定校正日期"
                                size="large"
                            >
                                <DatePicker showToday size="large"/>
                            </Form.Item>
                        </Form>
            },
            {
                title: '進行編碼校正',
                content: <div style={{ padding: '20px 100px', margin: '0px auto', width: '100%'}}>
                            <Table className='table' rowKey="_id" columns={coCodeColumns} dataSource={adjustData} pagination={false} scroll={{ y: 430 }} />
                        </div>
            },
        ]

        const next = () => {
            setCurrent(current + 1);
        };
        
        const prev = () => {
            setCurrent(current - 1);
        };

        const onEditData = (record) => {

        }

        if(datas.length > 0) {
            return(
                <div className="App">
                    <Navbar/>
                    <div style={{ width: "75%", height: "0px", margin: "0px auto", padding: "80px 0px"}}>
                        <div  className="steps-content">
                            <Steps current={current} style={{  width: "80%", margin: "0px auto", padding: "10px 0px" }}>
                                {
                                    steps.map(item => (
                                        <Step key={item.title} title={item.title} />
                                    ))
                                }
                            </Steps>
                            <div>
                                {steps[current].content}
                            </div>
                        </div>
                            <div className="steps-action">
                                {current < steps.length - 1 && (
                                  <Button className="btn1" type="primary" style={{ margin: '0 8px' }} onClick={() => history.push("/codepage")}>
                                    暫停並返回編碼任務列表
                                  </Button>
                                )}
                                {current > 0 && (
                                  <Button className="btn1" style={{ margin: '0 8px' }} onClick={() => prev()}>
                                    返回
                                  </Button>
                                )}
                                {current < steps.length - 1 && (
                                  <Button className="btn" type="primary" onClick={() => next()}>
                                    下一步
                                  </Button>
                                )}
                                {current === steps.length - 1 && (
                                  <Button className="btn" type="primary" onClick={() => { message.success('Processing complete!'); history.push("/codepage")}}>
                                    完成並返回編碼任務列表
                                  </Button>
                                )}
                            </div>
                    </div>
                    <Footer style={{ background: "#000406", color: "#5f8497", textAlign: 'center', position: "absolute", boxSizing: "border-box", bottom: "0", width: "100%", fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </div>
            )
        } else {
            return (
            <Empty
                style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%"
                    
                }} 
                description={false}
            />)
        }
    }
    return(
        <>
            {displayDatas(props)}
        </>
    )
}