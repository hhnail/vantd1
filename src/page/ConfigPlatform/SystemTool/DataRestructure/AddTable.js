import {Button, ConfigProvider, Form, Input, InputNumber, message, Modal, PageHeader, Space, Steps, Table} from "antd";
import {useState} from "react";
import {useForm} from "antd/es/form/Form";
import {useNavigate} from "react-router-dom";
import CurdButtonGroup from "../../../../component/CurdButtonGroup";
import PublicIcon from "../../../../component/PublicIcon";

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

    const fields = [];


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
                        message.success("addClick！")
                    }}
                    editClick={() => {
                        message.success("editClick！")
                    }}
                    deleteClick={() => {
                        message.success("deleteClick！")
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
                            <ConfigProvider renderEmpty={() => {
                                return <div style={{
                                    textAlign: 'center',
                                    padding: 30
                                }}>
                                    <PublicIcon type={"nodata"}></PublicIcon>
                                    <p>请根据右上角按钮组编辑字段</p>
                                </div>
                            }}>
                                <Table
                                    dataSource={fields}
                                    columns={fieldColumns}
                                    pagination={{
                                        // style: {
                                        //     position:'absolute',
                                        //     bottom:0,
                                        //     right:45,
                                        // }
                                        size: 5,
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