import { useState, useEffect } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { ClassRoomsService } from '../services';
import GLOBALS from '../app_globals';

const useClassMembers = (classId) => {
  const navigate = useNavigate();
  const [classMembers, setClassMembers] = useState([]);
  const [isRetrieving, setIsRetrieving] = useState(false);

  const deleteMember = async (memberID) => {
    let responseCode;

    try {
      const res = await ClassRoomsService.delete(classId, memberID).then(() => {
        const del = classMembers.filter((member) => member.id !== memberID);
        setClassMembers(del);
      });

      responseCode = res.status;
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
        navigate(`/classes/${classId}/members`);
        break;
      case 500:
        navigate('/classes');
        break;
      default:
    }
  };

  const acceptMember = async (memberID) => {
    let responseCode;

    try {
      const res = await ClassRoomsService.accept(classId, memberID).then(() => {
        const updated = classMembers.map((member) => {
          if (member.id === memberID) {
            return { ...member, status: GLOBALS.MEMBER_STATUS.ACCEPTED };
          }

          return res.member;
        });

        setClassMembers(updated);
      });

      responseCode = res.status;
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
      case 401:
        redirect('/login');
        break;
      case 404:
        navigate(`/classes/${classId}/members`);
        break;
      case 500:
        navigate('/classes');
        break;
      default:
    }
  };

  useEffect(() => {
    const get = async () => {
      let responseCode;
      let retrievedClassMembers;

      try {
        const res = await ClassRoomsService.members(classId);

        responseCode = res.status;
        retrievedClassMembers = res.data;
      } catch (error) {
        responseCode = error.response.status;
      }

      switch (responseCode) {
        case 200:
          setClassMembers(retrievedClassMembers);
          break;
        case 401:
          redirect('/login');
          break;
        case 404:
          navigate(`/classes/${classId}/members`);
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
