import axios from 'axios';
import config from './config';

const BASE_URL = `${config.API_URL}/classes`;

const instance = axios.create();

const ClassesService = {
  list: () => axios.get(BASE_URL),
  create: (data) => axios.post(BASE_URL, data),
  retrieve: (id) => axios.get(`${BASE_URL}/${id}`),
  retrieveMembers: (id) => axios.get(`${BASE_URL}/${id}/members`),
};

export default ClassesService;
