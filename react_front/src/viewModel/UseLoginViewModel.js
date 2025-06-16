import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import LOGIN_QUERY from '../graphql/queries/login.query';
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/user/userSlice';

const useLoginViewModel = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [login, { data, loading, error }] = useLazyQuery(LOGIN_QUERY);
    
    const navigate = useNavigate();
    const [userInfoStorage, setUserInfoStorage] = useLocalStorage('user_info', null);
    const dispatch = useDispatch();

    useEffect(() => {
      console.log(data);  
      var token = ''
      if (data && data.login && data.login.token && data.login.idUser){
        token = data.login.token;
        setUserInfoStorage({token: token, name:username, id: data.login.idUser});
        dispatch(setUser({token: token, name: username, id: data.login.idUser}));
      }
      if (token) 
        navigate("/products"); 
    }, [data]); 

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          
          await login({
            variables: {
              username: username,
              password: password
            }
          });
          
          
        
        } catch (e) {
          console.error("Error during login:", e);
        }
      };

    return {
        username,
        password,
        onUsernameChange: handleUsernameChange,
        onPasswordChange: handlePasswordChange,
        onLogin: handleLogin
    };
};

export default useLoginViewModel;