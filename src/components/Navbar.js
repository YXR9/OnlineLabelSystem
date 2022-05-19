import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Layout, Drawer, Menu, Button, Row, Col, Avatar, Popover, Divider } from 'antd'
import { CodeOutlined, UserOutlined, LogoutOutlined, StarFilled } from '@ant-design/icons'
import { getUsername, setAuthToken } from '../utils';


export default function Navbar() {
  const history = useHistory();
  const [ visible, setVisible ] = useState(false);
  // const [ placement, setPlacement ] = useState('left');
  const [current, setCurrent] = useState('1');

  // const showDrawer = () => {
  //   setVisible(true);
  // }
  // const hideDrawer = () => {
  //   setVisible(false);
  // }

  // const onClose = () => {
  //   setVisible(false);
  // }

  const logOut = () => {
    setAuthToken("");
    history.push('/');
  }

  const handleClick = e => {
    setCurrent(e.key);
  }

  const username = getUsername()
  const content = (
    <div>
      <Row>
        <Col style={{ margin: '0px auto' }}>
          {username}
        </Col>
      </Row>
      <Divider style={{ margin: '10px auto'}}/>
      <Row>
        <Col >
          <Button icon={<LogoutOutlined/>} style={{borderColor: '#FFF', fontFamily: 'Comic Sans MS'}}  onClick={logOut}>登出</Button>
        </Col>
      </Row>
    </div>
  )

  return (
    <Layout>
      <nav>
        <Row>
            <Col style={{ margin: "0px 0px 0px 330px" }}>
                <Button title='網站首頁' icon={<CodeOutlined style={{ fontSize: "180%"}} />} style={{ margin: "0px 15px", border: "none", background: '#002339', color: "#39d8eb" }} onClick={() => { history.push("/list")}}/>
            </Col>
            <Col>
                <h1 style={{ color: '#39d8eb', fontFamily: 'Comic Sans MS', cursor: "pointer", lineHeight: "35px", fontSize: "1.2rem"}} onClick={() => { history.push("/list")}} title="OnlineLabelSystem" >OnlineLabelSystem</h1>
            </Col>
        </Row>
        <Row>
            <Col pull={1}>
                <Menu onClick={ handleClick } style={{ background: '#002339', color: "#f3f5f6", fontSize: "16px", lineHeight: "35px", borderColor: "#002339"}} mode="horizontal">
                    <Menu.Item key="1" onClick={ () => { history.push("/list"); }}>資料總管</Menu.Item>
                    <Menu.Item key="2" ><Link to={"/codepage"}>編碼任務</Link></Menu.Item>
                    <Menu.Item key="3" onClick={ () => { history.push("/codesystem"); }}>編碼架構</Menu.Item>
                
                </Menu>
            </Col>
            <Col style={{ margin: "0px 350px 0px 0px" }}>
                <Popover placement='bottom' content={content}>
                    <Avatar size='large' icon={<UserOutlined/>}/>
                </Popover>
            </Col>
        </Row>
      </nav>
      {/* <Drawer placement={placement} closable={false} onClose={onClose} visible={visible} key={placement}>
          <Col push={2}>
              <Button type='primary' icon={<MenuOutlined style={{color:'#f2f0ec', float: 'left' }}/>} onClick={hideDrawer} style={{backgroundColor: '#4b4741', border: '#4b4741'}}></Button>
          </Col> */}
      {/* </Drawer> */}
    </Layout>
    
  )
}
