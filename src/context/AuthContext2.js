import React, { createContext, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        const jwt = data.jwt
        AsyncStorage.setItem('username', username)
        AsyncStorage.setItem('jwt', jwt)
        AsyncStorage.setItem('id', data.id)
        console.log('jwt:', jwt)
        return '200';
    }else{
        alert('Your login or password is incorrect')
        return '404';
    }

}


export const logout = async() => {

    const id = await AsyncStorage.getItem('id')

    const resp = await fetch(`http://127.0.0.1:8000/users/logout/${id}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        
    });
    const data = await resp.json();
    if (resp.status === 205){
        console.log('dataL:', data)
    }
    console.log('dataL:', data)
    await AsyncStorage.removeItem('username');
    await AsyncStorage.removeItem('jwt');
    navigation.navigate('Login');
}


export const AuthProvider = ({children}) => {
    const [ username, setUsername ] = useState('')

    const User = async() => {
        const user = await AsyncStorage.getItem('username');
        console.log('user:', user)
        setUsername(user)
        
    };
    const user = User();

    return(
   
        <AuthContext.Provider value={{username}}>
            {children}
        </AuthContext.Provider>
    )
}