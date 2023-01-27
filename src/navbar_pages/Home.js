import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet, } from 'react-native'
import AllEvents from '../backend_pages/AllEvents'
import { AuthContext } from '../context/AuthContext'
import Login from './Login'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({navigation}) => {

  const [ asyncUserData, setAsyncUserData ] = useState('');
  const [token, setToken] = useState('');
  const {proxy} = useContext(AuthContext);

  useEffect(() => {
    profile()
  }, [])
  
  const profile = async() => {

    let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))

    const resp = await fetch(`${proxy}/users/user/${datas.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await resp.json()
    if(resp === 200){
      console.log(data.token)
      setToken(data.token)
    }

  }

  const getToken = async() => {
    setAsyncUserData(JSON.parse(await AsyncStorage.getItem("asyncUserData")))
  }
    console.log(
      'id:', asyncUserData.id,
      'token:', token
    )

  if(token !== null){

    return (
  
      <View style={styles.container}>
        <AllEvents />
      </View>
  
    )

  } else {
    return(
      <Login />
    )
  }

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    gap: '1rem',
    padding: 20,

  },
  first:{
    backgroundColor: '#9fd3c7',
    width: 250,
    height:50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  second:{
    backgroundColor: '#385170',
    width: 250,
    height:50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  third:{
    backgroundColor: '#142d4c',
    width: 250,
    height:50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
  },
  lineStyle: {
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: "grey",
  },
})

export default Home
