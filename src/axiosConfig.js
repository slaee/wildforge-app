import axios from 'axios';
import Cookies from 'universal-cookie';
import jwt from 'jwt-decode';
import config from './services/config';
import GLOBALS from './app_globals';

const cookies = new Cookies();

const loginRestart = () => {
  cookies.remove('user', {
    path: '/',
  });

  cookies.remove('accessToken', {
    path: '/',
  });

  cookies.remove('refreshToken', {
    path: '/',
  });

  cookies.remove('votes', {
    path: '/',
  });
};

export const configureAxios = () => {
  axios.defaults.baseURL = config.API_URL;
  axios.defaults.timeout = 40000;
  axios.defaults.headers.common['Content-Type'] = 'application/json';

  // add a request interceptor to all the axios requests
  // that are going to be made in the site. The purpose
  // of this interceptor is to verify if the access token
  // is still valid and renew it if needed and possible
  axios.interceptors.request.use(
    (requestConfig) => {
      // if the current request doesn't include the config's base
      // API URL, we don't attach the access token to its authorization
      // because it means it is an API call to a 3rd party service
      if (requestConfig.baseURL !== config.API_URL) {
        return requestConfig;
      }

      // Get access token from cookies for every api request
      const accessToken = cookies.get('accessToken');
      requestConfig.headers.authorization = accessToken
        ? `Bearer ${accessToken}`
        : null;

      return requestConfig;
    },
    (error) => Promise.reject(error)
  );

  axios.interceptors.response.use(null, async (error) => {
    if (error.config && error.response) {
      if (
        error.response.data === 'Forbidden access' &&
        error.response.status === 401
      ) {
        // Get refresh token when 401 response status
        const refreshToken = cookies.get('refreshToken');

        // Get payload of refreshToken
        let payload;

        try {
          payload = jwt(refreshToken);
        } catch (e) {
          // If refreshToken is invalid, logout the user
          loginRestart();
          return;
        }

        // We are certain that the access token already expired.
        // We'll check if REFRESH TOKEN has also expired.
        // const { data: verifyResponse } = await TokensService.verify({
        //   refreshToken,
        // });

        // if (!verifyResponse?.isValid) {
        //   // if the REFRESH TOKEN has already expired as well, logout the user
        //   // and throw an error to exit this Promise chain
        //   loginRestart();
        //   throw new Error('refresh token has already expired');
        // }

        // If the REFRESH TOKEN is still active, renew the ACCESS TOKEN and the REFRESH TOKEN
        // let renewResponse;

        // if (payload?.typ === GLOBALS.USER_TYPES.ANONYMOUS) {
        //   ({ data: renewResponse } = await RoomsService.renew({
        //     refreshToken,
        //   }));
        // } else {
        //   ({ data: renewResponse } = await TokensService.renew({
        //     refreshToken,
        //   }));
        // }

        // Store the new tokens to cookies
        // cookies.set('accessToken', renewResponse.accessToken, { path: '/' });
        // cookies.set('refreshToken', renewResponse.refreshToken, {
        //   path: '/',
        // });

        // // Modify the Authorization Header using the NEW ACCESS TOKEN
        // error.config.headers.authorization = renewResponse.accessToken;

        return axios.request(error.config);
      }
    }

    return Promise.reject(error);
  });
};
