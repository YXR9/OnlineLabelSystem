import { PlusOutlined, ContainerOutlined, DeleteOutlined } from '@ant-design/icons';
import { Layout, Input, Row, Col, Button, Modal, Form, Divider, List, Card, Tooltip, Popconfirm, message, Table, PageHeader } from 'antd';
import axios from 'axios';
import React, { useEffect, useState, useContext, useRef } from 'react'
import Navbar from '../components/Navbar';
import { getAuthToken, getUsername, getFileIndex, setFile, setFileIndex } from '../utils';

const EditableContext = React.createContext(null);
const { Footer } = Layout;
const { Search } = Input;
const { Meta } = Card;

export default function Codesystempage() {
  const [ datas, setDatas ] = useState('');
  const [ isModalVisible, setIsModalVisible ] = useState(false);
  const [ deteil, setDeteil ] = useState(false);
  const [ codeSystemDeteil, setCodeSystemDeteil ] = useState([]);

  const url = 'http://localhost:8080/';

  useEffect(() => {
      getAllDatas();
      handleAdd();
  }, []);

  const showJoinTask = () => {
      setIsModalVisible(true);
  }

  // const showDeteil = () => {
  //   setDeteil(true);
  //   setAuthToken()
  //   // console.log(index)
  // }

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
      // const data = new FormData();
      // data.append('userId', userId);
      // data.append('codeName', codeName);
      // data.append('purpose', purpose);
      // data.append('code.option', option);
      // data.append('code.description', description);
      // data.append('source', source);
      // // console.log(userId, coCode);

      // axios.post(`${url}code/codeSystem`, data)
      // .then((res) => {
      //     message.success("成功建立編碼架構🎉");
      //     setIsModalVisible(false);
      //     console.log(res);
      // }).catch (error => {
      //     message.error(error.message);
      // })
  }

  const handleCancel = () => {
      setIsModalVisible(false);
      setDeteil(false);
  }

  const getAllDatas = () => {
      const userId = getAuthToken()
      axios.get(`${url}code/codeSystem/${userId}`)
      .then((res) => {
          // const allDatas = res.data.datas.allDatas;
          // add data to state
          setDatas(res.data);
      })
      .catch(error => console.error(`Error: ${error}`));
  }

  const onSearch = value => {
    console.log(value);
  }

  // const childData = datas.code;
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
    }
  ]

  const codeSystemOption = [
    {
        title: "選項",
        dataIndex: "option",
        key: "option",
        // render: <Form.Item name="option">
        //   <Input/>
        // </Form.Item>
    },
    {
        title: "說明",
        dataIndex: "description",
        key: "description",
        // render: <Form.Item name="description">
        //   <Input/>
        // </Form.Item>
    }
  ]

  const EditableRow = ({...data}) => {
    const [ form ] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...data}/>
        </EditableContext.Provider>
      </Form>
    )
  }

  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);
  
    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };
    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };
  
    let childNode = children;
  
    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }
  
    return <td {...restProps}>{childNode}</td>;
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell
    }
  }
  
  const column = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        // handleSave: handleSave,
      }),
    };
  });

  const handleAdd = () => {
    const newOption = {
        option: <Form.Item name="option"><Input name='option' placeholder='Please enter option'/></Form.Item>,
        description: <Form.Item name="description"><Input name='description' placeholder='Please enter description.'/></Form.Item>
    }
    // console.log("ok")
    setCodeSystemDeteil((pre) => {
      return [...pre, newOption];
    });
    // console.log("okk")
  }

  return (
    <div className='App'>
        <Navbar/>
        <div style={{ width: "90%", margin: "0px auto", padding: "20px"}}>
        <PageHeader title="編碼架構"/>
                <Col>
                    <Search size='large' placeholder='搜尋編碼架構' allowClear onSearch={onSearch} style={{ width: "500px", lineHeight: "100px" ,background: "#fbfaf7" }} bordered={false} enterButton={false}/>
                    {/* <HeartOutlined /> */}
                </Col>
        <div className='App-header'>
            <div style={{ padding: "700px 300px"}}>
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
                            <List
                                grid={{ gutter: 16, colum: 4  }}
                                dataSource={datas}
                                // scroll={{ y: 240 }}
                                renderItem={(data, index) => (
                                    <List.Item key={index}>
                                        <Card
                                            style={{ margin: "10px", width: 450, fontSize: "18px", borderColor: "#56514b", borderWidth: "3px", borderRadius: "5px", color: "#56514b", background: "#fbfaf7" }} 
                                            actions={[ 
                                                // <Tooltip title="收藏">
                                                //     <HeartOutlined />
                                                // </Tooltip>, 
                                                <Tooltip title="詳細內容"  style={{ borderColor: "#af7c20"}}>
                                                    <ContainerOutlined style={{color: "#56514b"}} onClick={()=>{setFileIndex(index); setFile(data._id); setDeteil(true);}} />
                                                </Tooltip>, 
                                                <Tooltip title="刪除">
                                                    <Popconfirm title="確定要刪除此編碼架構嗎？">
                                                        <DeleteOutlined style={{color: "#56514b"}} />
                                                    </Popconfirm>
                                                </Tooltip>
                                            ]}
                                        >
                                            <Meta title={data.codeName} description={data.purpose} style={{ fontSize: "18px" }}/>
                                        </Card>
                                        <Modal 
                                            title={datas[0].codeName}
                                            visible={deteil}
                                            onCancel={handleCancel}
                                            footer={null}
                                        >
                                            <Row>
                                                <Col>
                                                    <div>目的： {datas[0].purpose}</div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Table dataSource={datas[0].code} columns={column} components={components} rowClassName={() => 'editable-row'} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <div>建立人： {datas[0].source}</div>
                                                </Col>
                                            </Row>
                                        </Modal>
                                    </List.Item>
                                )}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
            </div>
        </div>
        <Button style={{ fontFamily: "Comic Sans MS", fontSize: "50px", margin: "-60px 0px 0px 0px", textAlign: "center", padding: "0px 0px 7px 0px", float: "right", borderRadius: "50%", width: "70px", height: "70px", boxShadow: "1px 3px 5px 0px black", lineHeight: "0px", border: "0px", background: "#ae7b20", color: "#f8f7f5"}} onClick={showJoinTask}>+</Button>
        </div>
        <Footer style={{ background: "url(http://1.bp.blogspot.com/-YODKGVfWimA/VaXaz68qdRI/AAAAAAAAMFA/MZZGV1lGxd4/s1600/yellow-bg-100.jpg) #f2f0ec", color: "#af7c20", textAlign: 'center', position: "absolute", boxSizing: "border-box", bottom: "0", width: "100%", fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </div>
  )
}
