import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClassRoomsService } from '../services';

const useTeams = (classId) => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState(null);
  const [getTeam, setGetTeam] = useState(null);
  const [leaders, setLeaders] = useState(null);
  const [isRetrieving, setIsRetrieving] = useState(false);
  const [isRetrievingLeaders, setIsRetrievingLeaders] = useState(false);
  const [isSettingLeader, setIsSettingLeader] = useState(false);
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);

  // leaders
  useEffect(() => {
    const get = async () => {
      let responseCode;
      let retrievedLeaders;

      try {
        const res = await ClassRoomsService.leaders(classId);

        responseCode = res?.status;
        retrievedLeaders = res?.data;
      } catch (error) {
        responseCode = error?.response?.status;
      }

      switch (responseCode) {
        case 200:
          setLeaders(retrievedLeaders);
          break;
        case 404:
          navigate(`/classes/${classId}/teams`);
          break;
        case 500:
          navigate('/classes');
          break;
        default:
      }
      setIsRetrievingLeaders(false);
    };

    get();
  }, []);

  // const team = async (teamID) => {
  //   let responseCode;
  //   let retrievedTeam;

  //   try {
  //     const res = await ClassRoomsService.team(classId, teamID);

  //     responseCode = res?.status;
  //     retrievedTeam = res?.data;
  //   } catch (error) {
  //     responseCode = error?.response?.status;
  //   }

  //   switch (responseCode) {
  //     case 200:
  //       setGetTeam(retrievedTeam);
  //       break;
  //     case 404:
  //       navigate(`/classes/${classId}/teams`);
  //       break;
  //     case 500:
  //       navigate('/classes');
  //       break;
  //     default:
  //   }
  // };

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

  const createTeam = async ({ name, description, callbacks }) => {
    setIsCreatingTeam(true);

    let responseCode;
    let retrievedTeam;

    try {
      const res = await ClassRoomsService.createTeam(classId, {
        name,
        description,
      });

      responseCode = res?.status;
      retrievedTeam = res?.data;
    } catch (error) {
      responseCode = error?.response?.status;
    }

    switch (responseCode) {
      case 201:
        await callbacks.created({ retrievedTeam });
        break;
      case 400:
        await callbacks.invalidFields();
        break;
      case 500:
        await callbacks.internalError();
        break;
      default:
    }

    setIsCreatingTeam(false);
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

  const openTeams = async (teamID) => {
    let responseCode;

    try {
      const res = await ClassRoomsService.openTeams(classId, teamID);
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

  const closeTeams = async (teamID) => {
    let responseCode;

    try {
      const res = await ClassRoomsService.closeTeams(classId, teamID);
      responseCode = res?.status;
    } catch (error) {
      responseCode = error?.response?.status;
    }

    switch (responseCode) {
      case 204:
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

  const joinTeam = async (teamID) => {
    let responseCode;

    try {
      const res = await ClassRoomsService.joinTeam(classId, teamID);
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

  const teamMembers = async (teamID) => {
    let responseCode;
    let retrievedMembers;

    try {
      const res = await ClassRoomsService.teamMembers(classId, teamID);
      responseCode = res?.status;
      retrievedMembers = res?.data;
    } catch (error) {
      responseCode = error?.response?.status;
    }

    switch (responseCode) {
      case 200:
        return retrievedMembers;
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
    leaders,
    isRetrieving,
    isRetrievingLeaders,
    isSettingLeader,
    isCreatingTeam,
    openTeams,
    closeTeams,
    joinTeam,
    teamMembers,
    setLeader,
    acceptLeader,
    removeLeader,
    createTeam,
    updateTeam,
    deleteTeam,
  };
};

export default useTeams;
