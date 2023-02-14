// import {AsyncStorage} from 'react-native';
import React, { createContext, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [userData, setUserData] = useState({});
    const [token, setToken] = useState('');
    const [profileToken, setProfileToken] = useState('')
    const [logged, setLogged] = useState(false)
    const [Hours, setHours] = useState('')
    const [Minutes, setMinutes] = useState('')
    const [Visits, setVisits] = useState('')
    const [Publications, setPublications] = useState('')
    const [Films, setFilms] = useState('')
    const [Menu_, setMenu] = useState('')
    const [Events_, setEvents] = useState('')
    const [Profile_, setProfile] = useState('')
    const [Timer_, setTimer] = useState('')
    const [Result_, setResult] = useState('')
    const [History_, setHistory] = useState('')
    const [AddEvent_, setAddEvent] = useState('')
    const [UpdateEvent_, setUpdateEvent] = useState('')
    const [AllEvents_, setAllEvents] = useState('')
    const [Logout_, setLogout] = useState('')
    const [Changepassword_, setChangepassword] = useState('')
    const proxy = "http://127.0.0.1:8000"


    const setLanguage = async() => {
        let lng = await AsyncStorage.getItem('language')
        if(lng === 'PL'){
            setHours('Godziny')
            setMinutes('Minuty')
            setVisits('Odwiedziny')
            setPublications('Publikacje')
            setFilms('Filmy')
            setMenu('Menu')
            setEvents('Wydarzenia')
            setProfile('Profil')
            setTimer('Tajmer')
            setResult('Wynik')
            setHistory('Historia')
            setAddEvent('Nowe Wydarzenia')
            setUpdateEvent('Edytuj wydarzenie')
            setAllEvents('Wszystkie wydarzenia')
            setLogout('Wyłoguj')
            setChangepassword('Zmienić hasło')
        }else if(lng === 'RU'){
            setHours('Часы')
            setMinutes('Минуты')
            setVisits('Повторы')
            setPublications('Публикации')
            setFilms('Фильмы')
            setMenu('Меню')
            setEvents('События')
            setProfile('Профиль')
            setTimer('Таймер')
            setResult('Результат')
            setHistory('История')
            setAddEvent('Новое событие')
            setUpdateEvent('Редактировать событие')
            setAllEvents('Все события')
            setLogout('Выйти')
            setChangepassword('Изменить пароль')
        }else if(lng === 'UA'){
            setHours('Години')
            setMinutes('Хвилини')
            setVisits('Повтори')
            setPublications('Публiкацiї')
            setFilms('Фiльми')
            setMenu('Меню')
            setEvents('Подiї')
            setProfile('Профiль')
            setTimer('Таймер')
            setResult('Результат')
            setHistory('Iсторiя')
            setAddEvent('Нова подiя')
            setUpdateEvent('Редагувати подiю')
            setAllEvents('Усi подiї')
            setLogout('Вийти')
            setChangepassword('Змiнити гасло')
        }
      };



    const register = async (username ,email, password) => {

        const response = await fetch(`${proxy}/users/register/`, {
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

    
    const marked = (day) => {
        let data = {}
        data[day] = {
            selected: true,
            selectedColor: '#222222',
            selectedTextColor: 'yellow',
          }
        return data
    }


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
            setLanguage,
            Hours,
            Minutes,
            Visits,
            Publications,
            Films,
            Menu_,
            Events_,
            Profile_,
            Timer_,
            Result_,
            History_,
            AddEvent_,
            UpdateEvent_,
            AllEvents_,
            Logout_,
            Changepassword_,
            marked,
        }}>
            {children}
        </AuthContext.Provider>
    )
}