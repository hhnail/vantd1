import {Alert, Avatar, Badge, Col, Descriptions, Row, Statistic, Tabs} from 'antd';
import {AntDesignOutlined, LikeOutlined} from '@ant-design/icons';

const {TabPane} = Tabs;
export default function StaffDesktop() {
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
                                    message="
                                    您提交的个人信息正在审核中
                                    内容为【性别[空]->[男]】
                                    "
                                    style={{
                                        width: 210,
                                    }}/>
                            </div>
                            <div style={{
                                padding: '10px 10px 10px 10px',
                            }}>
                                <Descriptions bordered={true} column={3}>
                                    <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
                                    <Descriptions.Item label="Billing Mode">Prepaid</Descriptions.Item>
                                    <Descriptions.Item label="Automatic Renewal">YES</Descriptions.Item>
                                    <Descriptions.Item label="Order time">2018-04-24 18:00:00</Descriptions.Item>
                                    <Descriptions.Item label="Usage Time" span={2}>
                                        2019-04-24 18:00:00
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Status" span={3}>
                                        <Badge status="processing" text="Running"/>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Negotiated Amount">$80.00</Descriptions.Item>
                                    <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
                                    <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item>
                                    <Descriptions.Item label="Config Info">
                                        Data disk type: MongoDB
                                        <br/>
                                        Database version: 3.4
                                        <br/>
                                        Package: dds.mongo.mid
                                        <br/>
                                        Storage space: 10 GB
                                        <br/>
                                        Replication factor: 3
                                        <br/>
                                        Region: East China 1<br/>
                                    </Descriptions.Item>
                                </Descriptions>
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


