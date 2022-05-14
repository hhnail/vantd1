import Icon from "@ant-design/icons";

import {ReactComponent as HumanResouce} from "../../static/humanResource.svg";
import {ReactComponent as ViewIcon} from "../../static/noData.svg";

const defaultIconSize = 50

export default function PublicIcon({
                                       type,
                                       iconSize,
                                   }) {


    const render = () => {
        if ("noData" == type) {
            return <>
                <Icon component={ViewIcon}
                      style={{fontSize: iconSize || defaultIconSize}}
                />
            </>
        } else {
            return <>
                <Icon component={HumanResouce}
                      style={{fontSize: iconSize || defaultIconSize}}
                />
            </>
        }

    }
    return render()
}
