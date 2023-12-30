import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClassRoomsService } from '../services';
import GLOBALS from '../app_globals';

const useClassMembers = (classId) => {
  const navigate = useNavigate();
  const [classMembers, setClassMembers] = useState([]);
  const [isRetrieving, setIsRetrieving] = useState(false);

  const deleteMember = async (memberID) => {
    let responseCode;

    try {
      const { status } = await ClassRoomsService.delete(classId, memberID).then(
        () => {
          const del = classMembers.filter((member) => member.id !== memberID);
          setClassMembers(del);
        }
      );

      responseCode = status;
    } catch (error) {
      //
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
      const { status } = await ClassRoomsService.accept(classId, memberID).then(
        () => {
          const updated = classMembers.map((member) => {
            if (member.id === memberID) {
              return { ...member, status: GLOBALS.MEMBER_STATUS.ACCEPTED };
            }

            return member;
          });

          setClassMembers(updated);
        }
      );

      responseCode = status;
    } catch (error) {
      // none
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
        //
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
