import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Layout, Drawer, Menu, Button, Row, Col, Avatar, Popover } from 'antd'
import { MenuOutlined, FolderOutlined, ProjectOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons'

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
    history.push('/');
  }

  const content = (
    <div>
      <Button icon={<LogoutOutlined title='LogOut'/>} style={{borderColor: '#FFF', fontFamily: 'Comic Sans MS'}}  onClick={logOut}>LogOut</Button>
    </div>
  )

  return (
    <Layout>
      <nav>
        <Row>
            <Col>
                <Button type='primary' icon={<MenuOutlined style={{color:'#EEEEEE', float: 'left'}}/>} onClick={showDrawer} style={{backgroundColor: '#0F044C', border: '#FCF8EC'}}></Button>
            </Col>
            <Col push={2}>
                <h2 style={{ color: '#EEEEEE', fontFamily: 'Comic Sans MS', cursor: "pointer"}} onClick={() => { history.push("/list")}} title="OnlineLabelSystem" >OnlineLabelSystem</h2>
            </Col>
        </Row>
        <Popover placement='bottom' content={content}>
            <Avatar size='large' icon={<UserOutlined />}/>
        </Popover>
      </nav>
      <Drawer placement={placement} closable={false} onClose={onClose} visible={visible} key={placement}>
          <Col push={2}>
              <Button type='primary' icon={<MenuOutlined style={{color:'#0F044C', float: 'left' }}/>} onClick={hideDrawer} style={{backgroundColor: '#EEEEEE', border: '#feffe6'}}></Button>
          </Col>
          <Menu style={{ margin: '15px 0px', backgroundColor: '#EEEEEE'}}>
              <Menu.Item icon={<FolderOutlined />} onClick={ () => { history.push("/list")} }>檔案總管</Menu.Item>
              <Menu.Item icon={<ProjectOutlined />} onClick={() => { history.push("/codepage")}}>編碼任務</Menu.Item>
          </Menu>
      </Drawer>
      {/* <nav> */}
          
      {/* </nav> */}
        
    </Layout>
    
  )
}
