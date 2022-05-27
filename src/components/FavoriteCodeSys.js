import React from 'react'
import { Layout, Input, Row, Col, Button, Modal, Form, Divider, List, Card, Tooltip, Popconfirm, message, Table, Skeleton, Typography, Rate, Tabs } from 'antd';
import { ContainerOutlined, DeleteOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';

const { Meta } = Card;
const desc = ['收藏'];

export default function FavoriteCodeSys(props) {
    const displayFavCodeSystem = (props) => {
        const { favCodeSystem, getFavoriteCodeSys, filterList, setFileIndex, setFile, setDeteil, handleFavorite } = props;
        if (favCodeSystem.length > 0) {
            return(
                <div 
                    id="scrollableDiv"
                    style={{
                        height: 580,
                        overflow: 'auto',
                    }}
                >
                    <Row>
                        <Col span={24}>
                            <InfiniteScroll
                                dataLength={favCodeSystem.length}
                                next={getFavoriteCodeSys}
                                hasMore={favCodeSystem.length < 10}
                                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                                scrollableTarget="scrollableDiv"
                                style={{ margin: '0px auto'}}
                            >
                                <List
                                    grid={{  column: 1 }}
                                    dataSource={filterList == null ? favCodeSystem : filterList}
                                    renderItem={(data, index) => (
                                        <List.Item key={index}>
                                            <Card
                                                style={{ margin: "10px", fontSize: "18px", borderRadius: "15px", color: "#002339", background: "#fff", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }} 
                                                actions={[ 
                                                    <Tooltip title="收藏">
                                                        <Rate autoFocus tooltips={desc} count={1} onChange={handleFavorite} style={{ borderColor: "green"}}/>
                                                    </Tooltip>, 
                                                    <Tooltip title="詳細內容"  style={{ borderColor: "#af7c20"}}>
                                                        <ContainerOutlined style={{color: "#006288"}} onClick={()=>{setFileIndex(index); setFile(data._id); console.log("data.Index: ", data._id); setDeteil(true);}} />
                                                    </Tooltip>, 
                                                    <Tooltip title="刪除">
                                                        <Popconfirm title="確定要刪除此編碼架構嗎？">
                                                            <DeleteOutlined style={{color: "#006288"}} />
                                                        </Popconfirm>
                                                    </Tooltip>
                                                ]}
                                            >
                                                <Meta title={data.codeName} description={data.purpose} style={{ fontSize: "18px" }}/>
                                            </Card>
                                        </List.Item>
                                    )}
                                />
                            </InfiniteScroll> 
                        </Col>
                    </Row>
                </div>
            )
        }
    }
    return (
      <>
          {displayFavCodeSystem(props)}
      </>
    )
}
