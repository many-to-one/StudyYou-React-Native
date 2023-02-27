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
import BackButton from '../buttons/BackButton';
import Service from './Service';

const CreateCalendarEvent = ({route, navigation}) => {

  const {day} = route.params;

    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>

        <View style={styles.event}>
          <Icon 
            name="people-sharp" 
            size={30} 
            color={'#78D7D9'} 
            onPress={() => navigation.navigate('Service', {day: day})}     
          />
          <Text style={styles.text}>Meeting's stuff</Text>
        </View>

        <View style={styles.event}>
          <Icon 
            name="people-circle-outline" 
            size={30} 
            color={'#78D7D9'} 
            onPress={() => navigation.navigate('Ministries', {day: day})}     
          />
          <Text style={styles.text}>Ministry leaders</Text>
        </View>

        <View style={styles.event}>
          <Icon 
            name="reader" 
            size={30} 
            color={'#78D7D9'} 
            onPress={() => navigation.navigate('MiddleOfTheWeek', {day: day})}     
          />
          <Text style={styles.text}>MiddleOfTheWeek</Text>
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
    // flex: 1,
    backgroundColor: 'black',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
    paddingTop: 25,
  },
  text: {
    color: '#78D7D9',
    fontSize: 10,
    marginTop: 50,
  },
  event:{
    justifyContent: 'center',
    alignItems: 'center',
    width: 140,
    height: 140,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#78D7D9',
    margin: 5,
    padding: 10,
    // color: 'white',
    // fontSize: 20,
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
