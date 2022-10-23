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

const defaultState = {
    btnsVisible: [true, true, true],
    btnsSize: BUTTON_SIZE.MIDDLE.value
}


/**
 * 增删改查 按钮组（新增、编辑、删除）
 */
export default function CurdButtonGroup(
    {
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

    // console.log(defaultState.btnsVisible)

    // 按钮组可见性
    // const [btnsVisible, setBtnsVisible] = useState(btnsVisible || defaultState.btnsVisible)

    useEffect(() => {
        // setVvBtnsVisible()
        // console.log("props:", props)
    }, [])

    const getBtnDisplay = () => {
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
            type: "primary",
            size: btnsSize || defaultState.btnsSize,
            clickCallBack: () => deleteClick(),
            text: "删除"
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
            buttons.push(
                <Button
                    type={item.type}
                    size={item.size}
                    onClick={() => item.clickCallBack()}
                    style={{
                        display: getBtnDisplay()[index] ? "" : "none",
                        width: 74,
                    }}
                >{item.text}</Button>
            )
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