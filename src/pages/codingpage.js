import React, { useState, useEffect } from "react";
import "../components/modal.css";
import DataPick from "../components/DataPick";
import axios from "axios";
import { getFileId, getAuthToken, getEncodeTaskId } from "../utils";

export default function Codingpage(props) {
     // get data from API
     const [ datas, setDatas ] = useState([]);

     const url = 'http://localhost:8080/';
 
     useEffect(() => {
         getAllDatas();
     }, []);
 
     const getAllDatas = () => {
        var data = JSON.stringify({
            "fileId": getFileId(),
            "userId": getAuthToken(),
            "encodeTaskId": getEncodeTaskId()
          });
        axios.get(`${url}data/userData`)
         .then((res) => {
             // const allDatas = res.data.datas.allDatas;
             // add data to state
             setDatas(res.data);
             console.log("fileId: ", getFileId())
         })
         .catch(error => console.error(`Error: ${error}`));
     }

     return (
         <DataPick datas={datas}/>
     )
}