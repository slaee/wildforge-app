import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ClassRoomsService } from '../services';

const useClassRoom = (classId) => {
  const navigate = useNavigate();
  const [isRetrieving, setIsRetrieving] = useState(true);
  const [classRoom, setClassRoom] = useState([]);

  useEffect(() => {
    const get = async () => {
      let responseCode;
      let retrievedClassRoom;

      try {
        const { status, data } = await ClassRoomsService.get(classId);

        responseCode = status;
        retrievedClassRoom = data;
      } catch (error) {
        responseCode = error.response.status;
      }

      switch (responseCode) {
        case 200:
          setClassRoom(retrievedClassRoom);
          break;
        case 404:
          navigate('/classes');
          break;
        case 500:
          navigate('/classes');
          break;
        default:
      }

      setIsRetrieving(false);
    };

    get();
  }, []);

  return { isRetrieving, classRoom };
};

export default useClassRoom;
