import {Collapse, Form, Input, Space, Button, Row, Col, message} from 'antd';
import React, {useEffect, useState} from 'react';
import CurdButtonGroup from "../../../../component/CurdButtonGroup";
import {useForm} from "antd/es/form/Form";

const {Panel} = Collapse;

/**
 * 自由报表
 */
export default function FreeReport() {

    useEffect(() => {
        reportForm.setFieldsValue({
            name: "商品反馈报表",
            moduleName: "自由报表",
            description: "搜集调研的商品的使用反馈，用户评论等",
            reportSql: "select id,name,label,module_id from sys_table where 1=1",
        })
    }, [])


    const [reportForm] = useForm()
    const [onlyView, setOnlyView] = useState(true)
    const [reportData, setReportData] = useState()


    return <>
        <Space>
            <CurdButtonGroup
                btnsSize={"small"}
                editClick={() => {
                    setOnlyView(false)
                }}
                saveClick={() => {
                    if (onlyView) {
                        message.info("请勿重复保存！")
                        return
                    }
                    setOnlyView(true)
                    message.success("操作成功！")
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
                        <Col span={8}>
                            <Form.Item
                                label="报表名称"
                                name="name"
                                labelCol={{span: 8}}
                                wrapperCol={{span: 16}}
                            >
                                <Input disabled={onlyView}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="所属模块"
                                name="moduleName"
                                labelCol={{span: 8}}
                                wrapperCol={{span: 16}}
                            >
                                <Input disabled={onlyView}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={16}>
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
                    <p>xxxxxxxxxxxxv</p>
                </Panel>
                <Panel header="传参字段配置" key="4">
                    <p>xxxxxxxxxxxxv</p>
                </Panel>
            </Collapse>
        </Form>
    </>
}







