import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClassRoomsService } from '../services';

const useClassRooms = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const get = async () => {
      let responseCode;
      let retrievedClasses;

      try {
        const { status, data } = await ClassRoomsService.all();

        responseCode = status;
        retrievedClasses = data;
      } catch (error) {
        responseCode = error.response.status;
      }

      switch (responseCode) {
        case 200:
          setClasses(retrievedClasses);
          break;
        case 401:
        case 404:
        case 500:
          navigate('/logout');
          break;
        default:
      }

      setIsLoading(false);
    };

    get();
  }, []);

  return { isLoading, classes };
};

export default useClassRooms;
