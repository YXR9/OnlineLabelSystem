import React, { useState } from "react";
import "./modal.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Checkbox, Space, Form } from "antd";
// import api from "../api"
// import { Form } from "antd";

const perspective = ['安全面', '科學與技術面', '環保面', '社會面', '經濟面'];
const purpose = ['提出論點或主張(CA1)', '提出疑問(CA2)', '提出挑戰(CA3)', '進行推論(CA4)', '表達支持(CA5)', '其他(CA6)'];

export default function Modal({ object: { data, edited }, setOpenModal }) {
  let Options1 = [];
  let Options2 = [];
  const [perspectiveValue, setPerspectiveValue] = useState("");
  const [purposeiveValue, setPpurposeValue] = useState("");

  const onChangePerspective = e => {
    console.log('perspective: ', e);
    setPerspectiveValue(e);
  }

  const onChangePurpose = e => {
    console.log('purpose: ', e);
    setPpurposeValue(e);
  }
  // const [label, setLabel] = useState('');
//   useEffect(() => {
//     const fetchDatas = async() => {
//         try {
//             const res = await api.get('/users/1/posts');
//             setDatas(res.data);
//         } catch (err) {
//             if (err.res) {
//                 console.log(err.res.data);
//                 console.log(err.res.status);
//                 console.log(err.res.headers)
//             } else {
//                 console.log(`Error: ${err.message}`);
//             }
//         }
//     }
//     fetchDatas();
// },[]);


  const handleChange1 = (value) => {
    Options1 = [];
    value.map(item=>{
      Options1.push(item.value);
    })
    console.log(Options1);
  }

  const handleChange2 = (value) => {
    Options2 = [];
    value.map(item => {
      Options2.push(item.value);
    })
    console.log(Options2);
  }

  const saveLabel = async (e) => {
    
    // event.preventDefault();
    alert('Save successful!!');
    // console.log({Options1});
    // console.log({Options2});
    // setLabel({Options1},{Options2});
    // try {
    //   const res = await api.post('/users/1/posts', data);
    //   Options1=[]
    // } catch (err) {
    //   console.log(`Error: ${err.message}`);
    // }
    
  }

  return (
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button onClick={() => { setOpenModal(false); }}>
              X 
            </button>
          </div>
          <div className="body">
            {data}
          </div>
          <Form>
            <Form.Item name="perspective" label="論點面向" className='checkbox'>
              <Checkbox.Group options={perspective} onChange={onChangePerspective} value={perspectiveValue} style={{ display: 'grid' }}>
                {/* <Space direction='vertical'>
                  <Checkbox value="安全面"> 安全面 </Checkbox>
                  <Checkbox value="科學與技術面"> 科學與技術面 </Checkbox>
                  <Checkbox value="環保面"> 環保面 </Checkbox>
                  <Checkbox value="社會面"> 社會面 </Checkbox>
                  <Checkbox value="經濟面"> 經濟面 </Checkbox>
                </Space> */}
              </Checkbox.Group>
            </Form.Item>
            <Form.Item name="purpose" label="發言目的" className='checkbox'>
              <Checkbox.Group options={purpose} onChange={onChangePurpose} value={purposeiveValue} style={{ display: 'grid' }}>
                {/* <Space direction='vertical'>
                  <Checkbox op="提出論點或主張(CA1)"> 提出論點或主張(CA1) </Checkbox>
                  <Checkbox value="提出疑問(CA2)"> 提出疑問(CA2) </Checkbox>
                  <Checkbox value="提出挑戰(CA3)"> 提出挑戰(CA3) </Checkbox>
                  <Checkbox value="進行推論(CA4)"> 進行推論(CA4) </Checkbox>
                  <Checkbox value="表達支持(CA5)"> 表達支持(CA5) </Checkbox>
                  <Checkbox value="其他(CA6)"> 其他(CA6) </Checkbox>
                </Space> */}
              </Checkbox.Group>
            </Form.Item>
          </Form>
          {/* <h4>論點面向</h4> */}
          {/* <Select components = { animatedComponents } isMulti options = { options1 } onChange={handleChange1}/> */}
          {/* <h4>發言目的</h4> */}
          {/* <Select components = { animatedComponents } isMulti options = { options2 } onChange={handleChange2}/> */}
          <div className="footer">
            <button type="button" onClick={() => { {saveLabel()} setOpenModal(false); }} id="saveBtn">
              Save
            </button>
          </div>
        </div>
      </div>
  );
}