import moment from 'moment';
import React, { useEffect, useState } from 'react'
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';

const DatePickerCalendar = () => {

  const calendar = [];
  const today = moment();
  const startDay = today.clone().startOf('year').startOf('month');
  const endDay = today.clone().endOf('year').endOf('month');
  
  let date = startDay.clone().subtract(1, 'day');
  
  while (date.isBefore(endDay, 'day')) 
      calendar.push({
          days: Array(7).fill(0).map(() => date.add(1, 'day').clone())
      });

  console.log('calendar:', calendar) //[52].days[0]._d

  let year = []
  for (let w=0; w < 53; w++){
    for (let d = 0; d <= 6; d++) {
      year.push(calendar[w].days[d]._d)
          if(w === 52){
            break;
          }
        // console.log('cal:', cal[0])
    }
}

useEffect(() => {
  year.forEach((e) => console.log('e:', e.toString().slice(0, 10)))
})

  
  console.log('cal:', year)

  return (

    // <View>
    //   {cal.map((e) => (
    //     <Text>{e.toString().slice(0, 10)}</Text>
    //   ))}
    // </View>

    <View>
      <FlatList 
      data={year}
      renderItem={({item}) => <Text>{item.toString().slice(0, 10)}</Text>}
      horizontal
      />
    </View>

  )
}

const styles = StyleSheet.create({
  container:{
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem',
      padding: 20,
      backgroundColor: 'black'
    },
})

export default DatePickerCalendar
