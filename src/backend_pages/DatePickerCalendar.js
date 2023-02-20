import moment from 'moment';
import React, { useEffect, useState } from 'react'
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import CalendarMonth from './CalendarMonth';

const DatePickerCalendar = () => {



  // ##################### ALL YEAR - DAYS #####################  //

  const calendar = [];
  const today = moment();
  const startDay = today.clone().startOf('year').startOf('month');
  // const endDay = today.clone().endOf('year').endOf('month');
  const endDay = today.clone().set('year', 2024)
  
  let date = startDay.clone().subtract(1, 'day');
  
  while (date.isBefore(endDay, 'day')) 
      calendar.push({
          days: Array(7).fill(0).map(() => date.add(1, 'day').clone())
      });

  console.log('calendar:', calendar) //[52].days[0]._d

  let year_ = []
  let Mon = []
  const LastMon = []
  const Jan = []
  const Feb = []
  const Mar = []
  const Apr = []
  const May = []
  const Jun = []
  const Jul = []
  const Aug = []
  const Sep = []
  const Oct = []
  const Nov = []
  const Dec = []

  for (let w=0; w < 54; w++){
    for (let d = 0; d <= 6; d++) {
      year_.push(calendar[w].days[d]._d)
          if(w === 53){
            break;
          }else if(calendar[w].days[d]._d.toString().slice(0, 3) === 'Mon'){
            Mon.push(calendar[w].days[d]._d)
    }
  }
}

  for(let i=0; i<6; i++){
    year_.unshift('')
  }

  console.log('year', year_)

  // Cztoby uwieliczic kalendar > czem na god
  // nużno dla każdogo goda (12?) wyczeslic
  // poslednije Mon

    for (let i = 0; i < Mon.length; i++) {
      if(Mon[i].toString().slice(4, 7) === 'Jan'){
        Jan.push(Mon[i])
      }else if(Mon[i].toString().slice(4, 7) === 'Feb'){
        Feb.push(Mon[i])
      }else if(Mon[i].toString().slice(4, 7) === 'Mar'){
        Mar.push(Mon[i])
      }else if(Mon[i].toString().slice(4, 7) === 'Apr'){
        Apr.push(Mon[i])
      }else if(Mon[i].toString().slice(4, 7) === 'May'){
        May.push(Mon[i])
      }else if(Mon[i].toString().slice(4, 7) === 'Jun'){
        Jun.push(Mon[i])
      }else if(Mon[i].toString().slice(4, 7) === 'Jul'){
        Jul.push(Mon[i])
      }else if(Mon[i].toString().slice(4, 7) === 'Aug'){
        Aug.push(Mon[i])
      }else if(Mon[i].toString().slice(4, 7) === 'Sep'){
        Sep.push(Mon[i])
      }else if(Mon[i].toString().slice(4, 7) === 'Oct'){
        Oct.push(Mon[i])
      }else if(Mon[i].toString().slice(4, 7) === 'Nov'){
        Nov.push(Mon[i])
      }else if(Mon[i].toString().slice(4, 7) === 'Dec'){
        Dec.push(Mon[i])
      }
  }
  LastMon.push(Jan.slice(-1))
  LastMon.push(Feb.slice(-1))
  LastMon.push(Mar.slice(-1))
  LastMon.push(Apr.slice(-1))
  LastMon.push(May.slice(-1))
  LastMon.push(Jun.slice(-1))
  LastMon.push(Jul.slice(-1))
  LastMon.push(Aug.slice(-1))
  LastMon.push(Sep.slice(-1))
  LastMon.push(Oct.slice(-1))
  LastMon.push(Nov.slice(-1))
  LastMon.push(Dec.slice(-1))


// ############## END-END-END-END-END-END-END ##############  //


const step = [0]
const step2 = []

for(let i=0; i<year_.length; i++){
  if(year_[i].toString().slice(8, 10) === '01'){
    step2.push(i)
  }
  for(let m=0; m<LastMon.length; m++){
    if(year_[i].toString() === LastMon[m].toString()){
      step.push(i)
    }
  }
}
step2.shift()

console.log('LastMon', LastMon)
console.log('step', step)
console.log('step2', step2)

const startOfMonth = moment().startOf('month').format('DDD');
const endOfMonth   = moment().endOf('month').format('DDD');
console.log(moment().startOf('month')._d.toString(), moment().endOf('month')._d.toString())
// console.log(Array.from({length: moment().daysInMonth()}, (x, i) => moment().startOf('month').add(i, 'days')))



  return(
    <View style={styles.container}>
      <View style={styles.list}>
        {year_.slice(step[1], step2[1]).map((e) => {
          if(e.toString().slice(4, 7) === `${moment().add(0, 'M').startOf('month').format('MMM')}`){
            return  <View style={styles.date}>
                      <Text style={styles.text}>{e.toString().slice(8, 10)}</Text>
                    </View>
                    }else{
                      return <View style={styles.date}>
                              <Text style={styles.text2}></Text>
                            </View>
                    }
          })}
      </View>
    </View>
  )


    

    // <View style={styles.container}>
    //   <View style={styles.list}>
    //     {year_.map((e) => {
    //       if(e.toString().slice(4, 7) === 'Jan'){
    //         return  <View style={styles.date}>
    //                   <Text style={styles.text}>{e.toString().slice(8, 10)}</Text>
    //                 </View>
    //             }
    //     })}
    // </View>
    // </View>

    //  <View style={styles.container}>
    //    <View style={styles.list}>
    //  <View>
    //      {year_.map((e) => {
    //        if(e.toString().slice(4, 7) === 'Feb'){
    //           <CalendarMonth e={e} />
    //        }
    //        else{
    //          return <View style={styles.date}>
    //          <Text style={styles.text2}></Text>
    //        </View>
    //        }
      
    //      })}
    //  </View>    
    //  </View>




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

}

const styles = StyleSheet.create({
  container:{
    // flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#78F5FA',
    margin: 5,
    padding: 20,
    width: 320,
    height: 250,
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
    height: 250,
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
  text2: {
    color: 'gray',
    fontSize: 15,
  },
})

export default DatePickerCalendar
