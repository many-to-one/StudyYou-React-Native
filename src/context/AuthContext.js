// import {AsyncStorage} from 'react-native';
import React, { createContext, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [userData, setUserData] = useState({});
    const [token, setToken] = useState('');
    const [profileToken, setProfileToken] = useState('')
    const [logged, setLogged] = useState(false)
    const proxy = "http://127.0.0.1:8000"

    const congr = async() => {
        return JSON.parse(await AsyncStorage.getItem("asyncUserData"))
    }

    const register = async (username ,email, password, congregation, language) => {

        const response = await fetch(`${proxy}/users/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                username: username,
                email: email,
                password: password,
                congregation: congregation,
                language: language,
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

    const login = async(email, password, congregation) => {

        const resp = await fetch(`${proxy}/users/login/`, {
          method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
              email: email,
              password: password,
              congregation: congregation,
          })
        });
        const data = await resp.json()
        if (resp.status === 200){
            console.log('data:', data.jwt)
            console.log('data:', data.congregation)
            const setasynctoken = await AsyncStorage.setItem("asyncUserData", JSON.stringify(data));
            setUserData(data)
            setToken(data.jwt)
            return '200';
        }else{
            alert('Your login or password is incorrect')
            return '404';
        }

    };


    const profile = async() => {

        let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
            const resp = await fetch(`${proxy}/users/user/${datas.id}/`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json'
                }
              });
              const data = await resp.json()
              if(resp === 200){
                console.log(data)
                setProfileToken(data.token)
                setLogged(true)
              }
              return data
        }

    const passwordResetService = async(uidb64, token) => {
        const resp =  await fetch(`${proxy}/users/password-reset/${uidb64}/${token}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await resp.json()
        console.log('passwordResetService:', data)
        await logout()
        return data
    }


    const logout = async() => {

        let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
        const resp = await fetch(`${proxy}/users/logout/${datas.id}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

        });
        const data = await resp.json();
        await AsyncStorage.removeItem("asyncUserData")
        navigation.navigate('Login');
        return '205';
    };


    return(
   
        <AuthContext.Provider value={{
            register,
            login,
            logout,
            userData,
            proxy,
            token,
            profile,
            profileToken,
            logged,
            passwordResetService,
            congr,
        }}>
            {children}
        </AuthContext.Provider>
    )
}