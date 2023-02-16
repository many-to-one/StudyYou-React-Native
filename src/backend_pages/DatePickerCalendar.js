import moment from 'moment';
import React, { useEffect, useState } from 'react'
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';

const DatePickerCalendar = () => {



  // ##################### ALL YEAR - DAYS #####################  //

  // const calendar = [];
  // const today = moment();
  // const startDay = today.clone().startOf('year').startOf('month');
  // const endDay = today.clone().endOf('year').endOf('month');
  
  // let date = startDay.clone().subtract(1, 'day');
  
  // while (date.isBefore(endDay, 'day')) 
  //     calendar.push({
  //         days: Array(7).fill(0).map(() => date.add(1, 'day').clone())
  //     });

  // console.log('calendar:', calendar) //[52].days[0]._d

  // let year = []
  // for (let w=0; w < 53; w++){
  //   for (let d = 0; d <= 6; d++) {
  //     year.push(calendar[w].days[d]._d)
  //         if(w === 52){
  //           break;
  //         }
  //   }
  // }
  // console.log('year', year)
  

// useEffect(() => {
//   year.forEach((e) => console.log('e:', e.toString().slice(3, 7)))
// })

// ############## END-END-END-END-END-END-END ##############  //






// ############## CURRENT YEAR - MONTH - DAYS ##############  //


const year = moment().format('YYYY');
const month = moment().format('MM'); 
const monthName = moment().format('MMMM').toString();
const daysOfMonth = []

const days = moment(`${year}-${month}`, "YYYY-MM").daysInMonth()
for (let i=1; i<=days; i++){
daysOfMonth.push(i.toString())
}

console.log('daysOfMonth:', daysOfMonth)
const next = moment().add(1, 'month').calendar()
const previouse = moment().subtract(1, 'month').calendar();

console.log(moment().add(1, 'month').calendar())

  
// ############## END-END-END-END-END-END-END ##############  //


  return (

    // <View>
    //   {daysOfMonth.map((d) => {
    //     <Text>{d.toString()}</Text>
    //   })}
    // </View>

    <View style={styles.container}>
      <Text style={styles.text}>{monthName}</Text>
      <View style={styles.list}>
          {daysOfMonth.map((e) => (
            <View style={styles.date}>
              <Text style={styles.text}>{e.toString().slice(0, 10)}</Text>
            </View>
          ))}
      </View>
    </View>
    // <View>
    //   <FlatList 
    //   style={styles.list}
    //   data={daysOfMonth}
    //   renderItem={({item}) => 
    //   <View style={styles.container}>
    //     <View style={styles.date}>
    //       <Text style={styles.text}>{item}</Text>
    //     </View>
    //   </View>
    // } 
    //    horizontal
    //   /> 
    // </View>

    // <View >
    //   <View >
        // <View >
        //   {daysOfMonth.forEach(d => (
        //     <Text style={styles.text}>{d}</Text>
        //   ))}
        // </View> 
      // </View> 
    // </View>

  )
}

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 300,
    gap: 10,
  },
  container:{
      flexDirection: 'column',
      alignItems: 'center',
      // gap: '1rem',
      // padding: 25,
      // backgroundColor: 'transparent',
    },
  date: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    // borderWidth: 1,
    // borderRadius: 40,
    // borderColor: 'gray'
  },
  text: {
    color: 'white'
  },
})

export default DatePickerCalendar
