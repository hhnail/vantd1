import {Button} from "antd";
import {useEffect, useState} from "react";
import {Space} from "antd";

/**
 * 按钮组大小 枚举
 */
export const BUTTON_SIZE = {
    SMALL: {
        value: "small",
    },
    MIDDLE: {
        value: "middle",
    },
    LARGE: {
        value: "large",
    },

}

/**
 * 插件类型
 */
export const V_BUTTON_PLUGIN_TYPE = {
    CUD: [true, true, true, false, false],
    CUD_RF: [true, true, true, false, true],
    ONLY_SAVE: [false, false, false, true, false],
    ONLY_REFRESH: [false, false, false, false, true],
    ONLY_DELETE: [false, false, true, false, false],
}

const defaultState = {
    btnsVisible: [true, true, true, true, true],
    btnsSize: BUTTON_SIZE.MIDDLE.value
}


/**
 * 增删改查 按钮组（新增、编辑、删除、保存、刷新）
 */
export default function CurdButtonGroup(
    {
        /**
         * 插件类型：PLUGIN_TYPE
         */
        pluginType,
        /**
         * 含义：按钮是否可见
         * 类型：布尔项数组
         * eg:[true,true,true]
         */
        btnsVisible,
        btnsSize,
        addClick,
        saveClick,
        editClick,
        refreshClick,
        deleteClick,
    }) {

    useEffect(() => {
        console.log("CurdButtonGroup loaded!")
    }, [])

    const getBtnDisplay = () => {
        // console.log("pluginType", pluginType)
        // console.log("pluginType size:", pluginType.length)
        if (pluginType && pluginType.length > 0) {
            // console.log(pluginType)
            return pluginType
        }

        if (btnsVisible) {
            return btnsVisible
        } else {
            return defaultState.btnsVisible
        }
    }

    const buttonConfig = [
        {
            type: "primary",
            size: btnsSize || defaultState.btnsSize,
            clickCallBack: () => addClick(),
            text: "新增"
        },
        {
            type: "primary",
            size: btnsSize || defaultState.btnsSize,
            clickCallBack: () => editClick(),
            text: "编辑"
        },
        {
            type: "danger",
            size: btnsSize || defaultState.btnsSize,
            clickCallBack: () => deleteClick(),
            text: "删除"
        },
        {
            type: "primary",
            size: btnsSize || defaultState.btnsSize,
            clickCallBack: () => saveClick(),
            text: "保存"
        },
        {
            type: "primary",
            size: btnsSize || defaultState.btnsSize,
            clickCallBack: () => refreshClick(),
            text: "刷新"
        },
    ]

    const renderButtons = () => {
        const buttons = []
        buttonConfig.forEach((item, index) => {
            if (getBtnDisplay()[index]) {
                buttons.push(
                    <Button
                        type={item.type}
                        size={item.size}
                        onClick={() => item.clickCallBack()}
                        style={{width: 74,}} // 为了避免刷新的loading效果越界
                    >{item.text}</Button>
                )
            }
        })
        return buttons
    }

    return <>
        <Space>
            {/*<Button*/}
            {/*    type={"primary"}*/}
            {/*    size={btnsSize || defaultState.btnsSize}*/}
            {/*    onClick={() => saveClick()}*/}
            {/*    style={{*/}
            {/*        display: getBtnDisplay()[3] ? "" : "none",*/}
            {/*        width: 74,*/}
            {/*    }}*/}
            {/*>保存</Button>*/}
            {renderButtons()}
        </Space>
    </>
}