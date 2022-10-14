import {Space, Table, Tag} from 'antd';
import styles from './index.less'
import {useState} from "react";
import TreePro from "../../../component/TreePro";
import CurdButtonGroup from "../../../component/CurdButtonGroup";

export default function FormConfig() {

    const [formData, setFormData] = useState([
        {
            key: '1',
            name: 'John Brown',
            age: 32,
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
        },
    ])

    const columns = [
        {
            title: '表单名称',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: '表单描述',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '所属部门',
            dataIndex: 'address',
            key: 'address',
        },
    ];


    return <>
        <div className={styles.container} style={{display: "flex",}}>
            <div className={styles.rightPanel} style={{width: '20%'}}>
                <TreePro/>
            </div>

            <div className={styles.leftPanel}
                 style={{
                     width: '80%',
                     border: '1px solid rgba(63, 115, 196, 1)',
                     padding: '10px 10px 10px 10px',
                     margin: '5px 5px 5px 5px',
                 }}>
                <CurdButtonGroup/>
                <Table
                    size={"small"}
                    columns={columns}
                    dataSource={formData}/>
            </div>
        </div>

    </>
}

