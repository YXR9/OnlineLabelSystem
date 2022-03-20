import React, { useState, useEffect } from "react";
import "../components/modal.css";
import DataPick from "../components/DataPick";
import axios from "axios";
import { getAuthToken } from "../utils";

export default function Codingpage(props) {
     // get data from API
     const [ datas, setDatas ] = useState([]);

     const url = 'http://localhost:8080/';
 
     useEffect(() => {
         getAllDatas();
     }, []);
 
     const getAllDatas = () => {
        var data = JSON.stringify({
            "fileId": "622471df1730db0496083cd3",
            "userId": getAuthToken(),
            "encodeTaskId": "622c4626f4db8a2efc9d4cc4"
          });
        axios.get(`${url}data/userData`)
         .then((res) => {
             // const allDatas = res.data.datas.allDatas;
             // add data to state
             setDatas(res.data);
         })
         .catch(error => console.error(`Error: ${error}`));
     }

     return (
         <DataPick datas={datas}/>
     )
}