import React, { useState } from "react";
import {  PageHeader, Card, Button } from 'antd';
import Modal from "../components/modal"
// import { Link } from "react-router-dom";
// import upload from '../img/upload.png';


function Labelpage(props) {
    
    const initialValue = [
        {id: "1", data: "使用核能發電，不但成本低，更能快速發電，又不會受到氣候的影響，可以如此快速發電，除了核能發電廠外，又有什麼可以代替它呢？"},
        {id: "2", data: "它會產生高低階的放射性廢料，使用過的燃料雖然體積不大，但因有放射性物質，必須妥善處理，也是一種困擾，而且核能的熱污染較嚴重，也是缺點之一。"},
        {id: "3", data: "有人覺得核能發電可以帶來很足夠的電力，所以贊成核能發電；但是，有些人覺得如果核能外洩，會影響到環境，讓溫度變高，讓大家過得很痛苦。"}
    ];
    
    const [ datas, setDatas ] = useState(initialValue);

    const [OpenModal, setOpenModal] = useState(false);

    return (
        <div>
            <div className="header">
                <PageHeader className="site-page-header" title="LabelSystem"/>
                <div>
                    {/* <Link>
                        <img className="upload" src={upload}/>
                    </Link> */}
                </div>
            </div>
            <Card title="Data" className="datalist" >
                {datas.map(data => {
                    return <Button key={data} type="primary" className="data" onClick={()=>{ setOpenModal(true); }}>{data.data}</Button>;
                })}
            </Card>
            {OpenModal && <Modal datas={datas} setOpenModal={setOpenModal}/>}
        </div>
        
        
    );
}

export default Labelpage;