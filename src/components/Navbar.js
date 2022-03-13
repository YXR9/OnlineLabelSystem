import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Layout, Drawer, Menu, Button, Row, Col, Avatar, Popover } from 'antd'
import { MenuOutlined, FolderOutlined, ProjectOutlined, UserOutlined, LogoutOutlined, SearchOutlined } from '@ant-design/icons'
import { getAuthToken, getUsername, setAuthToken } from '../utils';

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
                <Button type='primary' icon={<MenuOutlined style={{color:'#4b4741', float: 'left'}}/>} onClick={showDrawer} style={{background: 'url(http://1.bp.blogspot.com/-YODKGVfWimA/VaXaz68qdRI/AAAAAAAAMFA/MZZGV1lGxd4/s1600/yellow-bg-100.jpg) #f2f0ec', border: '#f2f0ec'}}></Button>
            </Col>
            <Col push={2}>
                <h2 style={{ color: '#4b4741', fontFamily: 'Comic Sans MS', cursor: "pointer"}} onClick={() => { history.push("/list")}} title="OnlineLabelSystem" >OnlineLabelSystem</h2>
            </Col>
        </Row>
        <Popover placement='bottom' content={content}>
            <Avatar size='large' icon={<UserOutlined/>}/>
        </Popover>
      </nav>
      <Drawer placement={placement} closable={false} onClose={onClose} visible={visible} key={placement}>
          <Col push={2}>
              <Button type='primary' icon={<MenuOutlined style={{color:'#f2f0ec', float: 'left' }}/>} onClick={hideDrawer} style={{backgroundColor: '#4b4741', border: '#4b4741'}}></Button>
          </Col>
          <Menu style={{ margin: '15px 0px', backgroundColor: '#4b4741', color: '#f2f0ec', borderColor: "#4b4741"}}>
              <Menu.Item icon={<FolderOutlined />} onClick={ () => { history.push("/list")} }>檔案總管</Menu.Item>
              <Menu.Item icon={<ProjectOutlined />} onClick={() => { history.push("/codepage")}}>編碼任務</Menu.Item>
              <Menu.Item icon={<SearchOutlined />} onClick={ () => { history.push("/codesystem")}}>查詢編碼架構</Menu.Item>
          </Menu>
      </Drawer>
    </Layout>
    
  )
}
