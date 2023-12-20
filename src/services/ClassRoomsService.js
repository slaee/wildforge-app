import axios from 'axios';
import config from './config';

const BASE_URL = `${config.API_URL}/classes`;

const ClassRoomsService = {
  /// GET /classes
  all: () => axios.get(BASE_URL),

  /// POST /classes
  /*
    data: {
      "course_name": "string",
      "sections": "string",
      "schedule": "string",
      "max_teams_members": 5
    }
  */
  create: (data) => axios.post(BASE_URL, data),

  /// POST /classes/join
  /*
    data: {
      "class_code": "string"
    }
  */
  join: (data) => axios.post(`${BASE_URL}/join`, data),

  /// GET /classes/{id}
  get: (id) => axios.get(`${BASE_URL}/${id}`),

  /// GET /classes/{class_pk}/members/
  members: (classPK) => axios.get(`${BASE_URL}/${classPK}/members`),

  /// PUT /classes/{class_pk}/members/{id}/accept
  accept: (classPK, memberID) =>
    axios.put(`${BASE_URL}/${classPK}/members/${memberID}/accept`),

  /// DELETE /classes/{class_pk}/members/{id}
  delete: (classPK, memberID) =>
    axios.delete(`${BASE_URL}/${classPK}/members/${memberID}`),

  /// PUT /classes/{class_pk}/members/{id}/acceptasleader
  acceptLeader: (classPK, memberID) =>
    axios.put(`${BASE_URL}/${classPK}/members/${memberID}/acceptasleader`),

  /// DELETE /classes/{class_pk}/members/{id}/removeasleader
  removeLeader: (classPK, memberID) =>
    axios.delete(`${BASE_URL}/${classPK}/members/${memberID}/removeasleader`),

  /// PUT /classes/{class_pk}/members/{id}/setleader
  setLeader: (classPK, memberID) =>
    axios.put(`${BASE_URL}/${classPK}/members/${memberID}/setleader`),

  /// GET /classes/{class_pk}/teams
  teams: (classPK) => axios.get(`${BASE_URL}/${classPK}/teams`),

  /// POST /classes/{class_pk}/teams
  /*
    data: {
        "name": "string",
        "description": "string",
        "status": 1
      }
  */
  createTeam: (classPK, data) =>
    axios.post(`${BASE_URL}/${classPK}/teams`, data),

  /// GET /classes/{class_pk}/teams/{id}
  team: (classPK, teamID) =>
    axios.get(`${BASE_URL}/${classPK}/teams/${teamID}`),

  /// PUT /classes/{class_pk}/teams/{id}
  /*
    data: {
        "name": "string",
        "description": "string",
        "status": 1
      }
  */
  updateTeam: (classPK, teamID, data) =>
    axios.put(`${BASE_URL}/${classPK}/teams/${teamID}`, data),

  /// DELETE /classes/{class_pk}/teams/{id}
  deleteTeam: (classPK, teamID) =>
    axios.delete(`${BASE_URL}/${classPK}/teams/${teamID}`),

  /// PUT /classes/{class_pk}/teams/{id}/close
  closeTeams: (classPK, teamID) =>
    axios.put(`${BASE_URL}/${classPK}/teams/${teamID}/close`),

  /// PUT /classes/{class_pk}/teams/{id}/open
  openTeams: (classPK, teamID) =>
    axios.put(`${BASE_URL}/${classPK}/teams/${teamID}/open`),

  /// POST /classes/{class_pk}/teams/{id}/join
  joinTeam: (classPK, teamID) =>
    axios.post(`${BASE_URL}/${classPK}/teams/${teamID}/join`),

  /// GET /classes/{class_pk}/teams/{id}/members
  teamMembers: (classPK, teamID) =>
    axios.get(`${BASE_URL}/${classPK}/teams/${teamID}/members`),

  /// PUT /classes/{class_pk}/teams/{team_pk}/members/{id}/accept
  acceptTeamMember: (classPK, teamPK, memberID) =>
    axios.put(
      `${BASE_URL}/${classPK}/teams/${teamPK}/members/${memberID}/accept`
    ),

  /// DELETE /classes/{class_pk}/teams/{team_pk}/members/{id}/leave
  leaveTeam: (classPK, teamPK, memberID) =>
    axios.delete(
      `${BASE_URL}/${classPK}/teams/${teamPK}/members/${memberID}/leave`
    ),

  /// DELETE /classes/{class_pk}/teams/{team_pk}/members/{id}/remove
  removeTeamMember: (classPK, teamPK, memberID) =>
    axios.delete(
      `${BASE_URL}/${classPK}/teams/${teamPK}/members/${memberID}/remove`
    ),

  /// GET /classes/{id}/evals
  evals: (id) => axios.get(`${BASE_URL}/${id}/evals`),
};

export default ClassRoomsService;
