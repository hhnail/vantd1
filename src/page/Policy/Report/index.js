import {Input, message, Popover, Table, Tree} from 'antd';
import React, {useEffect, useState} from 'react';
import {getFreeReportList} from "../../../service/freeReportService";
import {useNavigate} from "react-router-dom";
import CurdButtonGroup from "../../../component/CurdButtonGroup";

const {Search} = Input;

export default function Report() {

    useEffect(() => {
        getFreeReportList().then(res => {
            const {data} = res.data
            // console.log("v1 data:",data)
            setListData(data)
        })
    }, [])

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
    const navigate = useNavigate()

    const listColumns = [
        {
            title: '编码',
            dataIndex: 'id',
            key: 'id',
            render: (value, item, index) => {
                return <Popover content="点击查看详情">
                    <a onClick={() => {
                        navigate(`/policy/report/${value}`);
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
            render: () => {
                return <CurdButtonGroup
                    btnsSize={"small"}
                    btnsVisible={[false, true, true, false, false]}
                    deleteClick={() => {

                    }}
                    editClick={()=>{
                        message.info("编辑！")
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
                <Table
                    size={"small"}
                    columns={listColumns}
                    dataSource={listData}
                />
            </div>
        </div>
    </>
}
