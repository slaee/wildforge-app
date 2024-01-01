import { useState } from 'react';

import { TokensService } from '../services';

const useAcquireTokens = () => {
  const [isAcquiring, setIsAcquiring] = useState(false);

  const acquireTokens = async ({ email, password, callbacks }) => {
    setIsAcquiring(true);

    let responseCode;
    let accessToken;
    let refreshToken;

    try {
      const { status, data } = await TokensService.acquire({
        email,
        password,
      });

      responseCode = status;
      accessToken = data.access;
      refreshToken = data.refresh;
    } catch (error) {
      //
    }

    switch (responseCode) {
      case 200:
        await callbacks.acquired({ accessToken, refreshToken });
        break;
      case 401:
        await callbacks.invalidFields();
        break;
      case 500:
        await callbacks.internalError();
        break;
      default:
    }

    setIsAcquiring(false);
  };

  return { isAcquiring, acquireTokens };
};

export default useAcquireTokens;
