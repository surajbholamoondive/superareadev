const Icon = ({ name, size = '1em', color = 'currentColor', iconSize='20' }) => {
    switch (name) {
      case 'custom-email':
        return (
            <svg width={iconSize} height={iconSize} viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="ri:menu-2-fill">
            <path id="Vector" d="M5.25 7H36.75V10.5H5.25V7ZM5.25 19.25H26.25V22.75H5.25V19.25ZM5.25 31.5H36.75V35H5.25V31.5Z" fill="black"/>
            </g>
            </svg>
        );
      case 'custom-social':
        return (
            <svg width={iconSize} height={iconSize} viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="ri:menu-2-fill">
            <path id="Vector" d="M5.25 7H36.75V10.5H5.25V7ZM5.25 19.25H26.25V22.75H5.25V19.25ZM5.25 31.5H36.75V35H5.25V31.5Z" fill="black"/>
            </g>
            </svg>
        );
      case 'custom-handshake':
        return (
            <svg width={iconSize} height={iconSize} viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="ri:menu-2-fill">
            <path id="Vector" d="M5.25 7H36.75V10.5H5.25V7ZM5.25 19.25H26.25V22.75H5.25V19.25ZM5.25 31.5H36.75V35H5.25V31.5Z" fill="black"/>
            </g>
            </svg>
        );
      case 'custom-way':
        return (
            <svg width={iconSize} height={iconSize} viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="ri:menu-2-fill">
            <path id="Vector" d="M5.25 7H36.75V10.5H5.25V7ZM5.25 19.25H26.25V22.75H5.25V19.25ZM5.25 31.5H36.75V35H5.25V31.5Z" fill="black"/>
            </g>
            </svg>
        );
      case 'custom-phone':
        return (
            <svg width={iconSize} height={iconSize} viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="ri:menu-2-fill">
            <path id="Vector" d="M5.25 7H36.75V10.5H5.25V7ZM5.25 19.25H26.25V22.75H5.25V19.25ZM5.25 31.5H36.75V35H5.25V31.5Z" fill="black"/>
            </g>
            </svg>
        );
      case 'custom-video':
        return (
            <svg width={iconSize} height={iconSize} viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="ri:menu-2-fill">
            <path id="Vector" d="M5.25 7H36.75V10.5H5.25V7ZM5.25 19.25H26.25V22.75H5.25V19.25ZM5.25 31.5H36.75V35H5.25V31.5Z" fill="black"/>
            </g>
            </svg>
        );
      case 'custom-key':
        return (
            <svg width={iconSize} height={iconSize} viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="ri:menu-2-fill">
            <path id="Vector" d="M5.25 7H36.75V10.5H5.25V7ZM5.25 19.25H26.25V22.75H5.25V19.25ZM5.25 31.5H36.75V35H5.25V31.5Z" fill="black"/>
            </g>
            </svg>
        );
      case 'custom-land':
        return (
            <svg width={iconSize} height={iconSize} viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="ri:menu-2-fill">
            <path id="Vector" d="M5.25 7H36.75V10.5H5.25V7ZM5.25 19.25H26.25V22.75H5.25V19.25ZM5.25 31.5H36.75V35H5.25V31.5Z" fill="black"/>
            </g>
            </svg>
        );
      case 'custom-sell':
        return (
            <svg width={iconSize} height={iconSize} viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="ri:menu-2-fill">
            <path id="Vector" d="M5.25 7H36.75V10.5H5.25V7ZM5.25 19.25H26.25V22.75H5.25V19.25ZM5.25 31.5H36.75V35H5.25V31.5Z" fill="black"/>
            </g>
            </svg>
        );
      case 'custom-buy':
        return (
            <svg width={iconSize} height={iconSize} viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="ri:menu-2-fill">
            <path id="Vector" d="M5.25 7H36.75V10.5H5.25V7ZM5.25 19.25H26.25V22.75H5.25V19.25ZM5.25 31.5H36.75V35H5.25V31.5Z" fill="black"/>
            </g>
            </svg>
        );
        
      default:
        return null; 
    }
  };

  export default Icon