import axios from 'axios';
import dayjs from 'dayjs';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const baseURL = 'http://127.0.0.1:8000';

const useAxios = () => {
  const {authTokens, setUser, setAuthTokens} = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL,
    headers:{
      Authorization: `Bearer ${authTokens?.access_token}`,
      'Content-Type':'application/json',
    }
  });


  axiosInstance.interceptors.request.use(async req => {
    const user = authTokens;
    const isExpired = dayjs().add(user.expires_in, 'second').diff(dayjs()) < 1;

    if (!isExpired) return req;

    const response = await axios.post(`${baseURL}/api/auth/refresh/`, {},{
      headers:{
        Authorization: `Bearer ${authTokens?.access_token}`,
        'Content-Type':'application/json',
      }
    });

    localStorage.setItem('authTokens', JSON.stringify(response.data));

    setAuthTokens(response.data);
    setUser(response.data.user);

    req.headers.Authorization = `Bearer ${response.data.access_token}`;
    return req;
  })

  return axiosInstance;
}

export default useAxios;