import { Calendar } from 'react-native-calendars';
import { Animated, Button, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';

import React, { useContext, useMemo, useState } from 'react'
import { AuthContext } from '../context/AuthContext';

const Calendar_ = (props) => {

  const [selected, setSelected] = useState(null);
  const {marked} = useContext(AuthContext);

  // const marked = {
  //   '2023-02-20':{
  //     selected: true,
  //     selectedColor: '#222222',
  //     selectedTextColor: 'yellow',
  //   }
  // }

  // const marked = useMemo(() => ({
  //   [selected]: {
  //     selected: true,
  //     selectedColor: '#222222',
  //     selectedTextColor: 'yellow',
  //   }
  // }), [selected]);
  
  const getMarked = (day) => {
    marked(day)
    // setSelected(day)
    console.log('marked:', marked)
    // return marked
  }

  return (
    <Calendar 
        onDayPress={(day) => getMarked(day.dateString)}
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
