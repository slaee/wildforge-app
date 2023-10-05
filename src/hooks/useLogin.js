import { useState } from 'react';
import { TokensService } from '../services';

const useLogin = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const loginUser = async ({ email, password, callbacks }) => {
    setIsLoggingIn(true);

    let responseCode;
    let retrievedUser;

    try {
      const { status, data } = await TokensService.acquire({
        email,
        password,
      });

      responseCode = status;
      retrievedUser = data;
    } catch (error) {
      responseCode = error.response.status;
    }

    switch (responseCode) {
      case 200:
        await callbacks.loggedIn({ retrievedUser });
        break;
      case 401:
        await callbacks.invalidFields();
        break;
      case 404:
        await callbacks.invalidFields();
        break;
      case 500:
        await callbacks.internalError();
        break;
      default:
    }

    setIsLoggingIn(false);
  };

  return { isLoggingIn, loginUser };
};

export default useLogin;
