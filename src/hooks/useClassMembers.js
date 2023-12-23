import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClassRoomsService } from '../services';

const useClassMembers = (classId) => {
  const navigate = useNavigate();
  const [classMembers, setClassMembers] = useState([]);
  const [isRetrieving, setIsRetrieving] = useState(false);

  const deleteMember = async (memberID) => {
    let responseCode;

    try {
      const { status } = await ClassRoomsService.delete(classId, memberID);

      responseCode = status;
    } catch (error) {
      responseCode = error.response.status;
    }

    switch (responseCode) {
      case 200:
        setClassMembers((prevClassMembers) =>
          prevClassMembers.filter((member) => member.id !== memberID)
        );
        break;
      case 404:
      case 500:
        navigate(`/classes/$P{classId}/members`);
        break;
      default:
    }
  };

  const acceptMember = async (memberID) => {
    let responseCode;

    try {
      const { status } = await ClassRoomsService.accept(classId, memberID);

      responseCode = status;
    } catch (error) {
      responseCode = error.response.status;
    }

    switch (responseCode) {
      case 200:
        setClassMembers((prevClassMembers) =>
          prevClassMembers.map((member) => {
            if (member.id === memberID) {
              return { ...member, status: 'accepted' };
            }

            return member;
          })
        );
        break;
      case 404:
      case 500:
        navigate(`/classes/$P{classId}/members`);
        break;
      default:
    }
  };

  useEffect(() => {
    const get = async () => {
      let responseCode;
      let retrievedClassMembers;

      try {
        const { status, data } = await ClassRoomsService.members(classId);

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

    get();
  }, []);

  return {
    isRetrieving,
    classMembers,
    deleteMember,
    acceptMember,
  };
};

export default useClassMembers;
