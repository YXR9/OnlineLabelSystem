import { Layout } from 'antd';
import React from 'react'
import Navbar from '../components/Navbar';

const { Footer } = Layout;

export default function Codesystempage() {
  return (
    <div className='App'>
        <Navbar/>
        <div className='App-header'>
            123
        </div>
        <Footer style={{ background: "url(http://1.bp.blogspot.com/-YODKGVfWimA/VaXaz68qdRI/AAAAAAAAMFA/MZZGV1lGxd4/s1600/yellow-bg-100.jpg) #f2f0ec", color: "#4b4741", textAlign: 'center', position: "absolute", boxSizing: "border-box", bottom: "0", width: "100%", fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </div>
  )
}
