import {Tabs} from 'antd';




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
