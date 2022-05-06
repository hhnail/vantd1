import {Button, Col, Form, Input, InputNumber, message, Modal, Space, Steps, Table, Tree} from "antd";
import {useState} from "react";
import {useForm} from "antd/es/form/Form";
import {PageHeader} from 'antd';
import {useHistory, useNavigate} from "react-router-dom";

const {Step} = Steps;


export default function AddTable() {

    // ========================== 创建表 ==========================
    // form表单
    const [addTableForm] = useForm()
    // 创建表步骤条
    const [addTableCurrentStep, setAddTableCurrentStep] = useState(0)
    const [addFieldModalVisible, setAddFieldModalVisible] = useState(false)

    const navigate = useNavigate()


    const fieldColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            filters: [
                {
                    text: 'Joe',
                    value: 'Joe',
                },
                {
                    text: 'Jim',
                    value: 'Jim',
                },
                {
                    text: 'Submenu',
                    value: 'Submenu',
                    children: [
                        {
                            text: 'Green',
                            value: 'Green',
                        },
                        {
                            text: 'Black',
                            value: 'Black',
                        },
                    ],
                },
            ],
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['descend'],
        },
        {
            title: 'Age',
            dataIndex: 'age',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            filters: [
                {
                    text: 'London',
                    value: 'London',
                },
                {
                    text: 'New York',
                    value: 'New York',
                },
            ],
            onFilter: (value, record) => record.address.indexOf(value) === 0,
        },
    ];

    const fields = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        },
        {
            key: '4',
            name: 'Jim Red',
            age: 32,
            address: 'London No. 2 Lake Park',
        },
    ];


    /**
     * 确认添加表——回调
     */
    const addModalOk = () => {
        addTableForm.validateFields().then(value => {
            console.log('addModalOk', value)
            message.success("操作成功")
        })
    }


    return <>
        <PageHeader
            onBack={() => {
                // 返回上一页
                navigate(-1)
            }}
            title="返回"
            extra={[
                <Button
                    size={"small"}
                    onClick={() => {
                        setAddTableCurrentStep(addTableCurrentStep - 1)
                    }}
                    style={{
                        display: addTableCurrentStep > 0 ? "" : "none",
                        width: 74,
                    }}
                >上一步</Button>,
                <Button
                    size={"small"}
                    type={"primary"}
                    onClick={() => {
                        setAddTableCurrentStep(addTableCurrentStep + 1)
                        // setAddFieldModalVisible(true)
                    }}
                    style={{
                        display: addTableCurrentStep < 2 ? "" : "none",
                        width: 74,
                    }}
                >下一步</Button>,
                <Button
                    size={"small"}
                    type={"primary"}
                    onClick={() => addModalOk()}
                    style={{
                        display: addTableCurrentStep == 2 ? "" : "none",
                        width: 74,
                    }}
                >保存</Button>,
            ]}
        />
        <div style={{
            padding: '0px 20px 0px 20px'
        }}>
            <div style={{
                padding: '0px 0px 0px 0px'
            }}>
                <Steps current={addTableCurrentStep}>
                    <Step title="表基本信息"/>
                    <Step title="字段维护"/>
                    <Step title="数据录入"/>
                </Steps>
            </div>
            <div style={{
                padding: '20px 0px 0px 0px'
            }}>
                <Col span={24}>
                    <Form
                        name="addTableForm"
                        form={addTableForm}
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        autoComplete="off"
                    >
                        {/* =============== Step1 =============== */}
                        {/* 简单表单 */}
                        <div style={{display: addTableCurrentStep == 0 ? "" : "none"}}>
                            <Form.Item
                                label="表类型"
                                name="name"
                                // rules={[
                                //     {
                                //         required: true,
                                //         message: '请输入表名称',
                                //     },
                                // ]}
                            >
                                <Input disabled={true}/>
                            </Form.Item>

                            <Form.Item
                                label="中文名称"
                                name="name"
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                label="英文名称"
                                name="name"
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                label="排序号"
                                name="orderId"
                            >
                                <InputNumber/>
                            </Form.Item>
                        </div>


                        {/* =============== Step2 =============== */}
                        {/* 可编辑表格 */}
                        <div style={{display: addTableCurrentStep == 1 ? "" : "none"}}>
                            <Table
                                dataSource={fields}
                                columns={fieldColumns}/>
                        </div>


                        {/* =============== Step3 =============== */}
                        {/* 可编辑表格 */}
                    </Form>
                </Col>
            </div>
        </div>

        <Modal
            visible={addFieldModalVisible}
            onCancel={() => {
                setAddFieldModalVisible(false)
            }}
        >
            <Form>
                <Form.Item>

                </Form.Item>
            </Form>
        </Modal>
    </>
}