import React, {createContext, useContext} from 'react';
import axios from 'axios';

// const { decrypt, storeExpiry, read } = require('./LocalStorageEncryption');

const AxiosContext = createContext();
const baseUrl = process.env.REACT_API_URL || 'http://localhost:3000';

// eslint-disable-next-line react/prop-types
export const AxiosProvider = ({ children }) => {
    const axiosInstance = axios.create({
        baseURL: baseUrl,
        headers: {
            "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpkZXNvdXNhIiwiaWF0IjoxNzAxNzI4MTgyLCJleHAiOjE3MDE4MTQ1ODJ9.i_V1HO56HGIftSqz86UYQ9gZYBsrDu9UO11h5wlG_hc"
        }
    });

    // async function refreshToken() {
    //     // place request to backend service to refresh token
    //     const response = await axios.post(`${baseUrl}/token`, {"token": decrypt(read("refreshToken"))});
    //     // update stored instance
    //     storeExpiry("accessToken", response.data.accessToken, true);
    //     // update axios instance with new token
    //     axiosInstance.defaults.headers.common.Authorization = `Bearer ${response.data.accessToken}`;
    // }

    // useEffect(() => {
    //     axiosInstance.defaults.headers.common.Authorization = `Bearer ${decrypt(read("accessToken"))}`;

    //     axiosInstance.interceptors.response.use(
    //         (response) => {
    //             return response;
    //         },
    //         async (error) => {
    //             if (error.response) {
    //                 const { status, data } = error.response;
    //
    //                 switch (status) {
    //                     case 401:
    //                         if (data.message === "Authentication Error: jwt expired") {
    //                             try {
    //                                 // attempting to refresh token;
    //                                 await refreshToken();
    //                                 // token refreshed, reattempting request;
    //                                 const { config } = error;
    //                                 // configure new request in a new instance;
    //                                 return await axiosInstance({method: config.method, url: config.url, data: config.data});
    //                             } catch (e) {
    //                                 // eslint-disable-next-line no-return-assign
    //                                 return window.location.href = "/auth/login";
    //                             }
    //                         } else {
    //                             // eslint-disable-next-line no-return-assign
    //                             return window.location.href = "/auth/login";
    //                         }
    //                     default:
    //                         return Promise.reject(error);
    //                 }
    //             } else if (error.request) {
    //                 // The request was made but no response was received
    //                 // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //                 // http.ClientRequest in node.js
    //                 return Promise.reject(error);
    //             } else {
    //                 // Something happened in setting up the request that triggered an Error
    //                 return Promise.reject(error);
    //             }
    //         }
    //     );
    // }, [axiosInstance]);


    return (
        <AxiosContext.Provider value={axiosInstance}>
            { children }
        </AxiosContext.Provider>
    );
};

export const useAxios = () => {
    return useContext(AxiosContext);
};