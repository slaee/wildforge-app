import { isLocal } from '../utils/destination';

let apiUrl = null;
const apiHost = process.env.BACKEND_CONTAINER_HOST ?? '127.0.0.1';
const apiPort = process.env.BACKEND_CONTAINER_PORT ?? '8000';

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
