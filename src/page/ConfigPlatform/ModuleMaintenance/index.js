import {Button, Checkbox, Form, Input, message, Modal, Space, Table} from 'antd';
import React, {useEffect, useState} from "react";
import {addModule, deleteModule, getModule} from "../../../service/commonService";
import {useForm} from "antd/es/form/Form";
import {TREE_NODE_TYPE} from "../../../enums/treeNodeType";
import qs from 'qs'


export default function ModuleMaintenance() {


    // 模块信息
    const [data, setData] = useState([]);
    // 新增模态框
    const [addModalVisible, setAddModalVisible] = useState(false);
    // 当前操作的节点（方便拿pid、level等信息）
    const [currentItem, setCurrentItem] = useState(false);

    const [addModuleForm] = useForm()

    const refreshData = () => {
        // 获取模块信息
        getModule().then(res => {
            const {data} = res
            // console.log(data)
            setData(data)
        })
    }

    useEffect(() => {
        refreshData()
    }, [])

    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '路由地址',
            dataIndex: 'routingAddress',
            width: '30%',
            key: 'routingAddress',
        },
        {
            title: '操作',
            dataIndex: 'key',
            key: 'key',
            width: '30%',
            render: (key, item) => {
                return <>
                    <Space>
                        <Button size={"small"}
                                type={"primary"}
                                onClick={() => {
                                    console.log("=v1", item)
                                    setCurrentItem(item)
                                    setAddModalVisible(true)
                                }}
                        >
                            新增
                        </Button>
                        <Button size={"small"} type={"primary"}
                                onClick={() => {
                                    setCurrentItem(item)
                                }}
                        >
                            编辑
                        </Button>
                        <Button size={"small"} danger
                                onClick={() => {
                                    setCurrentItem(item)
                                    Modal.confirm({
                                        title: `您确认要删除[${item.name}]吗？`,
                                        okText: '确认',
                                        cancelText: '取消',
                                        onOk: () => {
                                            const data = qs.stringify({id: key})
                                            deleteModule(data)
                                                .then(() => {
                                                    message.success("操作成功")
                                                })
                                                .catch(() => {
                                                    message.error("操作失败")
                                                })
                                                .finally(() => {
                                                    refreshData()
                                                })
                                        }
                                    })
                                }}>
                            删除
                        </Button>
                    </Space>
                </>
            },
        },
    ];


    const addModalOk = () => {
        addModuleForm.validateFields()
            .then(res => {
                console.log(res)
                const {name, routingAddress} = res
                // 关闭模态框
                const data = {
                    // 要新增的节点的pid == 当前操作节点的id
                    pid: currentItem.key,
                    name: name,
                    routingAddress: routingAddress,
                    level: currentItem.level + 1,
                    type: TREE_NODE_TYPE.SIDEBAR.value,
                }
                addModule(data).then(res => {
                    message.success("操作成功")
                }).catch(err => {
                    message.error("操作失败")
                }).finally(() => {
                    setAddModalVisible(false)
                    refreshData()
                })
            })
            .catch(err => {
                console.log("=v3", err)
            })
    }


    return (
        <div style={{
            // display: 'flex',
            // flexDirection: 'row',
        }}>
            <div style={{
                // width: '80%',
            }}>
                <Table dataSource={data}
                       columns={columns}
                />
            </div>

            <Modal title="新增模块" visible={addModalVisible}
                   okText={"新增"}
                   cancelText={"取消"}
                   width={780}
                   onOk={addModalOk}
                   onCancel={() => {
                       setAddModalVisible(false)
                   }}>
                <Form name="addModalForm"
                      form={addModuleForm}
                      labelCol={{
                          span: 6,
                      }}
                      wrapperCol={{
                          span: 16,
                      }}
                      autoComplete="off"
                >
                    <Form.Item label="所属模块" name="parentName">
                        <Input disabled placeholder={currentItem.name}/>
                    </Form.Item>

                    <Form.Item label="模块名称" name="name" rules={[
                        {
                            required: true,
                            message: '请输入模块名称',
                        },
                    ]}
                    ><Input/></Form.Item>

                    <Form.Item label="路由地址" name="routingAddress" rules={[
                        {
                            required: true,
                            message: '请输入路由地址',
                        },
                    ]}
                    ><Input addonBefore={currentItem.routingAddress}/>

                    </Form.Item>
                </Form>
            </Modal>

        </div>
    )
}

