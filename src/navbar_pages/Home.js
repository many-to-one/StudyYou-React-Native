import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, Alert } from 'react-native'
import AuthButton from '../buttons/AuthButton'
import { AuthContext } from '../context/AuthContext'
import Login from './Login'
import Menu from './Menu'

const Home = ({navigation}) => {

  const {logout, userData } = useContext(AuthContext);

  let token = userData.jwt

  const openAlert=()=>{
    alert('Please login');
    navigation.navigate('Login')
  }

  if(token){

    return (

      // <View>
      //     <Image source={
      //       require('../../assets/main.png')
      //       }
      //       />
      // </View>
  
        <View style={styles.container}>
  
        <View style={styles.first}>
          <Text style={styles.text}>First block</Text>
        </View>
  
        <View style={styles.second}>
          <Text style={styles.text}>Second block</Text>
        </View>
  
        <View style={styles.third}>
          <Text style={styles.text}>Third block</Text>
        </View>
  
        <AuthButton 
        title={'Logout'} 
        onPress={() =>  logout()}
        />
  
        <View style={styles.menuStyle}>
  
          <View style={styles.lineStyle}></View>
  
          <View
            style={[
              styles.lineStyle,
              {
                marginVertical: 10,
              },
            ]}>    
          </View>
  
        </View>
  
      </View>
  
    )

  } else {
    useEffect(() => {
      openAlert()
    })
    return(
      <Login />
    )
  }

}

const styles = StyleSheet.create({

  container:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
