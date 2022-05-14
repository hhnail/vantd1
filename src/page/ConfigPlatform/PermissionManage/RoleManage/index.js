import {Button, Checkbox, Form, Input, InputNumber, Row, Select, Space, Tabs, Tree} from 'antd';
import {useEffect, useState} from "react";
import {getRoleGroup} from "../../../../service/commonService";
import {useNavigate} from "react-router-dom";

const {TabPane} = Tabs;
const {DirectoryTree} = Tree;
const {Search} = Input;
const {Option} = Select;
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
                    height: 510,
                    paddingRight: 5,
                    borderRight: 'thick double',
                    borderColor: "#78a3b6",
                }}>
                    <Search placeholder="请输入角色名称" onSearch={() => {

                    }} enterButton={true}
                            style={{
                                padding: '0px 0px 10px 0px',
                            }}/>

                    <DirectoryTree
                        treeData={roleGroup}
                        multiple
                        defaultExpandAll
                    />
                </div>

                <div style={{
                    width: '80%',
                    padding: "0px 0px 0px 15px"
                }}>
                    <div
                        style={{
                            padding: "0px 0px 10px 0px",
                        }}>
                        <Tabs defaultActiveKey="1" onChange={() => {
                        }}>
                            <TabPane tab="属性" key="1">
                                <Form
                                    labelCol={{span: 3}}
                                    wrapperCol={{span: 18}}
                                    name="nest-messages">
                                    <Form.Item
                                        name={'roleName'}
                                        label="角色名称"
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <Input/>
                                    </Form.Item>
                                    <Form.Item
                                        name={'roleIntroduction'}
                                        label="角色描述">
                                        <Input.TextArea/>
                                    </Form.Item>
                                    <Form.Item
                                        name={'belongRoleGroup'}
                                        label="所属角色组"
                                    >
                                        <Select defaultOpen style={{ width: 120 }}>
                                            <Option value="组1">组1</Option>
                                            <Option value="组2">组2</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        name={'isRoleGroup'}
                                        label="是否角色组"
                                    >
                                        <Checkbox></Checkbox>
                                    </Form.Item>
                                    <Form.Item
                                        name={'sameWithRoleGroup'}
                                        label="与组权保持一致">
                                        <Checkbox></Checkbox>
                                    </Form.Item>
                                </Form>
                            </TabPane>
                            <TabPane tab="功能权限" key="2">
                                Content of Tab Pane 2
                            </TabPane>
                            <TabPane tab="人员权限" key="3">
                                Content of Tab Pane 3
                            </TabPane>
                            <TabPane tab="报表权限" key="4">
                                Content of Tab Pane 3
                            </TabPane>
                            <TabPane tab="桌面权限" key="5">
                                Content of Tab Pane 3
                            </TabPane>
                            <TabPane tab="角色人员" key="6">
                                Content of Tab Pane 3
                            </TabPane>
                            <TabPane tab="角色权限管理" key="7">
                                Content of Tab Pane 3
                            </TabPane>
                            <TabPane tab="考勤管理" key="8">
                                Content of Tab Pane 3
                            </TabPane>

                        </Tabs>
                    </div>

                    <div style={{
                        position: 'absolute',
                        bottom: 15,
                        right: 30,
                    }}>
                        <Space>
                            <Button>新增</Button>
                            <Button>编辑</Button>
                            <Button>删除</Button>
                            <Button type={"primary"}>复制角色</Button>
                            <Button type={"primary"}>复制配置</Button>
                        </Space>
                    </div>
                </div>
            </Row>
        </div>
    </>
}






