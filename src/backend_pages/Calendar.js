import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Animated, Button, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';

import React, { useContext, useEffect, useMemo, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { useIsFocused, useNavigation } from '@react-navigation/native';

const Calendar_ = (props) => {

  const navigation = useNavigation();
  const {dayNames, monthNames, proxy} = useContext(AuthContext);
  const [selected, setSelected] = useState('')
  const [ds, setDs] = useState('')
  const isFocused = useIsFocused();
  let days = [];
  const marked = {}



  useEffect(() => {
    getMarked()
    console.log('ds:', ds)
  }, [isFocused])

  LocaleConfig.locales['pl'] = {
    dayNames: dayNames,
    monthNames: monthNames
  } 
  
  let test = {
    '2023-02-05': {
      selected: true,
      selectedColor: '#222222',
      selectedTextColor: 'yellow',
    }
  }


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
        marked[`'${day}'`] = {
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
      console.log('selected:', marked)
    }
  }


  const setDate = (day) => {
    navigation.navigate('CreateCalendarEvent', {day: day})
  }


  if(selected !== null){
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
          markedDates={selected}
    />
    )
  }else{
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
          markedDates={test}
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
