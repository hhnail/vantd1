import React, {useEffect, useState} from "react";

import {Layout, Menu} from 'antd';
import {AppstoreOutlined, MailOutlined, SettingOutlined} from '@ant-design/icons';
import {getHeaderMenu, getSidebar} from "../service/commonService";
import ConfigPlatform from "./ConfigPlatform";
import {Route, Routes, useNavigate} from "react-router-dom";

const {Header} = Layout;

function getItem(label, key, icon, children, type) {
    return {
        key, icon, children, label, type,
    };
}

const items = [getItem('Navigation One', 'sub1',
    <MailOutlined/>, [getItem('Item 1', null, null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'), getItem('Item 2', null, null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),]), getItem('Navigation Two', 'sub2',
    <AppstoreOutlined/>, [getItem('Option 5', '5'), getItem('Option 6', '6'), getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),]), getItem('Navigation Three', 'sub4',
    <SettingOutlined/>, [getItem('Option 9', '9'), getItem('Option 10', '10'), getItem('Option 11', '11'), getItem('Option 12', '12'),]),];

console.log(items)


export default function Home() {

    const [headerMenu, setHeaderMenu] = useState()
    const [sidebar, setSidebar] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        // 获取顶部菜单
        getHeaderMenu().then(res => {
            const {data} = res
            setHeaderMenu(data)
        })
        // 获取侧边栏
        getSidebar().then(res => {
            const {data} = res
            console.log("sidebar",data)
            setSidebar(data)
        })
    }, [])


    return (<div>
            {/* ============================== home header ============================== */}
            <Header style={{
                size: 18, fontWeight: 800,
            }}>
                {/*先获取头部菜单，才能知道默认高亮的key是多少*/}
                {headerMenu && <Menu items={headerMenu}
                                     theme="dark"
                                     mode="horizontal"
                                     defaultSelectedKeys={[headerMenu[0].key]}
                                     onClick={(_, key) => {
                                         navigate('/configPlatform')
                                     }}
                />}
            </Header>
            {/* ============================== over home header ============================== */}

            {/* ============================== home body ============================== */}
            <div style={{
                display: 'flex', flexDirection: 'row',
            }}>
                {/* ======= sidebar =======*/}
                <div style={{
                    width: '13%',
                }}>
                    <Menu mode="vertical"
                          items={sidebar}
                    />
                </div>
                {/* ======= over sidebar =======*/}
                <div style={{
                    overflow: 'hidden', width: '87%', height: '100%', padding: '10px 0px 10px 0px'
                }}>
                    <Routes>
                        <Route exact path="/" element={<>login......</>}/>
                        <Route exact path="/configPlatform" element={<ConfigPlatform/>}/>
                    </Routes>
                </div>
            </div>
            {/* ============================== over home body ============================== */}
        </div>);
}




