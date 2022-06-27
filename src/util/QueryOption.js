export class QueryOption {

    constructor(primaryTable) {
        this._queryOption = {
            // 查询的主表
            primaryTable: primaryTable,
            // 模块编号
            moduleId: -1,
            // 条件列表
            conditions: [],
            // 是否分页
            paged: false,
            // 分页——每页大小
            pageSize: 1000,
            // 分页——当前页索引
            pageIndex: 0,
            // 排序字段
            orderBy: [],
            //
            limit: 1000,
        };
    }

    /**
     * 设置主表
     */
    setPrimaryTable(primaryTable) {
        this._queryOption.primaryTable = primaryTable;
        return this._queryOption
    }

    /**
     * 添加查询条件
     */
    addCondition(column, values, compareMethod) {
        this._queryOption.conditions.push(
            {
                column: column,
                values: values,
                compareMethod: compareMethod
            }
        )

        return this._queryOption
    }

    /**
     *
     */
    getOption() {
        return this._queryOption
    }


}