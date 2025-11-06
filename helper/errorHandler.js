import { toast } from 'react-toastify';

const handleApiResponse = (response, showToast) => {1
    if (response) {
        switch (response?.data?.responseCode) {
            case 200:
                if(showToast) {
                    showSuccessToast(response.data.responseMessage); // Success
                }
                break;
            case 401:
                showLoadingToast(response.data.responseMessage);  // Unauthorized
                break;
            case 400:
                showToastError(response.data.responseMessage); // Bad Request
                break;
            case 404:
                showToastError(response.data.responseMessage); // Not Found
                break;
            case 409:
                showLoadingToast(response.data.responseMessage); // Conflict
                break;
            case 403:
                showToastError(response.data.responseMessage); // Forbidden
                break;
            case 402:
                showToastError(response.data.responseMessage); // Invalid
                break;
            case 500:
                showToastError(response.data.responseMessage); // Internal Server Error
                break;
            default:
                showToast('Error');
        }
    } else if (error.request) {
        showToast('Request Error');
    } else {
        showToast('Error');
    }
};

const showToastError = (message) => {
    toast.error(message);
};
const showSuccessToast = (message) => {
    toast.success(message);
};
const showLoadingToast = (message) => {
    toast.loading(message);
};


export default handleApiResponse;
