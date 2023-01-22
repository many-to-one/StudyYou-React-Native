import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import Event from '../backend_pages/Event'

const Home = () => {

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
    </View>
  )
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
  }
})

export default Home
