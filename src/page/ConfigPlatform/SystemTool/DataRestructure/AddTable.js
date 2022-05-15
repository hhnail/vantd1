import {
    Button,
    Checkbox,
    Col,
    ConfigProvider,
    Form,
    Input,
    InputNumber,
    message,
    Modal,
    PageHeader,
    Row,
    Space,
    Steps,
    Table
} from "antd";
import {useState} from "react";
import {useForm} from "antd/es/form/Form";
import {useNavigate} from "react-router-dom";
import CurdButtonGroup from "../../../../component/CurdButtonGroup";
import PublicIcon, {IconType} from "../../../../component/PublicIcon";

const {Step} = Steps;
const {TextArea} = Input;


export default function AddTable() {

    // ========================== 创建表 ==========================
    // form表单
    const [addTableForm] = useForm()
    const [addFieldForm] = useForm()
    // 创建表步骤条
    const [addTableCurrentStep, setAddTableCurrentStep] = useState(0)
    const [addFieldModalVisible, setAddFieldModalVisible] = useState(false)

    const navigate = useNavigate()
    // 多选框当前选中的key
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const onSelectChange = selectedRowKeys => {
        setSelectedRowKeys(selectedRowKeys)
    };


    const fieldColumns = [
        {
            title: '名',
            dataIndex: 'name',
        },
        {
            title: '类型',
            dataIndex: 'type',
        },
        {
            title: '长度',
            dataIndex: 'length',
        },
        {
            title: '精度',
            dataIndex: 'accuracy',
        },
        {
            title: '非null',
            dataIndex: 'nullable',
        },
        {
            title: '虚拟',
            dataIndex: 'virtual',
        },
        {
            title: '主键',
            dataIndex: 'tableKey',
        },
        {
            title: '注释',
            dataIndex: 'remark',
        },
        // {
        //     title: '操作',
        //     key: 'operation',
        //     fixed: 'right',
        //     width: 100,
        //     render: () => <a>action</a>,
        // },
    ];

    const [fields, setFields] = useState([{
        name: 'id',
        type: 'int',
        tableKey: 'primary key',
        remark: '唯一编码',
    }])


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
                <CurdButtonGroup
                    addClick={() => {
                        addFieldForm.resetFields()
                        setAddFieldModalVisible(true)
                        // message.success("addClick！")
                    }}
                    editClick={() => {
                        console.log("selectedRowKeys", selectedRowKeys)
                        if (selectedRowKeys.length != 1) {
                            message.info("请选择一条数据")
                            return
                        }
                    }}
                    deleteClick={() => {
                        if (selectedRowKeys.length < 1) {
                            message.info("请选择一条数据")
                            return
                        }
                        Modal.confirm({
                            title: "您确认要删除吗？",
                            okText: '确定',
                            cancelText: '取消',
                            onOk: () => {
                                // console.log('selectedRowKeys',selectedRowKeys)
                                // console.log('fields',fields)
                                const newData = fields.filter(item => {
                                    return selectedRowKeys.indexOf(item.name) < 0
                                })
                                // console.log('newData', newData)
                                setFields(newData)
                            }
                        })
                    }}
                />
            ]}
        />
        <div style={{
            padding: '0px 20px 0px 20px'
        }}>
            <div style={{
                padding: '0px 200px 0px 200px'
            }}>
                <Steps current={addTableCurrentStep}>
                    <Step title="表基本信息"/>
                    <Step title="字段维护"/>
                    <Step title="数据录入"/>
                </Steps>
            </div>
            <div style={{
                padding: '20px 0px 0px 0px',
                // position:'absolute',
            }}>
                <div>
                    <Form
                        name="addTableForm"
                        form={addTableForm}
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 14,
                            push: 1,
                        }}
                        autoComplete="off"
                    >
                        {/* =============== Step1 =============== */}
                        {/* 简单表单 */}
                        <div style={{display: addTableCurrentStep == 0 ? "" : "none"}}>
                            <Form.Item
                                label="表类型"
                                name="name"
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
                                <Input.Search enterButton={
                                    <PublicIcon
                                        type={IconType.TRANSLATE}
                                                iconSize={25}
                                                style={{
                                        colon:'white'
                                    }}/>
                                }
                                />
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
                            <ConfigProvider renderEmpty={() => {
                                return <div style={{
                                    textAlign: 'center',
                                    padding: 30
                                }}>
                                    <PublicIcon type={IconType.NO_DATA}/>
                                    <p>请根据右上角按钮组编辑字段</p>
                                </div>
                            }}>
                                <Table
                                    dataSource={fields}
                                    columns={fieldColumns}
                                    rowKey={'name'}
                                    pagination={{
                                        // style: {
                                        //     position:'absolute',
                                        //     bottom:0,
                                        //     right:45,
                                        // }
                                        size: 5,
                                    }}
                                    rowSelection={{
                                        selectedRowKeys,
                                        onChange: onSelectChange,
                                    }}
                                />
                            </ConfigProvider>
                        </div>

                        {/* =============== Step3 =============== */}
                        {/* 可编辑表格 */}
                    </Form>
                </div>


                {/* =============== 按钮组 =============== */}
                <div style={{
                    position: 'absolute',
                    bottom: 35,
                    right: 45,
                }}>
                    <Space>
                        <Button
                            onClick={() => {
                                setAddTableCurrentStep(addTableCurrentStep - 1)
                            }}
                            style={{
                                display: addTableCurrentStep > 0 ? "" : "none",
                                width: 74,
                            }}
                        >上一步</Button>
                        <Button
                            type={"primary"}
                            onClick={() => {
                                setAddTableCurrentStep(addTableCurrentStep + 1)
                                // setAddFieldModalVisible(true)
                            }}
                            style={{
                                display: addTableCurrentStep < 2 ? "" : "none",
                                width: 74,
                            }}
                        >下一步</Button>
                        <Button
                            type={"primary"}
                            onClick={() => addModalOk()}
                            style={{
                                display: addTableCurrentStep == 2 ? "" : "none",
                                width: 74,
                            }}
                        >保存</Button>
                    </Space>
                </div>

            </div>
        </div>

        <Modal
            visible={addFieldModalVisible}
            width={760}
            cancelText={"取消"}
            okText={"确定"}
            onOk={() => {
                addFieldForm.validateFields().then(value => {
                    const newField = {
                        ...value
                    }
                    console.log("newFil:", newField)
                    setFields([...fields, newField])
                }).finally(() => {
                    setAddFieldModalVisible(false)
                })

            }}
            onCancel={() => {
                setAddFieldModalVisible(false)
            }}
        >
            <Form
                form={addFieldForm}
                name="fieldConfig"
                layout={"horizontal"}
                labelCol={{span: 4}}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    margin: "30px 10px 0px 10px"
                }}
            >
                <Row>
                    <Col span={12}>
                        <Form.Item
                            labelCol={{span: 4}}
                            wrapperCol={{
                                span: 16,
                            }}
                            label={"名"}
                            name={'name'}>
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            labelCol={{span: 4}}
                            wrapperCol={{
                                span: 16,
                            }}
                            label={"类型"}
                            name={'type'}>
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            label={"长度"}
                            name={'length'}>
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label={"精度"}
                            name={'accuracy'}>
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <Form.Item
                            labelCol={{span: 6, push: 1}}
                            wrapperCol={{push: 1}}
                            label={"非null"}
                            name={'nullable'}>
                            <Checkbox/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label={"虚拟"}
                            name={'virtual'}>
                            <Checkbox/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label={"主键"}
                            name={'tableKey'}>
                            <Checkbox/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            labelCol={{span: 2}}
                            wrapperCol={{span: 22}}
                            label={"注释"}
                            name={'remark'}>
                            <Input.TextArea
                                showCount={true}
                                maxLength={100}
                                style={{
                                    height: 120,
                                }}/>
                        </Form.Item>
                    </Col>
                </Row>

            </Form>
        </Modal>
    </>
}