import React, { useState } from "react";
import { Table, Steps, Empty, Button, message, DatePicker, Form, Layout } from "antd";
import { useHistory } from "react-router-dom";
import Navbar from '../components/Navbar';

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
                dataIndex: 'dataName',
                width: 700,
                key: 'dataName',
                render: text => <h3>{text}</h3>
            },
            {
                title: 'A 編碼者',
                dataIndex: 'userId',
                key: 'userId',
                render: text => <a>{text}</a>
            },
            {
                title: 'B 編碼者',
                dataIndex: '',
                key: '',
                // render: text => <a>{text}</a>
            },
            {
                title: '編碼結果',
                dataIndex: 'history.code',
                key: 'history.code',
                // render: text => <a>{text}</a>
            },
            {
                title: '修改',
                width: 100,
                render: () => <a>edit</a>
            },
        ]

        const steps = [
            {
                title: '獨立編碼',
                content: <div style={{ padding: '30px 100px'}}>
                            <Table columns={columns} dataSource={datas} pagination={false} scroll={{ y: 500 }} />
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
                content: <div style={{ padding: '30px 100px'}}>
                            <Table columns={coCodeColumns} dataSource={adjustData} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
                        </div>
            },
        ]

        const next = () => {
            setCurrent(current + 1);
        };
        
        const prev = () => {
            setCurrent(current - 1);
        };

        if(datas.length > 0) {
            return(
                <div className="App">
                    <Navbar/>
                    <div className="App-header" >
                        <div  className="steps-content">
                            <Steps current={current} style={{ maxWidth: '100%', padding: '0px 150px'}}>
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