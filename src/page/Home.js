import React, {useEffect, useState} from "react";

import {Layout, Menu} from 'antd';
import {UserOutlined, LaptopOutlined, NotificationOutlined} from '@ant-design/icons';
import {getHeaderMenu} from "../service/commonService";

const {Header, Content, Sider} = Layout;

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

    useEffect(() => {
        // 获取顶部菜单
        getHeaderMenu().then(res => {
            const {data} = res
            setHeaderMenu(data)
        })
    }, [])


    return (
        <>
            <Layout>
                {/*头部菜单*/}
                <Header>
                    {/*先获取头部菜单，才能知道默认高亮的key是多少*/}
                    {headerMenu
                        && <Menu items={headerMenu}
                                 theme="dark"
                                 mode="horizontal"
                                 defaultSelectedKeys={[headerMenu[0].key]}/>}
                </Header>
                {/*头部菜单 over ==============================*/}


                <Layout>
                    {/*侧边栏菜单*/}
                    <Sider width={200} className="site-layout-background">
                        <Menu mode="inline"
                              defaultSelectedKeys={['1']}
                              defaultOpenKeys={['sub1']}
                              style={{
                                  height: '100%',
                                  borderRight: 0,
                              }}
                              items={items2}
                        />
                    </Sider>


                    <Layout style={{
                        padding: '0 24px 24px',
                    }}
                    >
                        <Content style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                        >
                            Content
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </>
    );
}






