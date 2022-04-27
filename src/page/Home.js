import React, {useEffect, useState} from "react";

import {Layout, Menu} from 'antd';
import {LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons';
import {getHeaderMenu} from "../service/commonService";
import ConfigPlatform from "./ConfigPlatform";
import {HashRouter, Route, Routes, useNavigate} from "react-router-dom";

const {Header} = Layout;

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined]
    .map((icon, index) => {
        const key = String(index + 1);
        return {
            key: `sub${key}`,
            icon: React.createElement(icon),
            label: `subnav ${key}`,
            children: new Array(4).fill(null).map((_, j) => {
                const subKey = index * 4 + j + 1;
                return {
                    key: subKey,
                    label: `option${subKey}`,
                };
            }),
        };
    });

export default function Home() {

    const [headerMenu, setHeaderMenu] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        // 获取顶部菜单
        getHeaderMenu().then(res => {
            const {data} = res
            setHeaderMenu(data)
        })
    }, [])


    return (
        <div>
            {/* home header */}
            <Header style={{
                size: 18,
                fontWeight: 800,
            }}>
                {/*先获取头部菜单，才能知道默认高亮的key是多少*/}
                {headerMenu
                    && <Menu items={headerMenu}
                             theme="dark"
                             mode="horizontal"
                             defaultSelectedKeys={[headerMenu[0].key]}
                             onClick={() => {
                                 console.log("click!")
                                 navigate("/configPlatform")
                             }}
                    />}
            </Header>


            {/* home body */}
            <div style={{
                display: 'flex',
                flexDirection: 'row',
            }}>
                {/*侧边栏菜单*/}
                <div style={{
                    width: '15%',
                }}>
                    <Menu mode="inline"
                          defaultSelectedKeys={['1']}
                          defaultOpenKeys={['sub1']}
                          style={{
                              overflowX: 'hidden',
                          }}
                          items={items2}
                    />
                </div>

                <div style={{
                    overflow: 'hidden',
                    width: '85%',
                    height: '100%',
                    padding: '10px 0px 10px 0px'
                }}>
                    <Routes>
                        <Route exact path="/" element={<>login......</>}/>
                        <Route exact path="/configPlatform" element={<ConfigPlatform/>}/>
                    </Routes>
                    {/*<ConfigPlatform/>*/}
                </div>
            </div>
        </div>
    );
}






