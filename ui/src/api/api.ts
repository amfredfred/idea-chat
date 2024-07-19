import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { apiRoutes } from './apiRoutes';
import { getItem } from '@src/hooks/useLocalStorage';

const isLive = false;
const baseURL = isLive ? 'https://www.website.com/api' : 'http://192.168.1.119:7979';

const api = axios.create({
    baseURL,
});

api.interceptors.request.use(
    (config) => {
        const userId = getItem('_usertoken', null);
        if (userId) {
            config.headers['x-t-id'] = userId;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
);

const apiCall = async <T>(routeFunc: keyof typeof apiRoutes, pathTo: string = '/', ...args: Record<string, string>[]): Promise<AxiosResponse<T>> => {
    const { method, path, data } = apiRoutes[routeFunc](...args, pathTo);
    const config: AxiosRequestConfig = { method, url: path };
    if (data) config.data = { data };

    try {
        const response: AxiosResponse<T> = await api(config);
        return response;
    } catch (error) {
        error
        throw error;
    }
};

export { api, apiCall };