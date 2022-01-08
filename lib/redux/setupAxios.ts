import { refresh } from './auth/authSlice';
import axios from 'axios';
import { AppStore } from './store';

export default function setupAxios(store: AppStore) {
  axios.interceptors.request.use(
    (config) => {
      const {
        auth: { accessToken },
      } = store.getState();

      if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    (error) => Promise.reject(error),
  );

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        const {
          auth: { accessToken, refreshToken },
        } = store.getState();
        console.log(accessToken);
        if (accessToken) {
          return axios
            .post('/api/auth/refresh', { accessToken, refreshToken })
            .then(({ data: { accessToken, refreshToken } }) => {
              store.dispatch(refresh({ accessToken, refreshToken }));
              return axios(error.config);
            });
        }
      }
      return Promise.reject(error);
    },
  );
}
