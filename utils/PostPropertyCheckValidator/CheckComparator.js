import { toast } from "react-toastify";

function getNestedValue(obj, path) {
    const parts = path.split('.')
    if (parts.length === 1) {
        return obj[parts[0]]
    } else if (parts.length === 3 && parts[0] === "areaDetail") {
        const areaType = parts[1]
        const property = parts[2]
        const areaDetail = obj["areaDetail"]
        if (Array.isArray(areaDetail)) {
            const item = areaDetail.find(item => item.areaType === areaType)
            return item ? item[property] : undefined
        } else {
            return undefined
        }
    } else {
        let current = obj
        for (const part of parts) {
            if (current[part] !== undefined) {
                current = current[part]
            } else {
                return undefined
            }
        }
        return current
    }
}

export default function CheckComparator(DATA, mandatoryFields) {
    if (typeof mandatoryFields === 'string') {
        toast.error(mandatoryFields)
        return false
    }
    for (const item of mandatoryFields) {
        const fieldName = Object.keys(item)[0]
        const errorMessage = item[fieldName] 
        const value = getNestedValue(DATA, fieldName)
        if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) {
            toast.error(errorMessage)
            return false
        }
    }
    return true
}