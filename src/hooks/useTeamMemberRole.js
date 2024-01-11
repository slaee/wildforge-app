import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClassRoomsService } from '../services';

const useTeamMemberRole = (classId, userId) => {
  const navigate = useNavigate();
  const [teamMemberRole, setTeamMemberRole] = useState([]);
  const [teamMemberRoleStatus, setTeamMemberRoleStatus] = useState([]);
  const [isRetrieving, setIsRetrieving] = useState(false);

  useEffect(() => {
    const get = async () => {
      let responseCode;
      let retrievedTeamMemberRole;
      let retrievedTeamMemberRoleStatus;

      try {
        const res = await ClassRoomsService.teamMemberRole(classId, userId);

        responseCode = res?.status;
        retrievedTeamMemberRole = res?.data.role;
        retrievedTeamMemberRoleStatus = res?.data.status;
      } catch (error) {
        responseCode = error?.response?.status;
      }

      switch (responseCode) {
        case 200:
          setTeamMemberRole(retrievedTeamMemberRole);
          setTeamMemberRoleStatus(retrievedTeamMemberRoleStatus);
          break;
        case 404:
          navigate(`/classes/${classId}/teamMemberRole`);
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

  return { isRetrieving, teamMemberRole, teamMemberRoleStatus };
};

export default useTeamMemberRole;
