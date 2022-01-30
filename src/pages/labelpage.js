import React, { useEffect, useState } from "react";
import DataTimeline from '../components/DataTimeline';
import axios from "axios";


export default function Labelpage() {
    
    // get data from API
    const [ datas, setDatas ] = useState('');

    const url = 'http://localhost:8080/';

    useEffect(() => {
        getAllDatas();
    }, []);

    const getAllDatas = () => {
        axios.get(`${url}data/test`)
        .then((res) => {
            // const allDatas = res.data.datas.allDatas;
            // add data to state
            setDatas(res.data);
        })
        .catch(error => console.error(`Error: ${error}`));
    }
    // const initialValue = [
    //     {id: "1", data: "使用核能發電，不但成本低，更能快速發電，又不會受到氣候的影響，可以如此快速發電，除了核能發電廠外，又有什麼可以代替它呢？", edited: false},
    //     {id: "2", data: "它會產生高低階的放射性廢料，使用過的燃料雖然體積不大，但因有放射性物質，必須妥善處理，也是一種困擾，而且核能的熱污染較嚴重，也是缺點之一。", edited: false},
    //     {id: "3", data: "有人覺得核能發電可以帶來很足夠的電力，所以贊成核能發電；但是，有些人覺得如果核能外洩，會影響到環境，讓溫度變高，讓大家過得很痛苦。", edited: false}
    // ];
    // const [OpenModal, setOpenModal] = useState(false);
    // const [activeObject, setActiveObject] = useState(null);
    

    // useEffect(() => {
    //     const fetchDatas = async() => {
    //         try {
    //             const res = await apiUserLogin.get('/users/1/posts');
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

    return (
        <DataTimeline datas={datas} />
        // <div>
        //     <div className="header">
        //         <PageHeader className="site-page-header" title="LabelSystem"/>
        //         <div>
        //             {/* <Link>
        //                 <img className="upload" src={upload}/>
        //             </Link> */}
        //         </div>
        //     </div>
        //     <Card title="Data" className="datalist" >
        //         {datas.map((data) => {
        //             return <Button key={data.DDI d} type="primary" className="data" onClick={()=>{ setActiveObject(data); setOpenModal(true); }}>{data.dataName}</Button>;
        //         })}
        //     </Card>
        //     {OpenModal && <Modal object={activeObject} setOpenModal={setOpenModal}/>}
        // </div>
    )
}