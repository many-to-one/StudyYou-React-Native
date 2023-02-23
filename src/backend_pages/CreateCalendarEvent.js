import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import { AuthContext } from '../context/AuthContext';
import { MultipleSelectList  } from 'react-native-dropdown-select-list';
import Icon from "react-native-vector-icons/Ionicons";
import { useIsFocused } from '@react-navigation/native';
import Microphones from '../backend_pages/Microphones';
import Music from '../backend_pages/Music';
import Duty from './Duty';

const CreateCalendarEvent = ({route, navigation}) => {

  const {day} = route.params;

    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
        <Text style={styles.text}>Microphones</Text>
        <View style={styles.event}>
          <Microphones  day={day}/>
        </View>
        <Text style={styles.text}>Music</Text>
        <View style={styles.event}>
          <Music  day={day}/>
        </View>
        <Text style={styles.text}>Duty</Text>
        <View style={styles.event}>
          <Duty  day={day}/>
        </View>
      </View>
      </ScrollView>
    )
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  scroll: {
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 25,
    paddingTop: 25,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  event:{
    width: 320,
    // borderRadius: 10,
    // borderWidth: 2,
    // borderColor: '#78D7D9',
    margin: 5,
    padding: 10,
    color: 'white',
    fontSize: 20,
    zIndex: 999,
    backgroundColor: "transparent",
  },
  input:{
    width: 230,
    height: 50,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#78D7D9',
    margin: 5,
    padding: 10,
    color: 'white',
    fontSize: 20,
    zIndex: 999,
    backgroundColor: "#a6a6a6"
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 320,
    height: 50,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#78F5FA',
    margin: 5,
    padding: 10,
    backgroundColor: '#F9F9B5',
    // color: 'white',
    // fontSize: 20,
    zIndex: 999,
},    
})

export default CreateCalendarEvent
