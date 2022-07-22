import {Alert, Avatar, Col, Collapse, Descriptions, Row, Statistic, Tabs} from 'antd';
import {AntDesignOutlined, LikeOutlined} from '@ant-design/icons';
import React, {useEffect, useState} from "react";
import {test} from "../../../service/commonService";

const {TabPane} = Tabs;
const {Panel} = Collapse;
const text = `A dog is a type of domesticated animal.
            Known for its loyalty and faithfulness,
            it can be found as a welcome guest in many households across the world.
            `;

export default function MyMessage() {

    const [staffInfo, setStaffInfo] = useState([
        {label: "电话", value: "1803029xxx1", span: 1},
        {label: "微信", value: "微信", span: 1},
        {label: "邮箱", value: "hnaixx@1663.com", span: 1},
    ])

    useEffect(() => {
        test().then(res => {
            console.log(res.data)
        })
    },[])

    const renderStaffInfo = () => {
        const descriptions = []
        staffInfo.forEach(item => {
            descriptions.push(
                <Descriptions.Item label={item.label}>
                    {item.value}
                </Descriptions.Item>
            )
        })
        return (<Collapse defaultActiveKey={['1', '2']}>
            <Panel header="1、基础信息" key="1">
                <Descriptions column={2} bordered={true}>
                    {descriptions}
                </Descriptions>
            </Panel>
            <Panel header="2、工作信息" key="2">
                <p>{text}</p>
            </Panel>
        </Collapse>)
    }


    return (<>
        <div style={{}}>
            <Row
                style={{
                    width: '100%',
                    // height: '150px',
                    border: '1px solid #efefef',
                    // display: "flex",
                    // flexDirection: 'column',
                }}
            >
                <Col
                    span={4}
                    style={{
                        border: '1px solid #efefef',
                    }}>
                    <Avatar
                        size={{
                            // 超小屏幕
                            // xs: 24,
                            // 小屏幕
                            // sm: 32,
                            // 中等屏幕
                            // md: 40,
                            // 大屏幕
                            // lg: 64,
                            // 超大屏幕
                            xl: 100,
                            // xxl: 100,
                        }}
                        style={{
                            top: '18%',
                            left: '22%',
                            // padding:'10px 10px 10px 10px'
                        }}
                        icon={<AntDesignOutlined/>}
                    />
                </Col>
                <Col
                    span={10}
                    style={{
                        padding: '4px 4px 4px 4px',
                        border: '1px solid #efefef',
                    }}
                >
                    <Descriptions title="欢迎您，张三！" column={2}>
                        <Descriptions.Item label="性别">男</Descriptions.Item>
                        <Descriptions.Item label="生日">2000.07.04</Descriptions.Item>
                        <Descriptions.Item label="证件号码">350321199809090241</Descriptions.Item>
                    </Descriptions>
                </Col>
                <Col
                    span={10}
                    style={{
                        border: '1px solid #efefef',
                    }}
                >
                    <Row
                        style={{
                            border: '1px solid #efefef',
                        }}
                    >
                        <Col span={8}>
                            <Statistic title="工龄" value={10} prefix={<LikeOutlined/>}/>
                        </Col>
                        <Col span={8}>
                            <Statistic title="我的待办" value={3}/>
                        </Col>
                        <Col span={8}>
                            <Statistic title="信息完整度" value={93} suffix="/ 100"/>
                        </Col>
                    </Row>
                    <Row>
                        <Descriptions column={2}>
                            <Descriptions.Item label="电话">1803029xxx1</Descriptions.Item>
                            <Descriptions.Item label="微信">hhnailxxx1</Descriptions.Item>
                            <Descriptions.Item label="邮箱">hnaixx@1663.com</Descriptions.Item>
                        </Descriptions>
                    </Row>
                </Col>
            </Row>
            <Row
                style={{
                    height: '100%',
                    width: '100%',
                }}
            >
                <Tabs defaultActiveKey="1" style={{
                    width: '100%',
                }}>
                    <TabPane tab="我的基本信息" key="1">
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                        }}>
                            <div>
                                <Alert
                                    type="success"
                                    message={
                                        `您提交的个人信息正在审核中
                                        \n
                                        内容为【性别[空]->[男]】`
                                    }
                                    style={{
                                        width: 210,
                                    }}/>
                            </div>
                            <div style={{
                                padding: '10px 10px 10px 10px',
                                width: '100%',
                            }}>
                                {renderStaffInfo()}
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="我的附表信息" key="2">
                        Content of Tab Pane 2
                    </TabPane>
                    <TabPane tab="Tab 3" key="3">
                        Content of Tab Pane 3
                    </TabPane>
                </Tabs>
            </Row>
        </div>
    </>)
}

