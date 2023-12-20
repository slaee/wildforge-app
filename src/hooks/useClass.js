import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ClassRoomsService } from '../services';

const useRoom = (classId) => {
  const navigate = useNavigate();
  const [isRetrieving, setIsRetrieving] = useState(true);
  const [classRoom, setClassRoom] = useState([]);

  useEffect(() => {
    const retrieveClassRoom = async () => {
      let responseCode;
      let retrievedClassRoom;

      try {
        const { status, data } = await ClassRoomsService.retrieve(classId);

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

    retrieveClassRoom();
  }, []);

  return { isRetrieving, classRoom };
};

export default useRoom;
