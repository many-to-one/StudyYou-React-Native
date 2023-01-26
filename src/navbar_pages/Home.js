import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet, } from 'react-native'
import AllEvents from '../backend_pages/AllEvents'
import { AuthContext } from '../context/AuthContext'
import Login from './Login'

const Home = ({navigation}) => {

  const { Token } = useContext(AuthContext);
  console.log('tokenHome:', Token)

  const openAlert=()=>{
    alert('Please login');
    navigation.navigate('Login')
  }

  if(Token){

    return (
  
      <View style={styles.container}>
        <AllEvents />
      </View>
  
    )

  } else {
    // useEffect(() => {
    //   openAlert()
    // }, [])
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
