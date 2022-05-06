import { PlusOutlined, ContainerOutlined, DeleteOutlined } from '@ant-design/icons';
import { Layout, Input, Row, Col, Button, Modal, Form, Divider, List, Card, Tooltip, Popconfirm, message, Table, PageHeader, Skeleton, Typography } from 'antd';
import axios from 'axios';
import React, { useEffect, useState, useContext, useRef } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import Navbar from '../components/Navbar';
import { getAuthToken, getUsername, getFileIndex, setFile, setFileIndex } from '../utils';

const { Footer } = Layout;
const { Search } = Input;
const { Meta } = Card;

export default function Codesystempage() {
  const [ form ] = Form.useForm();
  const [ datas, setDatas ] = useState('');
  const [ editingKey, setEditingKey] = useState('');
  const [ isModalVisible, setIsModalVisible ] = useState(false);
  const [ deteil, setDeteil ] = useState(false);
  const [ codeSystemDeteil, setCodeSystemDeteil ] = useState([]);
  const [ filterList, setFilterList ] = useState(null);
  const url = 'http://localhost:8080/';

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      option: '',
      description: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...datas];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setDatas(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setDatas(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  useEffect(() => {
      getAllDatas();
      handleAdd();
  }, []);

  const showJoinTask = () => {
      setIsModalVisible(true);
  }

  const handleAddCodeSystem = (fields) => {
      const userId = getAuthToken();
      const source = getUsername()
      const { codeName, purpose, option, description } = fields;
      var data = JSON.stringify({
        "userId": userId,
        "codeName": codeName,
        "purpose": purpose,
        "code": [
          {
            "option": option,
            "description": description
          }
        ],
        "source": source
      });

      var config = {
        method: 'post',
        url: 'http://localhost:8080/code/codeSystem',
        headers: { 
          'Content-Type': 'application/json', 
          'Cookie': 'connect.sid=s%3AOp4KhOBiNpMRLkYlffEimteS6C7yZdyX.IVaMBHlDVYFBhL5LDjbIeerufM0dMIBK9ktMK41gBKM'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        message.success("成功建立編碼架構🎉");
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleCancel = () => {
      setIsModalVisible(false);
      setDeteil(false);
  }

  const getAllDatas = () => {
      const userId = getAuthToken()
      axios.get(`${url}code/codeSystem/${userId}`)
      .then((res) => {
          setDatas(res.data);
      })
      .catch(error => console.error(`Error: ${error}`));
  }

  const onSearch = value => {
    const filterData = datas.filter((o) => Object.keys(o).some((k) => String(o[k])
      .toLowerCase()
      .includes(value.toLowerCase())));
    setFilterList(filterData);
    console.log(value);
  }

  const columns = [
    {
        title: '選項',
        dataIndex: 'option',
        key: 'option',
        editable: true
    },
    {
        title: '說明',
        dataIndex: 'description',
        key: 'description',
        editable: true
    },
    {
      title: '編輯',
      key: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              儲存
            </Typography.Link>
            <Popconfirm title="確定要取消嗎？🤔" onConfirm={cancel}>
              <a>取消</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            編輯
          </Typography.Link>
        );
      },
    },
  ];

  const margedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const codeSystemOption = [
    {
        title: "選項",
        dataIndex: "option",
        key: "option",
    },
    {
        title: "說明",
        dataIndex: "description",
        key: "description",
    }
  ]

  const EditableCell = ({
    title,
    editing,
    children,
    dataIndex,
    record,
    ...restProps
  }) => {
    const inputNode = <Input/>
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
              name={dataIndex}
              style={{
                margin: 0,
              }}
              rules={[
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };


  const components = {
    body: {
      cell: EditableCell,
    }
  }

  const handleAdd = () => {
    const newOption = {
        option: <Form.Item name="option"><Input name='option' placeholder='Please enter option'/></Form.Item>,
        description: <Form.Item name="description"><Input name='description' placeholder='Please enter description.'/></Form.Item>
    }
    // console.log("ok")
    setCodeSystemDeteil((pre) => {
      return [...pre, newOption];
    });
  }

  return (
    <div className='App'>
        <Navbar/>
        <div style={{ margin: "0px auto", padding: "60px 380px"}}>
            <Row>
                <Col span={3}>
                    <h2>編碼架構</h2>
                </Col>
                <Col span={3} offset={5}>
                    <Search size='large' placeholder='搜尋編碼架構' allowClear onSearch={onSearch} style={{ width: "500px", lineHeight: "100px" ,background: "#fbfaf7" }} bordered={false} enterButton={false}/>
                    {/* <HeartOutlined /> */}
                </Col>
                <Col span={8} offset={5}>
                    <Button style={{ fontFamily: "Comic Sans MS", fontSize: "16px", margin: "0px 0px 0px 0px", textAlign: "center", padding: "0px 0px 7px 0px", float: "right", borderRadius: "5px", width: "150px", height: "50px", boxShadow: "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px", lineHeight: "50px", border: "0px", background: "#00bdff", color: "#f8f7f5" }} onClick={showJoinTask}>建立編碼架構</Button>
                </Col>
            </Row>
            <Divider/>
            <div 
                id="scrollableDiv"
                style={{
                    height: 580,
                    overflow: 'auto',
                }}
            >
            <Row>
                <Col span={24}>
                    <Modal 
                        title="新增編碼架構" 
                        visible={isModalVisible}
                        onCancel={handleCancel}
                        footer={null}
                    >
                        <Form name='file-upload-form' onFinish={handleAddCodeSystem}>
                            <Form.Item name="codeName">
                                <Input
                                    name='codeName'
                                    placeholder="請輸入編碼架構名稱" 
                                    style={{
                                        height: "75px",
                                        width: "300px",
                                        borderRadius: "10px",
                                        borderStyle: "dashed",
                                        position: "abslute",
                                        top: "50%",
                                        left: "50%",
                                        margin: "20px 0 0 -150px"
                                    }}
                                    size="large"
                                />
                            </Form.Item>
                            <Form.Item name="purpose">
                                <Input
                                    name='purpose'
                                    placeholder="請輸入編碼架構的編碼面向" 
                                    style={{
                                        height: "75px",
                                        width: "300px",
                                        borderRadius: "10px",
                                        borderStyle: "dashed",
                                        position: "abslute",
                                        top: "50%",
                                        left: "50%",
                                        margin: "20px 0 0 -150px"
                                    }}
                                    size="large"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button className='btn1' onClick={handleAdd} type="primary" style={{ width: "100px", margin: "10px 180px 10px 10px", float: "right"}}>新增選項</Button>
                            </Form.Item>
                            <Form.Item name="code">
                                <Table name="code" dataSource={codeSystemDeteil} columns={codeSystemOption}/>
                            </Form.Item>
                            <Form.Item>
                                <Button block className="btn" htmlType="submit" type='primary' style={{ width: "150px", margin: "10px 150px 10px 10px", float: "right"}}>建立</Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                    <Row>
                        <Col span={24}>
                        <InfiniteScroll
                            dataLength={datas.length}
                            next={getAllDatas}
                            hasMore={datas.length < 10}
                            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                            scrollableTarget="scrollableDiv"
                            style={{ margin: '0px auto'}}
                        >
                            <List
                                grid={{
                                  column: 1
                                }}
                                dataSource={filterList == null ? datas : filterList}
                                renderItem={(data, index) => (
                                    <List.Item key={index}>
                                        <Card
                                            style={{ margin: "10px", fontSize: "18px", borderRadius: "15px", color: "#002339", background: "#fff", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }} 
                                            actions={[ 
                                                // <Tooltip title="收藏">
                                                //     <HeartOutlined />
                                                // </Tooltip>, 
                                                <Tooltip title="詳細內容"  style={{ borderColor: "#af7c20"}}>
                                                    <ContainerOutlined style={{color: "#006288"}} onClick={()=>{setFileIndex(index); setFile(data._id); setDeteil(true);}} />
                                                </Tooltip>, 
                                                <Tooltip title="刪除">
                                                    <Popconfirm title="確定要刪除此編碼架構嗎？">
                                                        <DeleteOutlined style={{color: "#006288"}} />
                                                    </Popconfirm>
                                                </Tooltip>
                                            ]}
                                        >
                                            <Meta title={data.codeName} description={data.purpose} style={{ fontSize: "18px" }}/>
                                        </Card>
                                        <Modal 
                                            title={datas[getFileIndex()].codeName}
                                            visible={deteil}
                                            onCancel={handleCancel}
                                            footer={null}
                                        >
                                            <Row>
                                                <Col>
                                                    <div>目的： {datas[getFileIndex()].purpose}</div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                <Form form={form} component={false}>
                                                    <Table dataSource={datas[getFileIndex()].code} columns={margedColumns} components={components} rowClassName='editable-row' pagination={{ onChange: cancel }} scroll={{ y: 240 }} />
                                                </Form>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <div>建立人： {datas[getFileIndex()].source}</div>
                                                </Col>
                                            </Row>
                                        </Modal>
                                    </List.Item>
                                )}
                            />
                        </InfiniteScroll> 
                        </Col>
                    </Row>
                </Col>
            </Row>
            </div>
        </div>
        <Footer style={{ background: "#000406", color: "#5f8497", textAlign: 'center', position: "absolute", boxSizing: "border-box", bottom: "0", width: "100%", fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </div>
  )
}
