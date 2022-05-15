import Icon from "@ant-design/icons";
import React from "react";

// TODO 需要优化写法 change1
import {ReactComponent as HumanResouce} from "../../static/humanResource.svg";
import {ReactComponent as NoData} from "../../static/noData.svg";
import {ReactComponent as ViewIcon} from "../../static/view.svg";
import {ReactComponent as CommitIcon} from "../../static/commit.svg";
import {ReactComponent as DeleteIcon} from "../../static/delete.svg";
import {ReactComponent as Interview} from "../../static/interview.svg";
import {ReactComponent as CalendarIcon} from "../../static/calendar.svg";
import {ReactComponent as ArrangeIcon} from "../../static/arrange.svg";
import {ReactComponent as RefuseIcon} from "../../static/refuse.svg";
import {ReactComponent as HomeIcon} from "../../static/home.svg";
import {ReactComponent as AccountManageIcon} from "../../static/account-manage.svg";
import {ReactComponent as ResumeIcon} from "../../static/resume.svg";
import {ReactComponent as RecruitmentIcon} from "../../static/recruitment.svg";
import {ReactComponent as PermissionIcon} from "../../static/permission.svg";
import {ReactComponent as ShareManageIcon} from "../../static/share.svg";
import {ReactComponent as ContacterIcon} from "../../static/contacter.svg";
import {ReactComponent as AddressIcon} from "../../static/address.svg";
import {ReactComponent as OtherIcon} from "../../static/other.svg";
import {ReactComponent as ClassIcon} from "../../static/class.svg";
import {ReactComponent as TagIcon} from "../../static/tag.svg";
import {ReactComponent as College} from "../../static/college.svg";
import {ReactComponent as Major} from "../../static/major.svg";
import {ReactComponent as Add} from "../../static/add.svg";
import {ReactComponent as Edit} from "../../static/edit.svg";
import {ReactComponent as Member} from "../../static/member.svg";
import {ReactComponent as Department} from "../../static/department.svg";
import {ReactComponent as Boy} from "../../static/boy.svg";
import {ReactComponent as Girl} from "../../static/girl.svg";
import {ReactComponent as Accept} from "../../static/accept.svg";
import {ReactComponent as Avatar} from "../../static/avatar.svg";
import {ReactComponent as Translate_Gray} from "../../static/translate_gray.svg";
import {ReactComponent as Translate_White} from "../../static/translate_white.svg";


const defaultIconSize = 50

// TODO 需要优化写法  change2
export const IconType = {
    NO_DATA: "noData",
    HUMAN_RESOURCE: "humanResource",
    VIEW_ICON: 'viewIcon',
    COMMIT_ICON: 'commitIcon',
    TRANSLATE: 'translate'
}

/**
 * 系统公用图标
 *
 * @param type 图标类型。默认为该系统（人力资源）图标
 * @param iconSize 图标大小。默认50
 */
export default function PublicIcon(
    {
        type,
        iconSize,
        style,
        onClick,
    }
) {

    const render = () => {
        switch (type) {
            // TODO 需要优化写法 need change3。拓展IconType，根据key获取图标地址和图标名称，createElement
            case IconType.NO_DATA:
                return <Icon component={NoData}
                             onClick={()=>onClick()}
                             style={{fontSize: iconSize || defaultIconSize}}/>

            case IconType.VIEW_ICON:
                return <Icon component={ViewIcon}
                             onClick={()=>onClick()}
                             style={{fontSize: iconSize || defaultIconSize}}/>

            case IconType.TRANSLATE:
                return <Icon component={Translate_White}
                             onClick={()=>onClick()}
                             style={{
                                 ...style,
                                 fontSize: iconSize || defaultIconSize,
                             }}/>

            default:
                return <Icon component={HumanResouce}
                             onClick={()=>onClick()}
                             style={{fontSize: iconSize || defaultIconSize}}/>
        }
    }
    return render()
}
