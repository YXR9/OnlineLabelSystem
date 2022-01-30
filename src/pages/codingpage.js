import React, { useState, useEffect } from "react";
import "../components/modal.css";
import DataPick from "../components/DataPick";
import axios from "axios";

export default function Codingpage(props) {
     // get data from API
     const [ datas, setDatas ] = useState([]);

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

     return (
         <DataPick datas={datas}/>
     )
}