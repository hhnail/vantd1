import {Tabs} from 'antd';
import {useEffect} from "react";
import {getCodeTable} from "../../../../service/tableService";


const {TabPane} = Tabs;

/**
 * <Tabs>组件tab位置 枚举
 */
export const TABS_POSITION = {
    TOP: {
        value: "top"
    },
    BOTTOM: {
        value: "bottom"
    },
    LEFT: {
        value: "left"
    },
    RIGHT: {
        value: "right"
    },
}


/**
 * 单级码表
 *
 *
 */
export default function SingleCode() {

    useEffect(() => {
        getCodeTable("SINGLE_CODE")
            .then(res => {
                const {data} = res.data
                console.log("getCodeTable data: ", data)
            })
    }, [])


    return <>
        <Tabs tabPosition={TABS_POSITION.LEFT.value}>
            <TabPane tab="Tab 1" key="1">
                Content of Tab 1
            </TabPane>
            <TabPane tab="Tab 2" key="2">
                Content of Tab 2
            </TabPane>
            <TabPane tab="Tab 3" key="3">
                Content of Tab 3
            </TabPane>
        </Tabs>
    </>
}
