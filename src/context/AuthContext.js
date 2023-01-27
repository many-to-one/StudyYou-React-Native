// import {AsyncStorage} from 'react-native';
import React, { createContext, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [userData, setUserData] = useState({});
    const [token, setToken] = useState('');
    const [allUserInfo, setAllUserInfo] = useState([]);
    const proxy = "http://127.0.0.1:8000"

    const register = async (username ,email, password) => {

        const response = await fetch(`${proxy}/users/register/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                username: username,
                email: email,
                password: password,
            })
          });
    
          const data = await response.json()
          console.log(data)
          if(response.status === 201) {
            return '201';
          }else{
            alert('The data you provided is incorrect, please try again')
          }
    };

    const login = async(email, password) => {

        const resp = await fetch(`${proxy}/users/login/`, {
          method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
              email: email,
              password: password,
          })
        });
        const data = await resp.json()
        if (resp.status === 200){
            console.log('data:', data.jwt)
            const setasynctoken = await AsyncStorage.setItem("asyncUserData", JSON.stringify(data));
            setUserData(data)
            setToken(data.jwt)
            console.log('token:', token)
            return '200';
        }else{
            alert('Your login or password is incorrect')
            return '404';
        }

    };



    const logout = async() => {

        const resp = await fetch(`${proxy}/users/logout/${userData.id}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

        });
        const data = await resp.json();
        navigation.navigate('Login');
        return '205';
    };


    const getToken = async() => {
      setAllUserInfo(JSON.parse(await AsyncStorage.getItem("asyncUserData")))
    }


    return(
   
        <AuthContext.Provider value={{
            register,
            login,
            logout,
            userData,
            proxy,
            token,
            allUserInfo,
        }}>
            {children}
        </AuthContext.Provider>
    )
}