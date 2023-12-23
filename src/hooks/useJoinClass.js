import { useState } from 'react';

import { ClassRoomsService } from '../services';

const useJoinClass = () => {
  const [isJoining, setIsJoining] = useState(false);

  const joinClass = async ({ classCode, callbacks }) => {
    setIsJoining(true);

    let responseCode;
    let retrievedMessage;

    try {
      const { status, data } = await ClassRoomsService.join({
        class_code: classCode,
      });

      responseCode = status;
      retrievedMessage = data;
    } catch (error) {
      responseCode = error.response.status;
    }

    switch (responseCode) {
      case 200:
        await callbacks.joined({ retrievedMessage });
        break;
      case 400:
      case 401:
      case 404:
        await callbacks.invalidFields();
        break;
      case 500:
        await callbacks.internalError();
        break;
      default:
    }

    setIsJoining(false);
  };

  return { isJoining, joinClass };
};

export default useJoinClass;
