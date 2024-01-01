import { redirect } from 'react-router-dom';

import axios from 'axios';
import Cookies from 'js-cookie';
import config from './config';

import TokensService from './TokensService';

const loginRestart = () => {
  redirect('/logout');
};

export const api = axios.create({
  baseURL: config.API_URL,
});

api.interceptors.request.use(
  (requestConfig) => {
    // if the current request doesn't include the config's base
    // API URL, we don't attach the access token to its authorization
    // because it means it is an API call to a 3rd party service
    if (requestConfig.baseURL !== config.API_URL) {
      return requestConfig;
    }

    // Get access token from cookies for every api request
    const accessToken = Cookies.get('accessToken');
    if (!requestConfig.headers.Authorization) {
      requestConfig.headers.Authorization = `Bearer ${accessToken}`;
    }

    return requestConfig;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    const originalRequest = error?.config;

    if (error?.response?.status === 401 && !originalRequest?.sent) {
      originalRequest.sent = true;

      try {
        const refreshToken = Cookies.get('refreshToken');

        // if the REFRESH TOKEN is still valid, we'll try to renew it
        const { data: renewedTokens } = await TokensService.refresh({
          refresh: refreshToken,
        });

        originalRequest.headers.Authorization = `Bearer ${renewedTokens.access}`;

        // Store the new tokens to cookies
        Cookies.set('accessToken', renewedTokens.access);
        Cookies.set('refreshToken', renewedTokens.refresh);

        return api(originalRequest);
      } catch (err) {
        // if anything goes wrong, logout the user
        // and throw an error to exit this Promise chain
        loginRestart();
      }
    }

    return Promise.reject(error);
  }
);