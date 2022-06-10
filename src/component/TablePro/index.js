import {Table} from 'antd';
import React from 'react';
import CurdButtonGroup from "../CurdButtonGroup";

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
                type: rowSelectionType || "checkbox",
            }}
            columns={columns}
            dataSource={dataSource}
            pagination={{
                pageSize: pageSize || 5,
            }}
        />

    </>)
}

