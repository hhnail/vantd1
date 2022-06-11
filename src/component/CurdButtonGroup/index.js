import {Button} from "antd";
import {useEffect, useState} from "react";
import {Space} from "antd";


const defaultState = {
    btnsVisible: [true, true, true]
}


/**
 * 增删改查 按钮组（新增、编辑、删除）
 *
 * {btnsVisible,addClick,editClick,deleteClick,} <==> const {btnsVisible,addClick,editClick,deleteClick,} = props
 */
export default function CurdButtonGroup(
    {
        /**
         * 含义：按钮是否可见
         * 类型：布尔项数组
         * eg:[true,true,true]
         */
        btnsVisible,
        addClick,
        editClick,
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

    return <>
        <Space>
            <Button
                type={"primary"}
                onClick={() => addClick()}
                style={{
                    display: getBtnDisplay()[0] ? "" : "none",
                    width: 74,
                }}
            >新增</Button>


            <Button
                type={"primary"}
                onClick={() => editClick()}
                style={{
                    display: getBtnDisplay()[1] ? "" : "none",
                    width: 74,
                }}
            >编辑</Button>


            <Button
                danger
                onClick={() => deleteClick()}
                style={{
                    display: getBtnDisplay()[2] ? "" : "none",
                    width: 74,
                }}
            >删除</Button>
        </Space>
    </>
}