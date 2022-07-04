import React, { useEffect, useState } from "react";
import DataTimeline from '../components/DataTimeline';
import axios from "axios";
import { getAuthToken, getFileId, getEncodeTaskId } from "../utils";
import { useParams } from "react-router-dom";

var url = 'http://localhost:8080/';

export default function Labelpage() {
    // const [ user, setUser ] = useState(null);
    // const [ file, setFile ] = useState(null);
    // const [ encodeTask, setEncodeTask ] = useState(null);
    // get data from API
    const [ datas, setDatas ] = useState([]);
    const [ adjustData, setAdjustData ] = useState([]);

    const { handle } = useParams();

    useEffect(() => {
        // getAdjustData(handle).then(setUser);
        // getFileId(handle).then(setFile);
        // getEncodeTaskId(handle).then(setEncodeTask);
        getAllDatas();
        getAdjustData();
    }, [handle]);

    const getAllDatas = () => {
        var data = ({
          "userId": getAuthToken(),
          "fileId": getFileId(),
          "encodeTaskId": getEncodeTaskId()
        });
        var config = {
            method: 'get',
            url: `${url}data/userData?userId=${getAuthToken()}&fileId=${getFileId()}&encodeTaskId=${getEncodeTaskId()}`,
            headers: {
              'Content-Type': 'application/json',
            //   'Cookie': 'connect.sid=s%3A5Go4tS-x350sMnz7U3Osp2U8gHF9QDe1.0xdgbe54QYQKgNHr5MQFHCJOv%2BakBkZFd5H1wVpKJXU'
            },
            data : data,
            // params: data
        };
        console.log(config);
          
          axios(config)
          .then(function (response) {
              setDatas(response.data)
              console.log("data: ", getFileId(), getAuthToken(), getEncodeTaskId())
              console.log("content: ", response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    
    const getAdjustData = () => {
      var adjustData = {
          // "encodeTaskId": getEncodeTaskId(),
          // "fileId": getFileId()
          "encodeTaskId": "622c4626f4db8a2efc9d4cc4",
          "fileId": "622471df1730db0496083cd3"
      };
      var adjustConfig = {
          method: 'get',
          url: `${url}data/adjustData/${getEncodeTaskId()}/${getFileId()}`,
          headers: { 
            'Content-Type': 'application/json', 
            // 'Cookie': 'connect.sid=s%3A5Go4tS-x350sMnz7U3Osp2U8gHF9QDe1.0xdgbe54QYQKgNHr5MQFHCJOv%2BakBkZFd5H1wVpKJXU'
          },
          data : adjustData,
      };
      console.log(adjustConfig)
        
      axios(adjustConfig)
      .then(function (response) {
          setAdjustData(response.data);
          console.log("encodeTaskId: ",getEncodeTaskId(), "fileId: ", getFileId())
          console.log("adjust: ", response.data);
      })
      .catch(function (error) {
          console.log(error);
      });
    }

    return (
        <DataTimeline datas={datas} adjustData={adjustData} />
    )
}