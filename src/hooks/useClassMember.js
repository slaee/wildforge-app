import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClassRoomsService } from '../services';

const useClassMember = (classId, userId) => {
  const navigate = useNavigate();
  const [isRetrieving, setIsRetrieving] = useState(true);
  const [classMember, setClassMember] = useState([]);

  useEffect(() => {
    const get = async () => {
      let responseCode;
      let retrievedClassMember;

      try {
        const { status, data } = await ClassRoomsService.member(
          classId,
          userId
        );

        responseCode = status;
        retrievedClassMember = data;
      } catch (error) {
        responseCode = error.response.status;
      }

      switch (responseCode) {
        case 200:
          setClassMember(retrievedClassMember);
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

  return { isRetrieving, classMember };
};

export default useClassMember;
