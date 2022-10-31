import {Col, Collapse, Form, Input, message, Row, Space, Table, Button} from 'antd';
import React, {useEffect, useState} from 'react';
import {useForm} from "antd/es/form/Form";
import {DeleteTwoTone, PlusCircleOutlined} from '@ant-design/icons'
import uuid from 'react-uuid';
import CurdButtonGroup, {V_BUTTON_PLUGIN_TYPE} from "../../../../../component/CurdButtonGroup";
import {saveFreeReport} from "../../../../../service/freeReportService";
import {SYSTEM_MESSAGE} from "../../../../../enums/message";

const {Panel} = Collapse;

/**
 * 自由报表
 */
export default function FreeReportDetail() {

    useEffect(() => {
        reportForm.setFieldsValue({
            name: "系统树结构查询",
            moduleName: "自由报表",
            description: "查询系统中存在的各种树结构信息",
            reportSql: "select id,name,routing_address,type,LEVEL,leafy from tree_node where 1=1",
        })
    }, [])


    const [reportForm] = useForm()
    const [onlyView, setOnlyView] = useState(true)
    const [reportData, setReportData] = useState()

    const columns = [
        {
            title: '序号',
            key: 'key',
            render: (value, item, index) => index + 1,
        },
        {
            title: '字段名称',
            dataIndex: 'name',
            key: 'name',
            render: (value, item, index) => {
                return <Form.Item
                    style={{
                        marginTop: 15
                    }}
                    name={"free_column_name_" + index}
                >
                    <Input disabled={onlyView}/>
                </Form.Item>
            },
        },
        {
            title: '展示列名称',
            dataIndex: 'label',
            key: 'label',
            render: (value, item, index) => {
                return <Form.Item
                    style={{
                        marginTop: 15
                    }}
                    name={"free_column_label_" + index}
                >
                    <Input disabled={onlyView}/>
                </Form.Item>
            },
        },
        {
            title: '字段类型',
            dataIndex: 'type',
            key: 'type',
            render: (value) => {
                return value
            },
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render: (value, item, index) => {
                return <Button
                    icon={<DeleteTwoTone twoToneColor={"#ff0000"}/>}
                    disabled={onlyView}
                    onClick={() => {
                        // console.log("index:", index)
                        const newData = showFieldData.filter((value, index2) => {
                            return index2 != index
                        })
                        // console.log("delete newData:", newData)
                        setShowFieldData(newData)
                    }}
                />
            },
        },
    ];

    const EMPTY_ITEM = {
        key: uuid(),
        name: '',
        label: '',
        type: "文本"
    }

    const [showFieldData, setShowFieldData] = useState([EMPTY_ITEM]);


    return <>
        <Space>
            <CurdButtonGroup
                pluginType={V_BUTTON_PLUGIN_TYPE.CUDF}
                btnsSize={"small"}
                editClick={() => {
                    setOnlyView(false)
                }}
                saveClick={() => {
                    if (onlyView) {
                        message.info(SYSTEM_MESSAGE.CAN_NOT_AGAIN)
                        return
                    }
                    setOnlyView(true)
                    reportForm.validateFields().then((values) => {
                        saveFreeReport(values).then(res => {
                            message.success("操作成功！")
                        })
                    })
                }}
            />
        </Space>
        <Form
            form={reportForm}
            name="basic"
            size={"small"}
            layout={"horizontal"}
            initialValues={{
                remember: true,
            }}
            onFinish={() => {
            }}
            autoComplete="off"
            style={{
                padding: "10px 0px 0px 0px"
            }}
        >
            <Collapse defaultActiveKey={['1', '2', '3']}
                      onChange={() => {

                      }}
            >
                <Panel header="基础信息" key="1">
                    <Row>
                        <Col span={10}>
                            <Form.Item
                                label="报表名称"
                                name="name"
                                labelCol={{span: 8}}
                                wrapperCol={{span: 14}}
                            >
                                <Input disabled={onlyView}/>
                            </Form.Item>
                        </Col>
                        <Col span={10} push={1}>
                            <Form.Item
                                label="所属模块"
                                name="moduleName"
                                labelCol={{span: 8}}
                                wrapperCol={{span: 14}}
                            >
                                <Input disabled={onlyView}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={20}>
                            <Form.Item
                                label="描述"
                                name="description"
                                labelCol={{span: 4}}
                                wrapperCol={{span: 20}}
                            >
                                <Input.TextArea
                                    row={4}
                                    disabled={onlyView}
                                    allowClear
                                    showCount
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                </Panel>
                <Panel header="SQL维护" key="2">
                    <Form.Item
                        name="reportSql"
                        rules={[
                            {
                                required: true,
                                message: '请输入SQL配置',
                            },
                        ]}
                    >
                        <Input.TextArea
                            row={7}
                            size={"small"}
                            disabled={onlyView}/>
                    </Form.Item>
                </Panel>
                <Panel header="显示字段配置" key="3">

                    <Table
                        columns={columns}
                        dataSource={showFieldData}
                        footer={() => {
                            return <Button icon={<PlusCircleOutlined/>}
                                           disabled={onlyView}
                                           onClick={() => {
                                               const newData = showFieldData
                                               newData.push(EMPTY_ITEM)
                                               setShowFieldData([...newData])
                                           }}
                                           style={{
                                               width: '100%'
                                           }}/>
                        }}
                        pagination={false}
                    />
                </Panel>
                <Panel header="传参字段配置" key="4">
                    <p>xxxxxxxxxxxxv</p>
                </Panel>
            </Collapse>
        </Form>
    </>
}



