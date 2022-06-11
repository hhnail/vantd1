import {Button, Col, Form, Input, InputNumber, message, Modal, Row, Space, Steps, Table, Tree} from 'antd';
import {useEffect, useState} from "react";
import {getTableGroup, getTables} from "../../../../service/commonService";
import {useForm} from "antd/es/form/Form";
import {useNavigate} from "react-router-dom";
import {updateTable} from "../../../../service/tableService";


const {Step} = Steps;
const {DirectoryTree} = Tree;

/**
 * 数据重构
 */
export default function DataRestructure() {

    // 数据——表
    const [dataSource, setDataSource] = useState([])
    // 数据——表分组树
    const [tableGroup, setTableGroup] = useState()
    // 刷新按钮loading效果
    const [btnFlushLoading, setBtnFlushLoading] = useState(false)
    // 当前选中的key【多选框】
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    // 当前选中的项，仅可编辑单项
    const [selectedRowItem, setSelectedRowItem] = useState()

    // 编辑模态框是否可见
    const [editModalVisible, setEditModalVisible] = useState(false)

    const [editModalForm] = useForm();


    const navigate = useNavigate()


    // 表格字段
    const columns = [
        // {
        //     title: '编号',
        //     dataIndex: 'id',
        //     key: 'id',
        // },
        {
            title: '中文名称',
            dataIndex: 'label',
            key: 'label',
        },
        {
            title: '英文名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '排序号',
            dataIndex: 'orderId',
            key: 'orderId',
        },

    ];


    /**
     * 刷新表分组和表数据
     * @param isShowActionMsg 是否通过手动刷新按钮触发。若是，则刷新后需要关闭按钮刷新特效
     * @param cleanSelected 是否需要去掉之前勾选的项。默认否
     */
    const refreshTableAndGroup = (isShowActionMsg, cleanSelected) => {
        // 1、先查询表分组
        getTableGroup().then(res => {
            const {data} = res.data
            // console.log("sys table group", data)
            setTableGroup(data)

            // 2、再查询分组下的表
            getTables().then(res => {
                const {data} = res
                // console.log("sys tables", data)
                setDataSource(data)
                if (isShowActionMsg) {
                    setBtnFlushLoading(false)
                    message.success("操作成功")
                }
                if (cleanSelected) {
                    setSelectedRowKeys([])
                }
            })
        })
    }

    // 获取表格
    useEffect(() => {
        refreshTableAndGroup()
    }, [])


    const onSelectChange = selectedRowKeys => {
        // console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(selectedRowKeys)
    };

    const btnAdd = () => {
        // console.log('btn add!')
        // setAddModalVisible(true)
        navigate("/configPlatform/systemTool/dataRestructure/addTable")

    }

    // [编辑按钮]点击事件
    const btnEdit = () => {
        // 校验选中的是否是单项
        // console.log('btn edit!')
        if (selectedRowKeys.length != 1) {
            message.info("请选择单条数据")
            return
        }

        // console.log("beforeEdit", dataSource)
        // console.log("selectedRowKeys", selectedRowKeys)
        dataSource.forEach(item => {
            // 设置当前编辑的项
            if (item.id == selectedRowKeys[0]) {
                setSelectedRowItem(item);

                setEditModalVisible(true);

                // console.log("item", item)

                // 表单回显
                editModalForm.setFieldsValue({
                    name: item.name,
                    label: item.label,
                    orderId: item.orderId,
                })

                // 跳出当前foreach。提高效率
                return
            }

            // console.log("check foreach中的return未弹出全部栈")
        })


    }

    const btnDelete = () => {
        console.log('btn delete!')
        if (selectedRowKeys.length < 1) {
            message.info("请选择数据")
        }
    }


    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            padding: "10px 10px 0px 10px",
        }}>
            <Row>
                <div style={{
                    width: '20%',
                    paddingRight: 5,
                    borderRight: 'thick double',
                    borderColor: "#78a3b6",
                }}>
                    <DirectoryTree
                        treeData={tableGroup}
                        multiple
                        defaultExpandAll

                    />
                </div>

                <div style={{
                    width: '80%',
                    padding: "0px 0px 0px 5px"
                }}>
                    <Row
                        style={{
                            padding: "0px 0px 10px 0px",
                        }}>
                        <Col span={14}>
                            <Space>
                                <Button type={"primary"} size={"small"}>字段维护</Button>
                                <Button type={"primary"} size={"small"}>字段关联</Button>
                                <Button type={"primary"} size={"small"}>校验规则</Button>
                            </Space>
                        </Col>
                        <Col push={5}>
                            <Space>
                                <Button type={"primary"} size={"small"} onClick={() => btnAdd()}>新增</Button>
                                <Button type={"primary"} size={"small"} onClick={() => btnEdit()}>编辑</Button>
                                {/*<Button danger size={"small"} onClick={() => btnDelete()}>删除</Button>*/}
                                <Button type={"primary"} size={"small"}
                                        loading={btnFlushLoading}
                                        onClick={() => {
                                            setBtnFlushLoading(true)
                                            refreshTableAndGroup(true)
                                        }}
                                        style={{
                                            width: '70px'
                                        }}
                                >刷新</Button>
                            </Space>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Table dataSource={dataSource}
                                   columns={columns}
                                // 表格行唯一标识，用于判断选中等操作（默认为key）
                                   rowKey={"id"}
                                   rowSelection={{
                                       selectedRowKeys,
                                       onChange: onSelectChange,
                                   }}/>
                        </Col>
                    </Row>
                </div>
            </Row>


            <Modal
                title="editModal"
                visible={editModalVisible}
                onOk={() => {
                    editModalForm.validateFields().then(value => {
                            console.log("value", value)
                            const data = {
                                id: selectedRowKeys[0],
                                ...value,
                            }
                            console.log("data ", data)
                            updateTable(data).then(res => {
                                console.log("v1 res", res)
                                refreshTableAndGroup(true, true)
                            })

                        }
                    )
                    setEditModalVisible(false)
                }}
                okText={"确认"}
                onCancel={() => {

                    setEditModalVisible(false)
                }}
                cancelText={"取消"}
            >
                <Form
                    form={editModalForm}
                    name="editModalForm"
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 18,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                >
                    <Form.Item
                        label="所属模块"
                        name="moduleId"
                        // initialValue={["人员模块"]}
                    >
                        <Input disabled defaultValue={"人员模块"}/>
                    </Form.Item>

                    <Form.Item
                        label="表英文名"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="表中文名"
                        name="label"
                        // rules={[
                        //     {
                        //         required: true,
                        //         message: 'Please input your password!',
                        //     },
                        // ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="排序号"
                        name="orderId"
                    >
                        <InputNumber/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}





