import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Animated, Button, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';

import React, { useContext, useEffect, useMemo, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import moment from 'moment';

const Calendar_ = (props) => {

  const navigation = useNavigation();
  const {dayNames, monthNames, proxy} = useContext(AuthContext);
  const [selected, setSelected] = useState('')
  const [ds, setDs] = useState('')
  const isFocused = useIsFocused();
  const nextDay = moment().add(1, 'days').format("YYYY-MM-DD");
  let days = [];
  const marked = {
    // [nextDay]: {selected: true, selectedColor: '#222222', selectedTextColor: 'yellow',}
  }
  const date = ['2023-02-17']

  useEffect(() => {
    getMarked()
  }, [isFocused])

  LocaleConfig.locales['pl'] = {
    dayNames: dayNames,
    monthNames: monthNames
  } 

let test = {}


  const getMarked = async() => {
    const resp = await fetch(`${proxy}/backend/get_calendar/`)
    if(resp.status === 200){
      const data = await resp.json()
      const ar = data.data

      ar.map((date) => {
        days.push(date.date)
      })
      console.log('days:', days)

      days.map((day) => {
        marked[day.toString()] = {
          selected: true,
          selectedColor: '#222222',
          selectedTextColor: 'yellow',
        }
      })

      // days.map((day) => {
      //   marked[`${day}`] = {
      //     customStyles: {
      //       container:{
      //         backgroundColor: 'red'
      //       },
      //       text:{
      //         color:'white'
      //       }
      //     }
      //   }
      //   setDs(marked)
      // })

      console.log('marked:', marked)
    }
  }


  const setDate = (day) => {
    // navigation.navigate('CreateCalendarEvent', {day: day})
    console.log(day)
  }


  return (
    <Calendar 
        onDayPress={(day) =>  setDate(day.dateString)}
        // onDayPress={(day) =>  marked.push(day.dateString)}
        firstDay = { 1 } 
        style={styles.event}
        theme={{
          calendarBackground: 'transparent',
          dayTextColor: 'white',
          textDisabledColor: '#444',
          monthTextColor: 'white'
        }}
        markedDates={marked}
  />
  )
  
}

const styles = StyleSheet.create({
  event:{
    width: 320,
    // height: 50,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#EFA9FD',
    margin: 5,
    padding: 10,
    color: 'white',
    fontSize: 20,
    zIndex: 999,
    backgroundColor: 'transparent'
  }
})

export default Calendar_
