import React, {useEffect, useState} from "react";

import {Layout, Menu} from 'antd';
import {AppstoreOutlined, MailOutlined, SettingOutlined} from '@ant-design/icons';
import {getHeaderMenu, getSidebar} from "../service/commonService";
import ConfigPlatform from "./ConfigPlatform";
import {Route, Routes, useNavigate} from "react-router-dom";
import ModuleMaintenance from "./ConfigPlatform/ModuleMaintenance";
import DataRestructure from "./ConfigPlatform/DataRestructure";
import StaffDesktop from "./StaffDesktop";
import HumanResource from "./HumanResource";

const {Header} = Layout;

function getItem(label, key, icon, children, type) {
    return {
        key, icon, children, label, type,
    };
}

export default function Home() {

    const [headerMenu, setHeaderMenu] = useState()
    const [currentHeader, setCurrentHeader] = useState()

    const [sidebar, setSidebar] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        // 获取顶部菜单
        getHeaderMenu().then(res => {
            const {data} = res
            console.log("header", data)
            setHeaderMenu(data, () => {
                refreshSideBar(-1)
            })
        })
    }, [])


    useEffect(() => {
        // 初始化路由及侧边栏
        let routeAddress = '/configPlatform/moduleMaintenance'
        let moduleId = -1;
        if (headerMenu && headerMenu.length > 0) {
            moduleId = headerMenu[0].pid
        }
        // currentHeader非空说明已经选中某个菜单了
        // 按照选中菜单切换路由、获取侧边栏即可
        if (currentHeader != null) {
            routeAddress = currentHeader.url
            moduleId = currentHeader.key
        }
        refreshSideBar(moduleId)
        // 切换路由
        navigate(routeAddress)
    }, [currentHeader])


    /**
     * 根据模块编码，重新获取侧边栏
     */
    const refreshSideBar = (moduleId) => {
        if (moduleId < 0) {
            return
        }
        // 获取侧边栏
        getSidebar(moduleId).then(res => {
            const {data} = res
            console.log("sidebar", data)
            setSidebar(data)
        })
    }


    return (<div>
        {/* ============================== home header ============================== */}
        <Header style={{
            size: 18, fontWeight: 800,
        }}>
            {/*先获取头部菜单，才能知道默认高亮的key是多少*/}
            {headerMenu && <Menu items={headerMenu} theme="dark" mode="horizontal"
                // 默认选择首个菜单
                                 defaultSelectedKeys={[headerMenu[0].key]}
                                 onClick={(item) => {
                                     headerMenu.forEach(menu => {
                                         if (menu.key == item.key) {
                                             setCurrentHeader(menu)
                                             return;
                                         }
                                     })
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
                    <Route exact path="/" element={<a>login please......</a>}/>
                    {/*===== 员工桌面 =====*/}
                    <Route exact path="/staffDesktop" element={<StaffDesktop/>}/>

                    {/*===== 人力资本 =====*/}
                    <Route exact path="/humanResource" element={<HumanResource/>}/>


                    {/*===== 配置平台 =====*/}
                    <Route exact path="/configPlatform" element={<ConfigPlatform/>}/>
                    <Route exact path="/configPlatform/moduleMaintenance" element={<ModuleMaintenance/>}/>
                    <Route exact path="/configPlatform/dataRestructure" element={<DataRestructure/>}/>
                </Routes>
            </div>
        </div>
        {/* ============================== over home body ============================== */}
    </div>);
}




