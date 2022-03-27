import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Layout, Drawer, Menu, Button, Row, Col, Avatar, Popover } from 'antd'
import { CodeOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons'
import { getUsername, setAuthToken } from '../utils';

export default function Navbar() {
  const history = useHistory();
  const [ visible, setVisible ] = useState(false);
  const [ placement, setPlacement ] = useState('left');

  const showDrawer = () => {
    setVisible(true);
  }
  const hideDrawer = () => {
    setVisible(false);
  }

  const onClose = () => {
    setVisible(false);
  }

  const logOut = () => {
    setAuthToken("");
    history.push('/');
  }

  const username = getUsername()
  const content = (
    <div>
      <Row>
        <Col style={{ margin: "0px auto"}}>
          {username}
        </Col>
      </Row>
      <Row>
        <Col>
          <Button icon={<LogoutOutlined title='LogOut'/>} style={{borderColor: '#FFF', fontFamily: 'Comic Sans MS'}}  onClick={logOut}>LogOut</Button>
        </Col>
      </Row>
    </div>
  )

  return (
    <Layout>
      <nav>
        <Row>
            <Col>
                <Button title='網站首頁' icon={<CodeOutlined style={{ fontSize: "180%"}} />} style={{ margin: "0px 15px", border: "none", background: 'url(http://1.bp.blogspot.com/-YODKGVfWimA/VaXaz68qdRI/AAAAAAAAMFA/MZZGV1lGxd4/s1600/yellow-bg-100.jpg) #f2f0ec', color: "#af7c20" }} onClick={() => { history.push("/list")}}/>
            </Col>
            <Col>
                <h2 style={{ color: '#af7c20', fontFamily: 'Comic Sans MS', cursor: "pointer"}} onClick={() => { history.push("/list")}} title="OnlineLabelSystem" >OnlineLabelSystem</h2>
            </Col>
        </Row>
        <Row>
            <Col pull={1}>
                <Menu key={1} style={{ background: 'url(http://1.bp.blogspot.com/-YODKGVfWimA/VaXaz68qdRI/AAAAAAAAMFA/MZZGV1lGxd4/s1600/yellow-bg-100.jpg) #f2f0ec', color: "#56514b", fontSize: "16px", lineHeight: "35px"}} mode="horizontal">
                    <Menu.Item onClick={ () => { history.push("/list")} }>資料總管</Menu.Item>
                    <Menu.Item onClick={() => { history.push("/codepage")}}>編碼任務</Menu.Item>
                    <Menu.Item onClick={ () => { history.push("/codesystem")}}>編碼架構</Menu.Item>
                </Menu>
            </Col>
            <Col>
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
