import moment from 'moment';
import React, { useEffect, useState } from 'react'
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';

const DatePickerCalendar = () => {



  // ##################### ALL YEAR - DAYS #####################  //

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

  let year_ = []
  let Mon = []
  let Tue = []
  let Wed = []
  let Thu = []
  let Fri = []
  let Sat = []
  let Sun = []
  for (let w=0; w < 53; w++){
    for (let d = 0; d <= 6; d++) {
      year_.push(calendar[w].days[d]._d)
          if(w === 52){
            break;
          }else if(calendar[w].days[d]._d.toString().slice(0, 3) === 'Mon'){
            Mon.push(calendar[w].days[d]._d)
          }else if(calendar[w].days[d]._d.toString().slice(0, 3) === 'Tue'){
            Tue.push(calendar[w].days[d]._d)
          }else if(calendar[w].days[d]._d.toString().slice(0, 3) === 'Wed'){
            Wed.push(calendar[w].days[d]._d)
          }else if(calendar[w].days[d]._d.toString().slice(0, 3) === 'Thu'){
            Thu.push(calendar[w].days[d]._d)
          }else if(calendar[w].days[d]._d.toString().slice(0, 3) === 'Fri'){
            Fri.push(calendar[w].days[d]._d)
          }else if(calendar[w].days[d]._d.toString().slice(0, 3) === 'Sat'){
            Sat.push(calendar[w].days[d]._d)
          }else if(calendar[w].days[d]._d.toString().slice(0, 3) === 'Sun'){
            Sun.push(calendar[w].days[d]._d)
          }
    }
  }

  for(let i=0; i<6; i++){
    year_.unshift('')
  }

  console.log('year', year_)
  console.log('Mon:', Mon)
  const Feb = []

    for (let i = 0; i < Mon.length; i++) {
      if(Mon[i].toString().slice(4, 7) == moment().format('MMM').toString()){
        // console.log(Mon[i].toString().slice(0, 7));
        Feb.push(Mon[i].toString().slice(8, 10))
      }
  }
  console.log('Feb:', Feb)

  for(let i=0; i<year_.length; i++){
    console.log(year_[i].toString().slice(4,7))
  }


  

// useEffect(() => {
//   year.forEach((e) => console.log('e:', e.toString().slice(3, 7)))
// })

// ############## END-END-END-END-END-END-END ##############  //






// ############## CURRENT YEAR - MONTH - DAYS ##############  //


const year = moment().format('YYYY');
const month = moment().format('MM'); 
const monthName = moment().format('MMMM').toString();
const daysOfMonth = []
const daysOfWeekSun = [0, 1, 2, 3, 4, 5, 6]
const daysOfWeekMon = [1, 2, 3, 4, 5, 6, 7]

const days = moment(`${year}-${month}`, "YYYY-MM").daysInMonth()
for (let i=1; i<=days; i++){
daysOfMonth.push(i)
}

console.log('daysOfMonth:', daysOfMonth)
const next = moment().add(1, 'month').calendar()
const previouse = moment().subtract(1, 'month').calendar();

console.log('next', next)

for(let i = 1; i<=daysOfMonth.length; i++){
  console.log(':', moment().day(i).toString()) //moment().weekday(i).toString().slice(0, 3), 
}

console.log(moment("2023-02", "YYYY-MM").daysInMonth())
console.log('first day of month', moment().startOf('quarter').toString())

  
// ############## END-END-END-END-END-END-END ##############  //

// moment().startOf('week')
  return (

    <View style={styles.container}>
      <View style={styles.list}>
        {year_.map((e) => (
          <View style={styles.date}>
            <Text style={styles.text}>{e.toString().slice(8, 10)}</Text>
          </View>
        ))}
      </View>    
    </View>



    // <View style={styles.container}>
    //   <View style={styles.columns_cont}>
    //     {year_.map((e) => {
    //       if (e.toString().slice(4, 7) === moment().format('MMM') && e.toString().slice(0, 3) === 'Mon') {
    //         return  <View style={styles.column}>
    //                   <View style={styles.date}>
    //                     <Text style={styles.text}>{e.toString().slice(8, 10)}</Text>
    //                   </View>
    //                 </View>
    //       }
    //     })}
    //   </View> 
    //  </View>  



    //  <View style={styles.container}>
    //   <Text style={styles.text}>{monthName}</Text> 

    //     <View style={styles.daysOfWeek}>
    //       {daysOfWeekMon.map((e) => (
    //         <Text style={styles.weekText}>
    //           {moment().weekday(e).toString().slice(0, 3)}
    //         </Text>
    //       ))}
    //     </View>

    //     <View style={styles.list}>
    //       {daysOfMonth.map((e) => (
    //         <View style={styles.date}>
    //          <Text style={styles.text}>{e}</Text>
    //        </View>
    //       ))} 
    //     </View>

    //   </View>  

  )
}

const styles = StyleSheet.create({
  container:{
    // flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#EFA9FD',
    margin: 5,
    padding: 20,
    width: 320,
  },
  daysOfWeek: {
    flexDirection: 'row',
    gap: 20,
  },
  weekText: {
    fontSize: 12,
    color: 'white',
  },
  columns_cont: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // gap: 20,
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 300,
    // gap: 8,
    marginTop: 5,
  },
  date: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  text: {
    color: 'white',
    fontSize: 15,
  },
})

export default DatePickerCalendar
