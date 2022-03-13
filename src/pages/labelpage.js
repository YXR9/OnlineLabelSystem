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
            setDatas(res.data);
        })
        .catch(error => console.error(`Error: ${error}`));
    }

    return (
        <DataTimeline datas={datas} />
    )
}