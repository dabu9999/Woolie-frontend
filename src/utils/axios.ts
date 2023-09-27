import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production' ? '' : 'http:/localhost:7070';

const axiosInstance = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

// axiosInstance.interceptors.request.use(
//   function (config) {
//     config.headers.Authorization = 'Bearer ' + localStorage.getItem('accessToken');
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   },
// );

// axiosInstance.interceptors.response.use(
//   function (response) {
//     if (response.data === 'jwt expired' || response.data === 'jwt malformed') {
//       localStorage.removeItem('accessToken');
//       window.alert('로그인 세션이 만료되었습니다.');
//       return Promise.reject(response.data);
//     }
//     return response;
//   },
//   function (error) {
//     if (error.response.data === 'jwt expired') {
//       window.location.reload();
//     }
//     return Promise.reject(error);
//   },
// );

export default axiosInstance;
