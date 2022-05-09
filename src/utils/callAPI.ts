import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { getUserConfig, parseUserConfig } from '.';

let token: string;

axios.interceptors.request.use((config) => {
  if (!token) {
    const userConfig = parseUserConfig(getUserConfig());
    token = userConfig.token;
  }
  config.headers = { ...config.headers, Authorization: `Bearer ${token}` };

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default async(config: AxiosRequestConfig) => {
  const { status, data } = await axios({
    ...config
  });
  if (status === 200)
    return data;
};
