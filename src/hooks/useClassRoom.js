import { useState, useEffect } from 'react';
import { redirect, useNavigate } from 'react-router-dom';

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
        const res = await ClassRoomsService.get(classId);

        responseCode = res.status;
        retrievedClassRoom = res.data;
      } catch (error) {
        responseCode = error.response.status;
      }

      switch (responseCode) {
        case 200:
          setClassRoom(retrievedClassRoom);
          break;
        case 401:
          redirect('/login');
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
