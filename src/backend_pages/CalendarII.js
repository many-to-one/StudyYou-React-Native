import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Animated, Button, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';

import React, { useContext, useEffect, useMemo, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import moment from 'moment';

const CalendarII = () => {
    const marked = {}
    const [date, setDate] = useState([])
    const mDay = ''

    const setMarked = (e) => {
        console.log(e)
        const marked = {
            [e] : {selected: true, selectedColor: '#222222', selectedTextColor: 'yellow',}
        }
        console.log(marked)
    }

    

    return (
        <Calendar 
            // onDayPress={(day) =>  setDate(day.dateString)}
            onDayPress={(day) =>  setMarked(day.dateString)}
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

export default CalendarII
