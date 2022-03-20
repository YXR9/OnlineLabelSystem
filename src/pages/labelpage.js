import React, { useEffect, useState } from "react";
import DataTimeline from '../components/DataTimeline';
import axios from "axios";
import { getAuthToken } from "../utils";


export default function Labelpage() {
    
    // get data from API
    const [ datas, setDatas ] = useState('');
    const [ adjustData, setAdjustData ] = useState('');

    const url = 'http://localhost:8080/';

    useEffect(() => {
        getAllDatas();
        getAdjustData();
    }, []);

    const getAllDatas = () => {
        var data = JSON.stringify({
            "fileId": "622471df1730db0496083cd3",
            "userId": getAuthToken(),
            "encodeTaskId": "622c4626f4db8a2efc9d4cc4"
          });
        axios.get(`${url}data/userData`)
        .then((res) => {
            setDatas(res.data);
        })
        .catch(error => console.error(`Error: ${error}`));
    }

    const getAdjustData = () => {
        var data = JSON.stringify({
            "fileId": "622471df1730db0496083cd3",
            "encodeTaskId": "622c4626f4db8a2efc9d4cc4"
        });
        axios.get(`${url}data/adjustData`)
        .then((data) => {
            console.log("AdjustData", data.data)
            setAdjustData(data.data);
        })
        .catch(error => console.error(`Error: ${error}`));
    }

    return (
        <DataTimeline datas={datas} adjustData={adjustData} />
    )
}