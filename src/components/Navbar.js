import React, { useState } from 'react'
import { Layout, Drawer, Menu, Button, Row, Col } from 'antd'
import { MenuOutlined, UploadOutlined, SearchOutlined, ProjectOutlined, CodeOutlined, OneToOneOutlined, DownloadOutlined } from '@ant-design/icons'

const { Sider } = Layout;

export default function Navbar() {
  const [ visible, setVisible ] = useState(false);
  const [ placement, setPlacement ] = useState('left');

  const showDrawer = () => {
    setVisible(true);
  }

  const onClose = () => {
    setVisible(false);
  }

  return (
    <Layout>
      <nav>
        <Row>
            <Col>
                <Button type='primary' icon={<MenuOutlined style={{color:'#000', float: 'left'}}/>} onClick={showDrawer} style={{backgroundColor: '#FFF', border: '#FFF'}}></Button>
            </Col>
            <Col push={2}>
                <h2>OnlineLabelSystem</h2>
            </Col>
        </Row>
      </nav>
      <Drawer placement={placement} closable={false} onClose={onClose} visible={visible} key={placement}>
          <Menu>
              <Menu.Item icon={<UploadOutlined />}>上傳檔案</Menu.Item>
              <Menu.Item icon={<SearchOutlined />}>查詢/新增編碼系統</Menu.Item>
              <Menu.Item icon={<ProjectOutlined />}>建立獨立編碼任務</Menu.Item>
              <Menu.Item icon={<CodeOutlined />}>獨立編碼</Menu.Item>
              <Menu.Item icon={<OneToOneOutlined />}>編碼結果校正</Menu.Item>
              <Menu.Item icon={<DownloadOutlined />}>下載檔案</Menu.Item>
          </Menu>
      </Drawer>
      {/* <nav> */}
          
      {/* </nav> */}
        
    </Layout>
    
  )
}
