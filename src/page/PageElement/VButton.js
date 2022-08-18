import {Button} from "antd";
import {MESSAGE} from "../../enums/message";

/**
 * 按钮类型
 */
const BUTTON_TYPE = {
    ADD: {
        code: 'add',
        name: '新增',
    },
    EDIT: {
        code: 'edit',
        name: '编辑',
    },
    DELETE: {
        code: 'delete',
        name: '删除',
    },
}

/**
 * 按钮组件二次封装
 */
export function VButton(
    {
        type,
        name,
    }
) {

    /**
     * 按钮名称
     */
    const renderButtonName = () => {
        let btnName = ""
        switch (type) {
            case BUTTON_TYPE.ADD.code:
                btnName = BUTTON_TYPE.ADD.name
                break
            case BUTTON_TYPE.EDIT.code:
                btnName = BUTTON_TYPE.EDIT.name
                break
            case BUTTON_TYPE.DELETE.code:
                btnName = BUTTON_TYPE.DELETE.name
                break
            default:
                return MESSAGE.ERROR_BTN_NAME
        }
        return btnName
    }

    return <Button type={"primary"}>
        {name || renderButtonName()}
    </Button>
}