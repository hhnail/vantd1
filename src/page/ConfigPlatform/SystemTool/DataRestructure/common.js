import {FIELD_TYPE_LIST} from "../../../../enums/fieldType";
import {Select} from "antd";


const {Option} = Select;

export const renderFieldOptions = () => {
    const options = []
    FIELD_TYPE_LIST.forEach(item => {
        options.push(<Option value={item.value}>{item.value}</Option>)
    })
    // console.log(options)
    return <Select style={{width: 120}}
                   defaultValue={FIELD_TYPE_LIST[0].value}
        // onChange={(value)=>{
        //
        // }}
    >
        {options}
    </Select>
}