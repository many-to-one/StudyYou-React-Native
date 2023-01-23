import React, { createContext, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {AsyncStorage} from 'react-native';

export const AuthContext = createContext();

export const login = async(email, password) => {
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
        const username = data.username
        AsyncStorage.setItem('username', username)
    }else{
        alert('Your login or password is incorrect')
    }

}

export const AuthProvider = ({children}) => {
    const [ username, setUsername ] = useState('')

    const User = async() => {
        const user = await AsyncStorage.getItem('username');
        console.log('user:', user)
        setUsername(user)
        
    };
    const {user} = User();
    console.log('user2:', user)

    return(
   
        <AuthContext.Provider value={{username}}>
            {children}
        </AuthContext.Provider>
    )
}