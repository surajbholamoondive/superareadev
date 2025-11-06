import postAddIcon from "../../assets/MenuIcons/ProfileDropdown/post-add.svg";
import postAddIconBlack from "../../assets/MenuIcons/ProfileDropdown/post-addBlack.svg";

import logoutIcon from "../../assets/MenuIcons/ProfileDropdown/logout.svg";
import logoutIconBlack from "../../assets/MenuIcons/ProfileDropdown/logoutBlack.svg";


import profileIcon from '../../assets/MenuIcons/ProfileDropdown/profile.svg';
import profileIconBlack from '../../assets/MenuIcons/ProfileDropdown/profileBlack.svg';

import listBoxIcon from "../../assets/MenuIcons/ProfileDropdown/icons_list-box.svg";
import listBoxIconBlack from "../../assets/MenuIcons/ProfileDropdown/icons_list-boxBlack.svg";

import mverification from '../../assets/MenuIcons/ProfileDropdown/mverification.svg'
import mverificationBlack from '../../assets/MenuIcons/ProfileDropdown/mverificationBlack.svg'

import assignAssociates from '../../assets/MenuIcons/ProfileDropdown/assign associates.svg'
import assignAssociatesBlack from '../../assets/MenuIcons/ProfileDropdown/assign associatesBlack.svg'

import groupIcon from '../../assets/MenuIcons/ProfileDropdown/Group 1171278614.svg';
import groupIconBlack from '../../assets/MenuIcons/ProfileDropdown/Group 1171278614Black.svg';


const AgentMenuConfig = [
  { label: "Profile", path: "/agent/profile", icon: profileIcon, iconBlack: profileIconBlack, iconWidth: "30px" },
  { label: "My Listings", path: "/agent/listing", icon: listBoxIcon, iconBlack: listBoxIconBlack, iconWidth: "30px" },
  { label: "Assigned Listings", path: "/agent/assigned-listing", icon: assignAssociates, iconBlack: assignAssociatesBlack, iconWidth: "30px" },
  { label: "S-Verification", path: "/agent/e-verification", icon: mverification, iconBlack: mverificationBlack, iconWidth: "30px" },
  { label: "Leads", path: "/agent/leads?activity=enquired&pageNumber=1&pageSize=10&listingtype=My+Listings", icon: groupIcon, iconBlack: groupIconBlack, iconWidth: "30px" },
  { label: "Post Property", path: "/agent/post-property", icon: postAddIcon, iconBlack: postAddIconBlack, iconWidth: "30px" },
  { label: "Logout", path: "/agent/logout", icon: logoutIcon, iconBlack: logoutIconBlack, iconWidth: "30px" },

];
export default AgentMenuConfig;
