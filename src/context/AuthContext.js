import React, { createContext, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [userData, setUserData] = useState({})

    const register = async (username ,email, password) => {

        const response = await fetch("http://127.0.0.1:8000/users/register/", {
            method: 'POST',
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

        const resp = await fetch("http://127.0.0.1:8000/users/login/", {
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
            console.log('data:', data)
            setUserData(data)
            // const jwt = data.jwt
            // AsyncStorage.setItem('username', username)
            // AsyncStorage.setItem('jwt', jwt)
            // AsyncStorage.setItem('id', data.id)
            // console.log('jwt:', jwt)
            return '200';
        }else{
            alert('Your login or password is incorrect')
            return '404';
        }

    };


    const logout = async() => {

        // const id = await AsyncStorage.getItem('id')

        const resp = await fetch(`http://127.0.0.1:8000/users/logout/${userData.id}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

        });
        const data = await resp.json();
        // if (resp.status === 205){
        // }
        navigation.navigate('Login');
        return '205';
    };

    return(
   
        <AuthContext.Provider value={{
            register,
            login,
            logout,
            userData,
        }}>
            {children}
        </AuthContext.Provider>
    )
}