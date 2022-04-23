import {Table, Switch, Space} from 'antd';
import {useEffect, useState} from "react";
import {getModuleInfo} from "../../../service/commonService";

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
];


export default function ModuleMaintenance() {


    const [data, setData] = useState([]);

    useEffect(() => {
        getModuleInfo().then(res => {
            const {data} = res
            console.log(data)
            setData(data)
        })
    }, [])


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
        </div>
    )
}

