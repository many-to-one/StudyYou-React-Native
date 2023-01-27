import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import AllEvents from '../backend_pages/AllEvents'
import { AuthContext } from '../context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './Login'

const Home = ({navigation}) => {

  const { proxy } = useContext(AuthContext);
  const [profileToken, setProfileToken] = useState('')
  let datas;

  useEffect(() => {
    profile()
  }, [])

  const profile = async() => {

    let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
    console.log('datas:', datas)
    if(datas === null){
      navigation.navigate('Login')
    }else{
      const resp = await fetch(`${proxy}/users/user/${datas.id}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await resp.json()
      if(data){
        console.log('data:', data)
        setProfileToken(data.token)
      }
    }

  }

  if(profileToken){

    return (
  
      <SafeAreaView  style={styles.container}>
         <ScrollView>
            <AllEvents />
          </ScrollView>
      </SafeAreaView >
  
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