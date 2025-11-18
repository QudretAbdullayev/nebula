import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
    const locale = Cookies.get('NEXT_LOCALE') || 'en';
    config.headers['Accept-Language'] = locale;
    return config;
});

export default axiosInstance;