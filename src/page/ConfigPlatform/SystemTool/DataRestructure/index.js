import {Button, Col, Form, Input, InputNumber, message, Modal, Row, Space, Steps, Table, Tree} from 'antd';
import {useEffect, useState} from "react";
import {getTableGroup, getTables} from "../../../../service/commonService";
import {useForm} from "antd/es/form/Form";
import {useNavigate} from "react-router-dom";


const {Step} = Steps;
const {DirectoryTree} = Tree;

/**
 * 数据重构
 */
export default function DataRestructure() {

    // 数据——表
    const [dataSource, setDataSource] = useState()
    // 数据——表分组树
    const [tableGroup, setTableGroup] = useState()
    // 刷新按钮loading效果
    const [btnFlushLoading, setBtnFlushLoading] = useState(false)
    // 多选框当前选中的key
    const [selectedRowKeys, setSelectedRowKeys] = useState([])


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
     * @param isByBtn 是否通过手动刷新按钮触发。若是，则刷新后需要关闭按钮刷新特效
     */
    const refreshTableAndGroup = (isByBtn) => {
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
                if (isByBtn) {
                    setBtnFlushLoading(false)
                    message.success("操作成功")
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

    const btnEdit = () => {
        console.log('btn edit!')
        if (selectedRowKeys.length != 1) {
            message.info("请选择单条数据")
        }
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
                        <Col push={3}>
                            <Space>
                                <Button type={"primary"} size={"small"} onClick={() => btnAdd()}>新增</Button>
                                <Button type={"primary"} size={"small"} onClick={() => btnEdit()}>编辑</Button>
                                <Button danger size={"small"} onClick={() => btnDelete()}>删除</Button>
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

        </div>
    )
}





