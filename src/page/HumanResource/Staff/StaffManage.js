import {message, Table} from 'antd';
import React, {useEffect, useState} from "react";
import {getStaffList} from "../../../service/staffService";
import CurdButtonGroup from "../../../component/CurdButtonGroup";
import {SYSTEM_MESSAGE} from "../../../enums/message";

export default function StaffManage() {

    const refreshData = () => {
        getStaffList().then((res) => {
            const {data} = res.data
            console.log("getStaffList data:", data)
            setStaffList(data.dataSource)
            message.success(SYSTEM_MESSAGE.SUCCESS)
        })
    }

    useEffect(() => {
        refreshData()
    }, [])

    const [staffList, setStaffList] = useState([])

    const columns = [
        {
            "title": '姓名',
            "dataIndex": 'name',
            "key": 'name',
        },
        {
            "title": '工号',
            "dataIndex": 'job_no',
            "key": 'job_no',
        },
        {
            "title": '生日',
            "dataIndex": 'birthday',
            "key": 'birthday',
        },
    ];


    return <>
        <div>
            <CurdButtonGroup
                btnsSize={"small"}
                refreshClick={() => {
                    refreshData()
                }}
            />
            <Table
                size={"small"}
                columns={columns}
                dataSource={staffList}
            />
        </div>

    </>
}

