import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const { REACT_APP_BACKEND_API } = process.env;
const baseURL = REACT_APP_BACKEND_API;

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) => {
  let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ?
    JSON.parse(localStorage.getItem('authTokens')) : null);
  let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ?
    localStorage.getItem('authTokens.user') : null);
  let [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  let loginUser = async (e) => {
    let response = await fetch(`${baseURL}/api/auth/login/`, {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({'username':e.username, 'password':e.password})
    });
    let data = await response.json();
    console.log(data);

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(data.user);
      localStorage.setItem('authTokens', JSON.stringify(data));
      navigate('/');
    } else {
      alert(data.message);
    }
  };

  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
    navigate('/login');
  };

  let contextData = {
    user:user,
    authTokens:authTokens,
    setAuthTokens:setAuthTokens,
    setUser:setUser,
    loginUser:loginUser,
    logoutUser:logoutUser,
  };

  useEffect(()=> {
    if (authTokens){
      setUser(authTokens.user);
    }
    setLoading(false);
  }, [authTokens, loading]);

  return(
    <AuthContext.Provider value={contextData} >
      {loading ? null : children}
    </AuthContext.Provider>
  );
}