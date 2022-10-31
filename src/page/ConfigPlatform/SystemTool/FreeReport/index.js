import {Input, message, Modal, Popover, Table, Tree} from 'antd';
import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {getFreeReportList, deleteFreeReportById} from "../../../../service/freeReportService";
import {SYSTEM_MESSAGE} from "../../../../enums/message";
import CurdButtonGroup from "../../../../component/CurdButtonGroup";

const {Search} = Input;

export default function FreeReport() {

    useEffect(() => {
        refreshTableData()
    }, [])

    const refreshTableData = () => {
        getFreeReportList().then(res => {
            const {data} = res.data
            // console.log("v1 data:",data)
            setListData(data)
            setTableLoading(false)
        })
    }

    const [treeData, setTreeData] = useState([
        {
            key: "1",
            title: "研发部",
            children: [
                {
                    key: "2",
                    title: "研发一部",
                    children: null,
                },
            ]
        },
        {
            key: "3",
            title: "营销部",
            children: null,
        },
    ])
    const [listData, setListData] = useState([])
    const [tableLoading, setTableLoading] = useState(false)
    const navigate = useNavigate()

    const listColumns = [
        {
            title: '编码',
            dataIndex: 'id',
            key: 'id',
            render: (value, item, index) => {
                return <Popover content="点击查看详情">
                    <a onClick={() => {
                        navigate(`/configPlatform/systemTool/freeReport/${value}`);
                    }}>{value}</a>
                </Popover>
            }
        },
        {
            title: '名称',
            dataIndex: 'reportName',
            key: 'reportName',
        },
        {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: '操作',
            key: 'action',
            render: (_, item, index) => {
                return <CurdButtonGroup
                    btnsSize={"small"}
                    btnsVisible={[false, true, true, false, false]}
                    deleteClick={() => {
                        Modal.confirm({
                            title: SYSTEM_MESSAGE.COMFIRM_DELETE,
                            onOk: () => {
                                setTableLoading(true)
                                deleteFreeReportById(item.id).then(_ => {
                                    message.success(SYSTEM_MESSAGE.SUCCESS)
                                }).catch(_ => {
                                    message.error(SYSTEM_MESSAGE.ERROR)
                                }).finally(_ => {
                                    refreshTableData()
                                })
                            }
                        })

                    }}
                    editClick={() => {
                        message.info("还没写！！")
                    }}
                />
            }
        },

    ];


    return <>
        <div style={{
            display: "flex",
            flexDirection: "row",
        }}>
            {/*左侧面板——树*/}
            <div style={{
                width: "20%",
            }}>
                <Search
                    style={{
                        marginBottom: 8,
                    }}
                    placeholder="Search"
                />
                <Tree
                    treeData={treeData}
                />
            </div>


            {/*右侧面板——表格*/}
            <div style={{
                width: "80%",
                padding: "10px 10px 10px 10px",
                border: "1px solid blue",
            }}>
                <CurdButtonGroup
                    btnsVisible={[true]}
                    addClick={()=>{
                        navigate(`/configPlatform/systemTool/freeReport/-1`);
                    }}
                />
                <Table
                    loading={tableLoading}
                    size={"small"}
                    columns={listColumns}
                    dataSource={listData}
                />
            </div>
        </div>
    </>
}
