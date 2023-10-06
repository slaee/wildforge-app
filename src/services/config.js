import { isLocal } from '../utils/destination';

let apiUrl = null;
const apiHost = process.env.REACT_LOCAL_HOST ?? '127.0.0.1';
const apiPort = process.env.REACT_LOCAL_HOST_PORT ?? '8000';

if (isLocal) {
  // Development
  apiUrl = `http://${apiHost}:${apiPort}`;
} else {
  // Production
  apiUrl = 'https://api.our.link';
}

const config = {
  API_URL: apiUrl,
};

export default config;
