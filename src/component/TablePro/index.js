import {useEffect, useState} from "react";
import {Col, Row, Table} from 'antd';
import React from 'react';
import CurdButtonGroup, {BUTTON_SIZE} from "../CurdButtonGroup";


/**
 * 枚举 表格多选按钮类型
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

/**
 * 枚举 表格间距大小
 */
export const GAP_SIZE_TYPE = {
    // 小
    SMALL: {
        value: "small",
    },
    // 中
    MIDDLE: {
        value: "middle",
    },
    // 大
    LARGE: {
        value: "large",
    }
}

// 默认属性
const defaultState = {
    rowSelectionType: ROW_SELECTION_TYPE.CHECKBOX,
    pageSize: 5,
    btnsSize: BUTTON_SIZE.SMALL.value,
    scrollX: 1300,
    gapSize: GAP_SIZE_TYPE.MIDDLE.value,
}

/**
 * 表格增强组件
 */
export default function TablePro(
    {
        // 行选择器样式
        rowSelectionType,
        // 按钮组尺寸大小
        btnsSize,
        // 分页数量
        pageSize,
        columns,
        dataSource,
        // 横向滚动宽度
        scrollX,
        // 主键字段
        rowKey,
        // 表格间距大小
        gapSize,
        // 按钮操作事件
        // 新增
        addClick,
        // 编辑
        editClick,
        // 删除
        deleteClick,

    }
) {


    // 当前选中的key【多选框】
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    // 当前选中的项，仅可编辑单项
    const [selectedRowItem, setSelectedRowItem] = useState()

    const onSelectChange = selectedRowKeys => {
        // console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(selectedRowKeys)
        dataSource.forEach(item => {
            // 设置当前操作的项
            if (item.id == selectedRowKeys) {
                setSelectedRowItem(item);
                // 跳出当前foreach。提高效率
                return
            }

            // console.log("check foreach中的return未弹出全部栈")
        })
    };


    return (<>
        {/*分割线*/}
        {/*<Divider />*/}
        {/*<div style={{*/}
        {/*    width: '100%',*/}
        {/*    marginLeft: '80%',*/}
        {/*    paddingBottom: 5,*/}
        {/*}}>*/}
        <Row>
            <Col push={18}>
                <CurdButtonGroup
                    btnsVisible={[true, true, true]}
                    btnsSize={btnsSize.value || defaultState.btnsSize}
                    addClick={() => addClick && addClick()}
                    editClick={() => editClick && editClick()}
                    deleteClick={() => deleteClick && deleteClick()}
                />
            </Col>
        </Row>
        {/*</div>*/}
        <div style={{
            padding: "10px 0px 10px 0px"
        }}>
            <Table
                size={gapSize.value || defaultState.gapSize}
                rowSelection={{
                    type: rowSelectionType.value || defaultState.rowSelectionType.value,
                    selectedRowKeys,
                    onChange: onSelectChange,
                }}
                columns={columns}
                dataSource={dataSource}
                pagination={{
                    pageSize: pageSize || defaultState.pageSize,
                }}
                scroll={{
                    x: scrollX || defaultState.scrollX,
                    y: 200,
                }}
                rowKey={rowKey || "id"}
                style={{
                    padding: '0px 0px 0px 5px',
                }}
            />
        </div>
    </>)
}

