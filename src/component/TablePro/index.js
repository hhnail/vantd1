import {Table} from 'antd';
import React from 'react';
import CurdButtonGroup, {BUTTON_SIZE} from "../CurdButtonGroup";


/**
 * 表格多选按钮类型 枚举
 */
export const ROW_SELECTION_TYPE = {
    // 圆形
    RADIO: {
        value: "radio",
    },
    // 方形
    CHECKBOX: {
        value: "checkbox",
    }
}

const defaultState = {
    rowSelectionType: ROW_SELECTION_TYPE.CHECKBOX,
    pageSize: 5,
    btnsSize: BUTTON_SIZE.SMALL.value,
}

/**
 * 表格增强组件
 *
 */
export default function TablePro(
    {
        rowSelectionType,
        btnsSize,
        pageSize,
        columns,
        dataSource,
    }
) {


    return (<>
        {/*分割线*/}
        {/*<Divider />*/}
        <CurdButtonGroup
            btnsVisible={[true, false, true]}
            btnsSize={btnsSize || defaultState.btnsSize}
        />
        <Table
            rowSelection={{
                // radio checkbox
                type: rowSelectionType.value || defaultState.rowSelectionType.value,
            }}
            columns={columns}
            dataSource={dataSource}
            pagination={{
                pageSize: pageSize || defaultState.pageSize,
            }}
        />

    </>)
}

