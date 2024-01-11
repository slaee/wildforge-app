import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClassRoomsService } from '../services';

const useNonLeaders = (classId) => {
  const navigate = useNavigate();
  const [nonLeaders, setNonLeaders] = useState(null);
  const [isRetrieving, setIsRetrieving] = useState(false);

  useEffect(() => {
    const get = async () => {
      let responseCode;
      let retrievedNonleaders;

      try {
        const res = await ClassRoomsService.nonleaders(classId);

        responseCode = res?.status;
        retrievedNonleaders = res?.data;
      } catch (error) {
        responseCode = error?.response?.status;
      }

      switch (responseCode) {
        case 200:
          setNonLeaders(retrievedNonleaders);
        case 404:
          navigate(`/classes/${classId}/teams`);
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

  return { nonLeaders, isRetrieving };
};

export default useNonLeaders;
