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
  let days = [];
  const marked = {}
  const date = ['2023-02-17']

  useEffect(() => {
    getMarked()
    console.log('test:', test)
  }, [isFocused])

  LocaleConfig.locales['pl'] = {
    dayNames: dayNames,
    monthNames: monthNames
  } 
  
  let test = {
    '2023-02-05' : {
      selected: true,
      selectedColor: '#222222',
      selectedTextColor: 'yellow',
    }
  }

  const nextDays = {
    '2023-02-01': {selected: true, selectedColor: '#222222', selectedTextColor: 'yellow',},
    '2023-02-05': {selected: true, selectedColor: '#222222', selectedTextColor: 'yellow',},
    '2023-02-08': {selected: true, selectedColor: '#222222', selectedTextColor: 'yellow',},
    '2023-02-07': {selected: true, selectedColor: '#222222', selectedTextColor: 'yellow',},
    '2023-02-18': {selected: true, selectedColor: '#222222', selectedTextColor: 'yellow',},
    '2023-02-17': {selected: true, selectedColor: '#222222', selectedTextColor: 'yellow',},
    '2023-02-28': {selected: true, selectedColor: '#222222', selectedTextColor: 'yellow',},
    '2023-02-29': {selected: true, selectedColor: '#222222', selectedTextColor: 'yellow',},
};


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
        marked[day] = {
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

      console.log('marked:', marked[0])
    }
  }


  const setDate = (day) => {
    navigation.navigate('CreateCalendarEvent', {day: day})
  }


  if(marked === null){
    return (
      <Calendar 
          onDayPress={(day) =>  setDate(day.dateString)}
          firstDay = { 1 } 
          style={styles.event}
          theme={{
            calendarBackground: 'transparent',
            dayTextColor: 'white',
            textDisabledColor: '#444',
            monthTextColor: 'white'
          }}
          markedDates={nextDays}
    />
    )
  }else{
    return (
      <Calendar 
          initialDate="2022-12-01"
          onDayPress={(day) =>  setDate(day.dateString)}
          firstDay = { 1 } 
          style={styles.event}
          theme={{
            calendarBackground: 'transparent',
            dayTextColor: 'white',
            textDisabledColor: '#444',
            monthTextColor: 'white'
          }}
          markedDates={{
          [date]: { selected: true, marked: true, selectedColor: 'blue' },
        }}
    />
    )
  }

  
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
