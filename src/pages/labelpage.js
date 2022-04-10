import React, { useEffect, useState } from "react";
import DataTimeline from '../components/DataTimeline';
import axios from "axios";
import { getAuthToken, getFileId, getEncodeTaskId } from "../utils";


export default function Labelpage() {
    
    // get data from API
    const [ datas, setDatas ] = useState([]);
    const [ adjustData, setAdjustData ] = useState('');

    useEffect(() => {
        getAllDatas();
        getAdjustData();
    }, []);

    const getAllDatas = () => {
        var data = JSON.stringify({
            "fileId": getFileId(),
            "userId": getAuthToken(),
            "encodeTaskId": getEncodeTaskId()
          });
          var config = {
            method: 'get',
            url: 'http://localhost:8080/data/userData',
            headers: { 
              'Content-Type': 'application/json', 
            //   'Cookie': 'connect.sid=s%3A5Go4tS-x350sMnz7U3Osp2U8gHF9QDe1.0xdgbe54QYQKgNHr5MQFHCJOv%2BakBkZFd5H1wVpKJXU'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
                setDatas(response.data)
                console.log(getFileId(),getAuthToken(),getEncodeTaskId())
                console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
          
        // axios.get(`${url}data/userData`, data)
        // .then((res) => {
        //     setDatas(res.data);
        // })
        // .catch(error => console.error(`Error: ${error}`));
    }

    const getAdjustData = () => {
        var dt = JSON.stringify({
            "encodeTaskId": getEncodeTaskId(),
            "fileId": getFileId()
        });
        var cfg = {
            method: 'get',
            url: 'http://localhost:8080/data/adjustData',
            headers: { 
              'Content-Type': 'application/json', 
            //   'Cookie': 'connect.sid=s%3A5Go4tS-x350sMnz7U3Osp2U8gHF9QDe1.0xdgbe54QYQKgNHr5MQFHCJOv%2BakBkZFd5H1wVpKJXU'
            },
            data : dt
          };
          
          axios(cfg)
          .then(function (res) {
                setAdjustData(res.data);
                console.log("adjust", JSON.stringify(res.data));
          })
          .catch(function (error) {
            console.log(error);
          });
          
        // axios.get(`${url}data/adjustData`, data)
        // .then((data) => {
        //     console.log("AdjustData", data.data)
        //     setAdjustData(data.data);
        // })
        // .catch(error => console.error(`Error: ${error}`));
    }

    return (
        <DataTimeline datas={datas} adjustData={adjustData} />
    )
}