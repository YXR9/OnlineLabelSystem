import React from "react";
import { Form, Input , message, Upload, Select, Button, InputNumber, DatePicker, Row, Col } from 'antd';
import Navbar from "./Navbar";

const FileDetails = ({ nextStep, handleChange, values }) => {
    
    const Next = e => {
        e.preventDefault();
        nextStep();
    }
    
    return (
    //     <div className='App'>
    //         <Navbar/>
    //         <div style={{ width: "90%", margin: "0px auto", padding: "20px"}}>
    //             <header className='App-header' style={{ margin: "100px 0px"}}>
                    <Form>
                        <Form.Item 
                            name='fileName'
                            label="資料名稱"  
                            hasFeedback 
                            rules={[{ require: true, message: "Please enter filename" },]}
                        >
                            <Input name='fileName' value={values.fileName} onChange={handleChange('fileName')}/>
                        </Form.Item>
                        <Form.Item>
                            <Button onClick={ Next }>下一步</Button>
                        </Form.Item>
                    </Form>
        //         </header>
        //     </div>
        // </div>
    )
}

export default FileDetails