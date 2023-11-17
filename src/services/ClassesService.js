import axios from 'axios';
import config from './config';

const BASE_URL = `${config.API_URL}/classes`;

const instance = axios.create();

const ClassesService = {
  list: () => instance.get(BASE_URL),
  create: (data) => instance.post(BASE_URL, data),
  join: (data) => instance.post(`${BASE_URL}/join`, data),
  retrieve: (id) => instance.get(`${BASE_URL}/${id}`),
  retrieveMembers: (id) => instance.get(`${BASE_URL}/${id}/members`),
  accept: (classPK, memberID) =>
    instance.put(`${BASE_URL}/${classPK}/members/${memberID}/accept`),
  delete: (classPK, memberID) =>
    instance.delete(`${BASE_URL}/${classPK}/members/${memberID}`),
  acceptLeader: (classPK, memberID) =>
    instance.put(`${BASE_URL}/${classPK}/members/${memberID}/acceptasleader`),
  setLeader: (classPK, memberID) =>
    instance.post(`${BASE_URL}/${classPK}/members/${memberID}/setleader`),
  retrieveTeamLeaders: (classPK) =>
    instance.get(`${BASE_URL}/${classPK}/teamleaders`),
};

export default ClassesService;
