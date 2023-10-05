import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClassesService } from '../services';

const useClassMembers = (classId) => {
  const navigate = useNavigate();
  const [classMembers, setClassMembers] = useState([]);
  const [isRetrieving, setIsRetrieving] = useState(false);

  useEffect(() => {
    const retrieveClassMembers = async () => {
      let responseCode;
      let retrievedClassMembers;

      try {
        const { status, data } = await ClassesService.retrieveMembers(classId);

        responseCode = status;
        retrievedClassMembers = data;
      } catch (error) {
        responseCode = error.response.status;
      }

      switch (responseCode) {
        case 200:
          setClassMembers(retrievedClassMembers);
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

    retrieveClassMembers();
  }, []);

  return {
    isRetrieving,
    classMembers,
  };
};

export default useClassMembers;
