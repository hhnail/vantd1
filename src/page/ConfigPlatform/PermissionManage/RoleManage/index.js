import {Button, Col, message, Row, Space, Steps, Table, Tree} from 'antd';
import {useEffect, useState} from "react";
import {getRoleGroup, getTableGroup, getTables} from "../../../../service/commonService";
import {useNavigate} from "react-router-dom";

const {DirectoryTree} = Tree;

/**
 * 角色管理
 */
export default function RoleManage() {

    // 数据——表分组树
    const [roleGroup, setRoleGroup] = useState()

    const navigate = useNavigate()

    const refreshData = () => {
        getRoleGroup().then(res => {
            const {data} = res.data
            setRoleGroup(data)
        })
    }

    // 获取表格
    useEffect(() => {
        refreshData()
    }, [])


    return <>
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
                        treeData={roleGroup}
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
                            </Space>
                        </Col>
                        <Col push={3}>
                            <Space>
                                <Button type={"primary"} size={"small"}>新增</Button>
                            </Space>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>

                        </Col>
                    </Row>
                </div>
            </Row>
        </div>
    </>
}



