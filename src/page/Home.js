import React, {useEffect, useState} from "react";

import {Button, Dropdown, Menu} from 'antd';
import {getHeaderMenu, getSidebar} from "../service/commonService";
import ConfigPlatform from "./ConfigPlatform";
import {Route, Routes, useNavigate} from "react-router-dom";
import ModuleMaintenance from "./ConfigPlatform/SystemTool/ModuleMaintenance";
import DataRestructure from "./ConfigPlatform/SystemTool/DataRestructure";
import StaffDesktop from "./StaffDesktop";
import HumanResource from "./HumanResource";
import MyMessage from "./StaffDesktop/MyMessage";
import MyTodo from "./StaffDesktop/MyTodo";
import SystemTool from "./ConfigPlatform/SystemTool";
import OnlineLearn from "./OnlineLearn";
import SingleCode from "./ConfigPlatform/DataDictionary/SingleCode";
import MultilevelCode from "./ConfigPlatform/DataDictionary/MultilevelCode";
import AddTable from "./ConfigPlatform/SystemTool/DataRestructure/AddTable";
import RoleManage from "./ConfigPlatform/PermissionManage/RoleManage";
import Success from "./Success";
import Login from "./Login";
import FormConfig from "./ConfigPlatform/FormConfig";
import FreeReport from "./ConfigPlatform/SystemTool/FreeReport";
import FreeForm from "./ConfigPlatform/SystemTool/FreeForm";
import Policy from "./Policy";
import Report from "./Policy/Report";
import FreeReportDetail from "./Policy/Report/ReportDetail";
import ReportDetail from "./Policy/Report/ReportDetail";

export default function Home() {

    // 顶部菜单及当前选中的菜单
    const [headerMenu, setHeaderMenu] = useState()
    const [currentHeader, setCurrentHeader] = useState()
    // 侧边栏及当前选中的侧边栏
    const [sidebar, setSidebar] = useState()
    const [currentSidebar, setCurrentSidebar] = useState()

    // 路由跳转
    const navigate = useNavigate()

    useEffect(() => {
        // if(!localStorage.getItem("userLogin")){
        //     navigate("/hhh")
        // }
        // 获取顶部菜单
        getHeaderMenu().then(res => {
            const {data} = res
            // console.log("header", data)
            setHeaderMenu(data)
            if (data && data.length > 0) {
                setCurrentHeader(data[0])
            }
        })
    }, [])


    useEffect(() => {
        // 初始化路由及侧边栏
        let routeAddress = '/'
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


    useEffect(() => {
        if (currentSidebar) {
            console.log("currentSidebar:", currentSidebar)
            navigate(currentSidebar.url)
        }
    }, [currentSidebar])


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
            // console.log("sidebar", data)
            setSidebar(data)
        })
    }

    /**
     * 顶部菜单点击事件
     */
    const headerClick = (item) => {
        headerMenu.forEach(menu => {
            if (menu.key == item.key) {
                setCurrentHeader(menu)
                return;
            }
        })
    }

    /**
     * 侧边栏点击事件
     */
    const sidebarClick = (item) => {
        // console.log("sidebar item", item)
        // setCurrentSidebar()
        mapRoute(sidebar, item.key)
    }

    /**
     * 匹配路由
     */
    const mapRoute = (routeList, targetKey) => {
        // 当为数组
        if (routeList.length > 0) {
            routeList.forEach((item) => {
                // console.log(item)
                if (item.key == targetKey) {
                    setCurrentSidebar(item)
                    // console.log("map success!",item)
                    return
                } else {
                    if (item.children) {
                        mapRoute(item.children, targetKey)
                    }
                }
            })
        }
    }

    return (<div>
        {/* ============================== home header ============================== */}
        <div style={{
            height: '69px',
            width: '100%',
            size: 22,
            fontWeight: 1200,
            // display: 'flex',
            // flexDirection: 'column',
        }}>
            {/*先获取头部菜单，才能知道默认高亮的key是多少*/}
            {headerMenu
                &&
                <Menu items={headerMenu}
                      theme="dark"
                      mode="horizontal"
                      style={{
                          padding: '1px 1px 1px 1px',
                          height: 55,
                      }}
                    // 默认选择首个菜单
                      defaultSelectedKeys={[headerMenu[0].key]}
                      onClick={(item) => headerClick(item)}
                />}
        </div>
        <div style={{
            position: 'relative',
            margin: '-55px 0px 0px 0px',
            width: '100%',
            height: 50,
            left: '95%',
        }}>
            <Dropdown overlay={
                <Menu
                    items={[
                        {
                            key: '1',
                            label: (
                                <a target="_self">
                                    设置临时密码
                                </a>
                            ),
                        },
                        {
                            key: '2',
                            label: (
                                <a target="_self" onClick={() => {
                                    localStorage.removeItem("userLogin")
                                    navigate("/")
                                }}>退出系统</a>
                            ),
                        },
                    ]}
                />} placement="bottomRight">
                <Button shape={"circle"}>操作</Button>
            </Dropdown>
        </div>
        {/* ============================== over home header ============================== */}

        {/* ============================== home body ============================== */}
        <div style={{
            display: 'flex',
            flexDirection: 'row',
        }}>
            {/* ======= sidebar =======*/}
            <div style={{
                width: '9%',
            }}>
                <Menu mode="vertical"
                      items={sidebar}
                      onClick={(item) => sidebarClick(item)}
                />
            </div>
            {/* ======= over sidebar =======*/}
            <div style={{
                overflowX: 'hidden',
                // overflowY: 'auto',
                width: '89%',
                // height:400,
                padding: '10px 10px 10px 10px'
            }}>
                {/* TODO 动态路由 */}
                <Routes>
                    {/*===== 员工桌面 =====*/}
                    {/*<Route exact path="/staffDesktop" element={<StaffDesktop/>}/>*/}
                    <Route exact path="/staffDesktop" element={<FreeReport/>}/>
                    <Route exact path="/staffDesktop/myMessage" element={<MyMessage/>}/>
                    <Route exact path="/staffDesktop/myTodo" element={<MyTodo/>}/>



                    {/*===== 在线学习 =====*/}
                    <Route exact path="/onlineLearn" element={<OnlineLearn/>}/>



                    {/*===== 人力资本 =====*/}
                    <Route exact path="/humanResource" element={<HumanResource/>}/>




                    {/*===== 配置平台 =====*/}
                    <Route exact path="/configPlatform" element={<ConfigPlatform/>}/>
                    {/*2系统工具*/}
                    <Route exact path="/configPlatform/systemTool" element={<SystemTool/>}/>
                    <Route exact path="/configPlatform/systemTool/freeForm" element={<FreeForm/>}/>
                    <Route exact path="/configPlatform/systemTool/freeReport" element={<FreeReport/>}/>
                    <Route exact path="/configPlatform/systemTool/moduleMaintenance" element={<ModuleMaintenance/>}/>
                    <Route exact path="/configPlatform/systemTool/dataRestructure" element={<DataRestructure/>}/>
                    <Route exact path="/configPlatform/systemTool/dataRestructure/addTable" element={<AddTable/>}/>
                    <Route exact path="/configPlatform/permissionManage/role" element={<RoleManage/>}/>
                    {/*2数据字典*/}
                    <Route exact path="/configPlatform/dataDictionary" element={<>数据字典</>}/>
                    <Route exact path="/configPlatform/dataDictionary/singleCode" element={<SingleCode/>}/>
                    <Route exact path="/configPlatform/dataDictionary/multilevelCode" element={<MultilevelCode/>}/>
                    <Route exact path="/configPlatform/formConfig" element={<FormConfig/>}/>




                    {/*===== 决策平台 =====*/}
                    <Route exact path="/policy" element={<Policy/>}/>
                    <Route exact path="/policy/report/:id" element={<ReportDetail/>}/>
                    <Route exact path="/policy/report" element={<Report/>}/>


                    <Route path="/" element={<StaffDesktop/>}/>
                </Routes>
            </div>
        </div>
        {/* ============================== over home body ============================== */}
    </div>);
}


