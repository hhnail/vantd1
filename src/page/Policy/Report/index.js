import {Input, Table, Tree, Space} from 'antd';
import React, {useEffect, useState} from 'react';
import {getFreeReport} from "../../../service/freeReportService";

const {Search} = Input;

export default function Report() {

    useEffect(() => {
        getFreeReport("1").then(res => {
            console.log("getFreeReport res：", res)
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

    const [viewColumns, setViewColumns] = useState([
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '地址',
            dataIndex: 'address',
            key: 'address',
        },
    ])

    const [viewData, setViewData] = useState([
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
    ])


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
                    columns={viewColumns}
                    dataSource={viewData}
                />
            </div>
        </div>
    </>
}


