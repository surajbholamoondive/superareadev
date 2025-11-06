import profileIcon from '../../assets/MenuIcons/ProfileDropdown/profile.svg';
import profileIconBlack from '../../assets/MenuIcons/ProfileDropdown/profileBlack.svg';
import postAddIcon from '../../assets/MenuIcons/ProfileDropdown/post-add.svg';
import postAddIconBlack from '../../assets/MenuIcons/ProfileDropdown/post-addBlack.svg';
import groupIcon from '../../assets/MenuIcons/ProfileDropdown/Group 1171278614.svg';
import groupIconBlack from '../../assets/MenuIcons/ProfileDropdown/Group 1171278614Black.svg';


import buildingIcon from '../../assets/MenuIcons/ProfileDropdown/building.svg';
import buildingBlack from '../../assets/MenuIcons/ProfileDropdown/buildingBlack.svg';

import groupAddIcon from '../../assets/MenuIcons/ProfileDropdown/Group_add.svg';
import groupAddIconBlack from '../../assets/MenuIcons/ProfileDropdown/Group_addBlack.svg';

import wrenchIcon from '../../assets/MenuIcons/ProfileDropdown/wrench.svg';
import wrenchIconBlack from '../../assets/MenuIcons/ProfileDropdown/wrenchBlack.svg';

import appModeration from '../../assets/MenuIcons/ProfileDropdown/app_moderation.svg';
import appModerationBlack from '../../assets/MenuIcons/ProfileDropdown/app_moderationBlack.svg';
import bugReport from '../../assets/MenuIcons/ProfileDropdown/bug_report.svg';
import bugReportBlack from '../../assets/MenuIcons/ProfileDropdown/bug_reportBlack.svg';


import logoutIcon from '../../assets/MenuIcons/ProfileDropdown/logout.svg';
import logoutIconBlack from '../../assets/MenuIcons/ProfileDropdown/logoutBlack.svg';

import MoresIcon from '../../assets/logo/logo-icon.svg'
import mverification from '../../assets/MenuIcons/ProfileDropdown/mverification.svg'
import mverificationBlack from '../../assets/MenuIcons/ProfileDropdown/mverificationBlack.svg'

import associates from '../../assets/MenuIcons/ProfileDropdown/M associates.svg'
import associatesBlack from '../../assets/MenuIcons/ProfileDropdown/M associatesBlack.svg'

import assignAssociates from '../../assets/MenuIcons/ProfileDropdown/assign associates.svg'
import assignAssociatesBlack from '../../assets/MenuIcons/ProfileDropdown/assign associatesBlack.svg'

import allListing from '../../assets/MenuIcons/ProfileDropdown/all listing.svg'
import allListingBlack from '../../assets/MenuIcons/ProfileDropdown/all listingBlack.svg'

import allUser from '../../assets/MenuIcons/ProfileDropdown/all users.svg'
import allUserBlack from '../../assets/MenuIcons/ProfileDropdown/all usersBlack.svg'


const adminMenuConfig = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: profileIcon, iconBlack: profileIconBlack, iconWidth: '30px' },
  { label: 'Associates', path: '/admin/my-s-associates', icon: associates, iconBlack: associatesBlack, iconWidth: '30px', labelIcon: MoresIcon },
  { label: 'Leads', path: '/admin/leads', icon: groupIcon, iconBlack: groupIconBlack, iconWidth: '30px' },
  { label: 'Project/Building', path: '/admin/project-building', icon: buildingIcon, iconBlack: buildingBlack, iconWidth: '30px' },
  { label: 'Post Project/Building', path: '/admin/post-project', icon: postAddIcon, iconBlack: postAddIconBlack, iconWidth: '30px' },
  { label: 'All Users', path: '/admin/all-users', icon: allUser, iconBlack: allUserBlack, iconWidth: '30px' },
  { label: 'Direct Listing', path: '/admin/direct-listings', icon: allListing, iconBlack: allListingBlack, iconWidth: '30px' },


  { label: 'Associate', path: '/admin/assign-s-associates', icon: assignAssociates, iconBlack: assignAssociatesBlack, iconWidth: '30px', labelIcon: MoresIcon, preIconText: 'Assign' },




  { label: 'Direct Leads', path: '/admin/direct-leads', icon: groupAddIcon, iconBlack: groupAddIconBlack, iconWidth: '30px' },


  { label: 'Super Verification', path: '/admin/super-verification', icon: mverification, iconBlack: mverificationBlack, iconWidth: '30px' },

  { label: 'Website Moderation', path: '/admin/website-moderation', icon: wrenchIcon, iconBlack: wrenchIconBlack, iconWidth: '30px' },

  { label: 'App Moderation', path: '/admin/app-moderation', icon: appModeration, iconBlack: appModerationBlack, iconWidth: '30px' },

  { label: 'Bug Reports', path: '/admin/bug-report-table', icon: bugReport, iconBlack: bugReportBlack, iconWidth: '30px' },

  // { label: 'Settings', path: '/admin/settings', icon: settings, iconWidth: '30px' },
  { label: 'Logout', path: '/admin/logout', icon: logoutIcon, iconBlack: logoutIconBlack, iconWidth: '30px' }
];

export default adminMenuConfig;

