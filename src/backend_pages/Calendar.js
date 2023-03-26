import { Calendar, LocaleConfig, XDate } from 'react-native-calendars';
import { Dimensions, StyleSheet } from 'react-native';

import React, { useContext, useEffect, useMemo, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { LanguageContext } from '../context/LanguageContext';

const Calendar_ = (props) => {

  const navigation = useNavigation();
  const {proxy} = useContext(AuthContext);
  const {dayNames, monthNames} = useContext(LanguageContext);
  const [marked, setMarked] = useState({})
  const [ds, setDs] = useState('')
  const isFocused = useIsFocused();
  // const nextDay = moment().add(1, 'days').format("YYYY-MM-DD");
  let days = [];

  useEffect(() => {
    getMarked()
  }, [isFocused])

  LocaleConfig.locales['pl'] = {
    monthNames: monthNames,
    // monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
    monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
    // dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
    dayNames: dayNames,
    dayNamesShort: dayNames,
    // dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.'],
    today: 'Aujourd\'hui'
  };
  LocaleConfig.defaultLocale = 'pl';


// let test = {}


  const getMarked = async() => {
    const resp = await fetch(`${proxy}/backend/get_calendar/`)
    if(resp.status === 200){
      const data = await resp.json()
      setDs(data.data)
      const ar = data.data
      console.log('ar:', ar)

      ar.map((date) => {
        if(date.date < moment().format('YYYY-MM-DD')){
          return "null";
        }else{
          days.push(date.date)
        }
      })
      console.log('days:', days)

      days.map((day) => {
        marked[day.toString()] = {
          selected: true,
          marked: true,
          selectedColor: 'blue',
          // selectedTextColor: 'white',
        }
      })


      console.log('marked:', marked)
    }
  }

  useEffect(() => {
    getMarked()
  }, [isFocused])

  const setDate = (day) => {
    let duration = moment.duration({ 'days': 7 });
    let _week_ago = moment(day).subtract(duration)
    navigation.navigate('CreateCalendarEvent', {day: day, week_ago:  moment(_week_ago._d).format('YYYY-MM-DD')})
    console.log(day)
  }


  return (
    <Calendar 
      onDayPress={(day) =>  setDate(day.dateString)}
      // onDayPress={(day) =>  marked.push(day.dateString)}
      firstDay = { 7 } 
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

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  event:{
    width: width / 1.2,
    height: 350,
    borderRadius: 10,
    // borderWidth: 1,
    // borderColor: '#78D7D9',
    // borderColor: 'white',
    marginTop: 15,
    padding: 10,
    color: 'white',
    fontSize: 20,
    zIndex: 999,
    backgroundColor: 'transparent',
    shadowColor: 'white',
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 4,
    marginBottom: 20,
  }
})

export default Calendar_
