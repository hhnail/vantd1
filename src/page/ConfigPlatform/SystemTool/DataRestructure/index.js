import {Tree} from 'antd';

import {Table, Switch, Space} from 'antd';
import {useEffect, useState} from "react";
import {getTables} from "../../../../service/commonService";


const {DirectoryTree} = Tree;

export default function DataRestructure() {

    const [dataSource, setDataSource] = useState()

    const columns = [
        {
            title: '编号',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        },
    ];

    useEffect(() => {
        getTables().then(res => {
            const {data} = res
            console.log(data)
            setDataSource(data)
        })
    }, [])

    const treeData = [
        {
            title: 'parent 0',
            key: '0-0',
            children: [
                {
                    title: 'leaf 0-0',
                    key: '0-0-0',
                    isLeaf: true,
                },
                {
                    title: 'leaf 0-1',
                    key: '0-0-1',
                    isLeaf: true,
                },
            ],
        },
        {
            title: 'parent 1',
            key: '0-1',
            children: [
                {
                    title: 'leaf 1-0',
                    key: '0-1-0',
                    isLeaf: true,
                },
                {
                    title: 'leaf 1-1',
                    key: '0-1-1',
                    isLeaf: true,
                },
            ],
        },
    ];


    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
        }}>
            <div style={{
                width: '20%',
            }}>
                <DirectoryTree
                    treeData={treeData}
                    multiple
                    defaultExpandAll

                />
            </div>
            <div style={{
                width: '80%',
            }}>
                <Table dataSource={dataSource}
                       columns={columns}
                />
            </div>
        </div>
    )
}

