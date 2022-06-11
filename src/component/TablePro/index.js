import {Table} from 'antd';
import React from 'react';
import CurdButtonGroup from "../CurdButtonGroup";


const defaultState = {
    rowSelectionType: "checkbox",
    pageSize: 5,
}

/**
 * 表格增强组件
 *
 */
export default function TablePro(
    {
        rowSelectionType,
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
        />
        <Table
            rowSelection={{
                // radio checkbox
                type: rowSelectionType || defaultState.rowSelectionType,
            }}
            columns={columns}
            dataSource={dataSource}
            pagination={{
                pageSize: pageSize || defaultState.pageSize,
            }}
        />

    </>)
}

