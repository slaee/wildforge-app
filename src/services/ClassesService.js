import axios from 'axios';
import config from './config';

const BASE_URL = `${config.API_URL}/classes`;

const ClassesService = {
  list: () => axios.get(BASE_URL),
  create: (data) => axios.post(BASE_URL, data),
  join: (data) => axios.post(`${BASE_URL}/join`, data),
  retrieve: (id) => axios.get(`${BASE_URL}/${id}`),
  retrieveMembers: (id) => axios.get(`${BASE_URL}/${id}/members`),
  accept: (classPK, memberID) =>
    axios.put(`${BASE_URL}/${classPK}/members/${memberID}/accept`),
  delete: (classPK, memberID) =>
    axios.delete(`${BASE_URL}/${classPK}/members/${memberID}`),
  acceptLeader: (classPK, memberID) =>
    axios.put(`${BASE_URL}/${classPK}/members/${memberID}/acceptasleader`),
  setLeader: (classPK, memberID) =>
    axios.post(`${BASE_URL}/${classPK}/members/${memberID}/setleader`),
  retrieveTeamLeaders: (classPK) =>
    axios.get(`${BASE_URL}/${classPK}/teamleaders`),
};

export default ClassesService;
