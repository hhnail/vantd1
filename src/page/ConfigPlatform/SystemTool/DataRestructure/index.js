import {
    Button,
    Checkbox,
    Col,
    Form,
    Input,
    InputNumber,
    message,
    Modal,
    Row,
    Select,
    Space,
    Steps,
    Table,
    Tree
} from 'antd';
import {useEffect, useState} from "react";
import {getTableGroup, getTables} from "../../../../service/commonService";
import {useForm} from "antd/es/form/Form";
import {useNavigate} from "react-router-dom";
import {addField, getTableColumns, updateTable} from "../../../../service/tableService";
import TablePro, {GAP_SIZE_TYPE, ROW_SELECTION_TYPE} from "../../../../component/TablePro";
import {BUTTON_SIZE} from "../../../../component/CurdButtonGroup";
import {FIELD_TYPE_LIST} from "../../../../enums/fieldType";
import {renderFieldOptions} from "./common";


const {Option} = Select;
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

    // [编辑表信息]模态框是否可见
    const [editModalVisible, setEditModalVisible] = useState(false)
    // [字段维护]模态框是否可见
    const [columnMaintainModalVisible, setColumnMaintainModalVisible] = useState(false)
    // 字段新增、编辑 模态框 是否可见
    const [columnAddModalVisible, setColumnAddModalVisible] = useState(false)
    const [columnEditModalVisible, setColumnEditModalVisible] = useState(false)


    // 数据——字段
    const [tableColumnData, setTableColumnData] = useState([
        {
            name: '1',
            label: '140787',
        },
    ])

    // 编辑表 模态框表单
    const [addFieldForm] = useForm()
    const [editModalForm] = useForm();
    // 编辑字段 表单
    const [columnAddModalForm] = useForm();
    const [columnEditModalForm] = useForm();
    // 路由跳转
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
        dataSource.forEach(item => {
            // 设置当前操作的项
            if (item.id == selectedRowKeys) {
                setSelectedRowItem(item);
                // 跳出当前foreach。提高效率
                return
            }

            // console.log("check foreach中的return未弹出全部栈")
        })
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
        setEditModalVisible(true);

        // console.log("item", item)

        // 表单回显
        editModalForm.setFieldsValue({
            name: selectedRowItem.name,
            label: selectedRowItem.label,
            orderId: selectedRowItem.orderId,
        })

        // console.log("beforeEdit", dataSource)
        // console.log("selectedRowKeys", selectedRowKeys)
    }

    const btnDelete = () => {
        console.log('btn delete!')
        if (selectedRowKeys.length < 1) {
            message.info("请选择数据")
            return
        }
    }

    // 字段维护
    const btnColumnMaintain = () => {
        // console.log("selectedRowKeys.length:", selectedRowKeys.length)
        // console.log("selectedRowItem:", selectedRowItem)
        if (selectedRowKeys.length != 1 || selectedRowItem == null) {
            message.info("请选择单条数据")
            return
        }
        setColumnMaintainModalVisible(true)
        // console.log("==5 selectedRowItem.id", selectedRowItem.id)
        getTableColumns(selectedRowItem.id)
            .then(res => {
                const {data} = res.data
                // console.log("==5 getTableColumns res：", data)
                setTableColumnData(data)
            })

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
                                <Button type={"primary"} size={"small"}
                                        onClick={() => btnColumnMaintain()}>字段维护</Button>
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


            {/* ============ 修改表信息模态框 ============ */}
            <Modal
                title="editModal"
                visible={editModalVisible}
                onOk={() => {
                    editModalForm.validateFields().then(value => {
                            // console.log("value", value)
                            const data = {
                                id: selectedRowKeys[0],
                                oldName: selectedRowItem.name,
                                ...value,
                            }
                            // console.log("data ", data)
                            updateTable(data).then(res => {
                                // console.log("v1 res", res)
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


            {/*【字段维护】模态框*/}
            <Modal
                title="字段维护"
                visible={columnMaintainModalVisible}
                onOk={() => {
                    setColumnMaintainModalVisible(false)
                }}
                okText={"确认"}
                onCancel={() => {
                    setColumnMaintainModalVisible(false)
                }}
                cancelText={"取消"}
                width={998}
            >
                <TablePro
                    btnsSize={BUTTON_SIZE.SMALL}
                    gapSize={GAP_SIZE_TYPE.SMALL}
                    rowSelectionType={ROW_SELECTION_TYPE.CHECKBOX}
                    pageSize={4}
                    columns={
                        [
                            {
                                title: '字段名',
                                dataIndex: 'name',
                            },
                            {
                                title: '中文名',
                                dataIndex: 'label',
                            },
                            {
                                title: '类型',
                                dataIndex: 'type',
                                render: (value, item, index) => {
                                    return value
                                    /*
                                    switch (value) {
                                        case ICON_TYPE.STRING:
                                            return <>
                                                <PublicIcon
                                                    type={ICON_TYPE.STRING}
                                                    iconSize={20}
                                                />
                                                <div style={{
                                                    display:'inline-block',
                                                }}>string</div>
                                            </>
                                        case ICON_TYPE.VARCHAR:
                                            return <>
                                                <PublicIcon
                                                    type={ICON_TYPE.STRING}
                                                    iconSize={20}
                                                />
                                                <div style={{
                                                    display:'inline-block',
                                                }}>string</div>
                                            </>
                                        case ICON_TYPE.INT:
                                            return <>
                                                <PublicIcon
                                                    type={ICON_TYPE.INT}
                                                    iconSize={20}
                                                />
                                                <div style={{
                                                    display:'inline-block',
                                                }}>string</div>
                                            </>

                                        default:
                                            break
                                    }
                                    */
                                }
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
                                title: '非空',
                                dataIndex: 'nullable',
                                render: (value) => {
                                    return <Checkbox checked={value == 1} disabled/>
                                }
                            },
                            {
                                title: '可见',
                                dataIndex: 'visible',
                                render: (value) => {
                                    return <Checkbox checked={value == 1} disabled/>
                                }
                            },
                            {
                                title: '自增',
                                dataIndex: 'autoIncrement',
                                render: (value) => {
                                    return <Checkbox checked={value == 1} disabled/>
                                }
                            },
                            {
                                title: '默认值',
                                dataIndex: 'defaultValue',
                            },
                            {
                                title: '键',
                                dataIndex: 'tableKey',
                                render: (value) => {
                                    if (value) {
                                        return value == "PK" ? "主键" : "外键"
                                    }
                                    return value
                                }
                            },
                            {
                                title: '备注',
                                dataIndex: 'remark',
                            },
                        ]
                    }
                    dataSource={tableColumnData}
                    scrollX={1200}
                    addClick={() => {
                        setColumnAddModalVisible(true)
                    }}
                    editClick={() => {
                        setColumnEditModalVisible(true)
                    }}
                />
            </Modal>


            {/* ======= 字段新增模态框 ======= */}
            <Modal
                title="字段编辑"
                okText={"确认"}
                cancelText={"取消"}
                visible={columnAddModalVisible}
                width={890}
                onOk={() => {
                    columnAddModalForm.validateFields()
                        .then(values => {
                            const data = {
                                ...values,
                                sysTableId: selectedRowItem.id,
                            }
                            console.log(data)
                            addField(data).then(res => {
                                    console.log(res)
                                }
                            )
                        })
                    // setColumnAddModalVisible(false)
                    // message.success("操作成功！")
                }}
                onCancel={() => {
                    setColumnAddModalVisible(false)
                }}
            >
                <Form
                    form={columnAddModalForm}
                    name="columnEditModalForm"
                    layout={"horizontal"}
                    labelCol={{span: 4}}
                    wrapperCol={{span: 16,}}
                    style={{margin: "30px 10px 0px 10px"}}
                >
                    <Row>
                        <Col span={6}>
                            <Form.Item
                                labelCol={{span: 4}}
                                wrapperCol={{
                                    span: 16,
                                }}
                                rules={[
                                    {
                                        required: true,
                                        message: '字段名不得为空',
                                    },
                                ]}
                                label={"名"}
                                name={'name'}>
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                labelCol={{span: 5}}
                                wrapperCol={{span: 17,}}
                                label={"类型"}
                                name={'type'}>
                                {renderFieldOptions()}
                                {/*<Option value="Yiminghe">yiminghe</Option>*/}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label={"长度"}
                                name={'length'}>
                                <InputNumber/>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label={"精度"}
                                name={'accuracy'}>
                                <InputNumber/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <Form.Item
                                labelCol={{span: 6, push: 1}}
                                wrapperCol={{push: 2}}
                                label={"非null"}
                                name={'nullable'}
                                initialValue={1}
                            >
                                <Checkbox
                                    checked={false}
                                    onClick={() => {
                                        const oldValue = addFieldForm.getFieldValue("nullable")
                                        addFieldForm.setFieldsValue({nullable: (oldValue == 1) ? 0 : 1})
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                labelCol={{span: 6, push: 1}}
                                wrapperCol={{push: 2}}
                                label={"虚拟"}
                                name={'virtual'}>
                                <Checkbox/>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                labelCol={{span: 6, push: 1}}
                                wrapperCol={{push: 2}}
                                label={"主键"}
                                name={'tableKey'}>
                                <Checkbox/>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                labelCol={{span: 6, push: 1}}
                                wrapperCol={{push: 2}}
                                label={"自增"}
                                name={'autoIncrement'}>
                                <Checkbox/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <Form.Item
                                labelCol={{span: 6}}
                                wrapperCol={{span: 16,}}
                                label={"默认值"}
                                name={'autoIncrement'}>
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                // labelCol={{span: 2}}
                                // wrapperCol={{span: 22}}
                                label={"注释"}
                                name={'remark'}>
                                <Input.TextArea
                                    showCount={true}
                                    maxLength={100}
                                    style={{
                                        height: 40,
                                    }}/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>


            {/* ======= 字段编辑模态框 ======= */}
            <Modal
                title="字段编辑"
                okText={"确认"}
                cancelText={"取消"}
                visible={columnEditModalVisible}
                onOk={() => {
                    setColumnEditModalVisible(false)
                }}
                onCancel={() => {
                    setColumnEditModalVisible(false)
                }}
            >
                <Form
                    form={columnEditModalForm}
                    name="columnEditModalForm"
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
                </Form>
            </Modal>
        </div>
    )
}





