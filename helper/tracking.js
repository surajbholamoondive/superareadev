import UAParser from 'ua-parser-js';
import Cookies from 'js-cookie';
import { generateMachineId } from '@/utils/utils';
import axios from 'axios';
import { IPIFY_API_PATH } from '@/text';

const getGeolocationData = () => {
    function success(pos) {
        const crd = pos.coords;
        Cookies.set('__lat', `${crd.latitude}`);
        Cookies.set('__long', `${crd.longitude}`);
        Cookies.set('_accuracy', `${crd.accuracy}`);
    }
    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    if (typeof navigator !== 'undefined') {
        navigator.geolocation.getCurrentPosition(success, error);
    }
};

const fetchIPData = async () => {
    try {
        const response = await fetch(IPIFY_API_PATH);
        const data = await response.json();
        if (data) {
            getGeolocationData()
            axios.defaults.headers.common["ipaddress"] = data.ip
            Cookies.set('ipaddress', data.ip);
            const longitude = Cookies.get("__lat")
            const latitude = Cookies.get("__long")
            axios.defaults.headers.common["latitude"] = latitude
            axios.defaults.headers.common["longitude"] = longitude
            const machineId = generateMachineId(data.ip)
            if (machineId) {
                const existingMachineId = Cookies.get('machineid')
                axios.defaults.headers.common["machineid"] = existingMachineId ? existingMachineId : machineId
                if (!existingMachineId) {
                    Cookies.set('machineid', machineId);
                }
            }
            return data;
        }
    } catch (error) {
    }
};

export const getBrowserDetails = () => {
    const parser = new UAParser();
    return parser.getResult();
};

export const getConnectionDetails = () => {
    const networkInfo = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    return {
        type: networkInfo?.type,
        effectiveType: networkInfo?.effectiveType
    };
};

export const getAccessibilitySettings = () => {
    return {
        highContrast: window.matchMedia('(forced-colors: active)').matches,
        reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    };
};

export const initializeTracking = () => {
    try {
        const userDetails = getBrowserDetails();
        const connectionDetails = getConnectionDetails();
        const accessibilitySettings = getAccessibilitySettings();
        return { userDetails, connectionDetails, accessibilitySettings};
    } catch (error) {
        return null;
    }
};

export { getGeolocationData, fetchIPData };