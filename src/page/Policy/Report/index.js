import {Input, Table, Tree, Space} from 'antd';
import React, {useEffect, useState} from 'react';
import {getFreeReport} from "../../../service/freeReportService";

const {Search} = Input;

export default function Report() {

    useEffect(() => {
        getFreeReport("1").then(res => {
            const {data} = res.data
            const {viewColumns,viewData} = data
            console.log("getFreeReport res data：", data)
            // 设置展示字段列
            setViewColumns(viewColumns)
            setViewData(viewData)
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

    const [viewColumns, setViewColumns] = useState([])

    const [viewData, setViewData] = useState([
        {
            key: '1',
            name: 'John Brown',
            label: 32,
            module_id: 'New York No. 1 Lake Park',
        },
        {
            key: '2',
            name: 'Jim Green',
            label: 42,
            module_id: 'London No. 1 Lake Park',
        },
        {
            key: '3',
            name: 'Joe Black',
            label: 32,
            module_id: 'Sidney No. 1 Lake Park',
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


