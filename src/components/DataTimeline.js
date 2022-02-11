import React from "react";
import { PageHeader, Card, List, Skeleton, Divider, Empty } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";

export default function DataTimeline(props) {
    
    const displayDatas = (props) => {
        
        const {datas} = props;
        if(datas.length > 0) {
            return(
                <div>
                    <PageHeader className="site-page-header" title="LabelSystem"/>
                    <div
                        id="scrollableDiv"
                        style={{
                            width: "80%",
                            height: 800,
                            overflow: 'auto',
                            position: 'absolute',
                            left: "48%",
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                            margin:'40px',
                            padding: 'auto'
                        }}
                    >
                        
                        <InfiniteScroll
                            dataLength={datas.length}
                            hasMore={datas.length < 50}
                            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                            scrollableTarget="scrollableDiv"
                        >
                            <Divider orientation="left" style={{fontSize: "25px", fontFamily: "Noto Sans Mono CJK TC"}}>Discuss Datas</Divider>
                            <List
                                dataSource={datas}
                                renderItem={(data) => (
                                    <List.Item style={{margin: '1px 15px'}}>
                                        {/* <CheckCircleTwoTone twoToneColor="#52c41a" /> */}
                                        <Card
                                            hoverable
                                            style={{
                                                width: '100%',
                                                margin: '10px',
                                                fontSize: '22px'
                                            }}
                                        >
                                            {data.dataName}
                                        </Card>
                                    </List.Item>
                                )} />
                        </InfiniteScroll>
                    </div>
                </div>
                
            )
        } else {
            return (
            <Empty
                style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%"
                    
                }} 
                description={false}
            />)
        }
    }
    return(
        <>
            {displayDatas(props)}
        </>
    )
}