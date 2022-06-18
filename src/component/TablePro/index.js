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
    scrollX: 1300,
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
        scrollX,
    }
) {


    return (<>
        {/*分割线*/}
        {/*<Divider />*/}
        <div style={{
            width: '100%',
            marginLeft: '80%',
            paddingBottom: 5,
        }}>
            <CurdButtonGroup
                btnsVisible={[true, false, true]}
                btnsSize={btnsSize || defaultState.btnsSize}
            />
        </div>
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
            scroll={{
                x: scrollX || defaultState.scrollX,
                y: 500,
            }}
        />

    </>)
}

