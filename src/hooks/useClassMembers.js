import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClassesService } from '../services';

const useClassMembers = (classId) => {
  const navigate = useNavigate();
  const [classMembers, setClassMembers] = useState([]);
  const [isRetrieving, setIsRetrieving] = useState(false);

  const deleteMember = async (memberID) => {
    let responseCode;

    try {
      const { status } = await ClassesService.delete(classId, memberID);

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
      const { status } = await ClassesService.accept(classId, memberID);

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

  const acceptLeader = async (memberID) => {
    let responseCode;

    try {
      const { status } = await ClassesService.acceptLeader(classId, memberID);

      responseCode = status;
    } catch (error) {
      responseCode = error.response.status;
    }

    switch (responseCode) {
      case 200:
        setClassMembers((prevClassMembers) =>
          prevClassMembers.map((member) => {
            if (member.id === memberID) {
              return { ...member, role: 'tl' };
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
    deleteMember,
    acceptMember,
    acceptLeader,
  };
};

export default useClassMembers;
