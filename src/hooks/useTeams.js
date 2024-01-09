import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClassRoomsService } from '../services';
import GLOBALS from '../app_globals';

const useTeams = (classId) => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [nonLeaders, setNonLeaders] = useState([]);
  const [isRetrieving, setIsRetrieving] = useState(false);
  const [isSettingLeader, setIsSettingLeader] = useState(false);

  useEffect(() => {
    const get = async () => {
      let responseCode;
      let retrievedNonleaders;

      try {
        const res = await ClassRoomsService.noneleaders(classId);

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
    };
    get();
  }, []);

  const setLeader = async (memberID) => {
    let responseCode;

    try {
      const res = await ClassRoomsService.setLeader(classId, memberID);
      responseCode = res?.status;
    } catch (error) {
      responseCode = error?.response?.status;
    }

    switch (responseCode) {
      case 200:
        setIsSettingLeader(true);
        break;
      case 404:
        navigate(`/classes/${classId}/teams`);
        break;
      case 500:
        navigate('/classes');
        break;
      default:
    }
  };

  const acceptLeader = async (memberID) => {
    let responseCode;

    try {
      const res = await ClassRoomsService.acceptLeader(classId, memberID);
      responseCode = res?.status;
    } catch (error) {
      responseCode = error?.response?.status;
    }

    switch (responseCode) {
      case 200:
        break;
      case 404:
        navigate(`/classes/${classId}/teams`);
        break;
      case 500:
        navigate('/classes');
        break;
      default:
    }
  };

  const removeLeader = async (memberID) => {
    let responseCode;

    try {
      const res = await ClassRoomsService.removeLeader(classId, memberID);
      responseCode = res?.status;
    } catch (error) {
      responseCode = error?.response?.status;
    }

    switch (responseCode) {
      case 200:
        break;
      case 404:
        navigate(`/classes/${classId}/teams`);
        break;
      case 500:
        navigate('/classes');
        break;
      default:
    }
  };

  const createTeam = async (data) => {
    let responseCode;

    try {
      const res = await ClassRoomsService.createTeam(classId, data);
      responseCode = res?.status;
    } catch (error) {
      responseCode = error?.response?.status;
    }

    switch (responseCode) {
      case 201:
        break;
      case 404:
        navigate(`/classes/${classId}/teams`);
        break;
      case 500:
        navigate('/classes');
        break;
      default:
    }
  };

  const updateTeam = async (teamID, data) => {
    let responseCode;

    try {
      const res = await ClassRoomsService.updateTeam(classId, teamID, data);
      responseCode = res?.status;
    } catch (error) {
      responseCode = error?.response?.status;
    }

    switch (responseCode) {
      case 200:
        break;
      case 404:
        navigate(`/classes/${classId}/teams`);
        break;
      case 500:
        navigate('/classes');
        break;
      default:
    }
  };

  const deleteTeam = async (teamID) => {
    let responseCode;

    try {
      const res = await ClassRoomsService.deleteTeam(classId, teamID);
      responseCode = res?.status;
    } catch (error) {
      responseCode = error?.response?.status;
    }

    switch (responseCode) {
      case 204:
        setTeams((prevTeams) => prevTeams.filter((team) => team.id !== teamID));
        break;
      case 404:
        navigate(`/classes/${classId}/teams`);
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
      let retrievedTeams;

      try {
        const res = await ClassRoomsService.teams(classId);

        responseCode = res?.status;
        retrievedTeams = res?.data;
      } catch (error) {
        responseCode = error?.response?.status;
      }

      switch (responseCode) {
        case 200:
          setTeams(retrievedTeams);
          break;
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

  return {
    teams,
    isRetrieving,
    isSettingLeader,
    nonLeaders,
    setLeader,
    acceptLeader,
    removeLeader,
    createTeam,
    updateTeam,
    deleteTeam,
  };
};

export default useTeams;
