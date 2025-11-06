import profileIcon from "../../assets/MenuIcons/ProfileDropdown/profile.svg";
import profileIconBlack from '../../assets/MenuIcons/ProfileDropdown/profileBlack.svg';
import listBoxIcon from "../../assets/MenuIcons/ProfileDropdown/icons_list-box.svg";
import listBoxIconBlack from "../../assets/MenuIcons/ProfileDropdown/icons_list-boxBlack.svg";
import postAddIcon from "../../assets/MenuIcons/ProfileDropdown/post-add.svg";
import postAddIconBlack from "../../assets/MenuIcons/ProfileDropdown/post-addBlack.svg";
import assignmentIcon from "../../assets/MenuIcons/ProfileDropdown/assignmentIcon.svg";
import assignmentIconBlack from "../../assets/MenuIcons/ProfileDropdown/assignmentIconBlack.svg";
import enquiriesIcon from '../../assets/userDashboard/enquiriesIcon.svg'
import enquiriesIconBlack from '../../assets/userDashboard/enquiriesIconBlack.svg'
import logoutIcon from '../../assets/MenuIcons/ProfileDropdown/logout.svg';
import logoutIconBlack from "../../assets/MenuIcons/ProfileDropdown/logoutBlack.svg";
import activities from '../../assets/MenuIcons/ProfileDropdown/ri_time-line.svg'
import activitiesBlack from '../../assets/MenuIcons/ProfileDropdown/ri_time-lineBlack.svg'
import { GLOBALLY_COMMON_TEXT } from "@/textV2";

const userMenuConfig = [
    { label: "Profile", path: "/user/profile", icon: profileIcon, iconBlack: profileIconBlack, iconWidth: "30px" },
    { label: "My Activities", path: "/user/activity", icon: activities, iconBlack: activitiesBlack, iconWidth: "30px" },
    { label: "Post Property", path: "/user/post-property", icon: postAddIcon, iconBlack: postAddIconBlack, iconWidth: "30px" },
    { label: "My Listings", path: "/user/listing", icon: listBoxIcon, iconBlack: listBoxIconBlack, iconWidth: "30px" },
    {
        label: (
            <div className="flex gap-1">
                <div >{GLOBALLY_COMMON_TEXT.text.enquiriesText}</div>
                <div >{GLOBALLY_COMMON_TEXT.text.recievedText}</div>
            </div>),
        path: "/user/enquiries-received", icon: enquiriesIcon, iconBlack: enquiriesIconBlack, iconWidth: "30px"
    },
    { label: "Associates", path: "/user/super-associate", icon: assignmentIcon, iconBlack: assignmentIconBlack, iconWidth: "30px",  },
    { label: "Logout", path: "/user/logout", icon: logoutIcon, iconBlack: logoutIconBlack, iconWidth: "30px" },
];

export default userMenuConfig;
