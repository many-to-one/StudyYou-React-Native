import { Calendar, LocaleConfig, XDate } from 'react-native-calendars';
import { StyleSheet } from 'react-native';

import React, { useContext, useEffect, useMemo, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { LanguageContext } from '../context/LanguageContext';

const Calendar_ = (props) => {

  const navigation = useNavigation();
  const {proxy} = useContext(AuthContext);
  const {dayNames, monthNames} = useContext(LanguageContext);
  // const [selected, setSelected] = useState('')
  const [ds, setDs] = useState('')
  const isFocused = useIsFocused();
  // const nextDay = moment().add(1, 'days').format("YYYY-MM-DD");
  let days = [];
  const marked = {
    '2023-03-05': {selected: true, marked: true, selectedColor: 'blue'},
    '2023-03-06': {selected: true, marked: true, selectedColor: 'blue'},
    '2023-03-10': {selected: true, marked: true, selectedColor: 'blue'},
    '2023-03-11': {selected: true, marked: true, selectedColor: 'blue'},
  }
  // const date = ['2023-02-17']

  useEffect(() => {
    getMarked()
  }, [isFocused])

  useEffect(() => {

  }, [])

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

      ar.map((date) => {
        days.push(date.date)
      })
      console.log('days:', days)

      // days.map((day) => {
      //   marked[day.toString()] = {
      //     selected: true,
      //     marked: true,
      //     selectedColor: 'blue',
      //     // selectedTextColor: 'white',
      //   }.join(',')
      // })


      console.log('marked:', marked)
    }
  }

  // if(ds){
  //   ds.map((day) => {
  //     marked[day.toString()] = {
  //       selected: true,
  //       selectedColor: '#78D7D9',
  //       selectedTextColor: 'white',
  //     }
  //   })
  // }


  const setDate = (day) => {
    navigation.navigate('CreateCalendarEvent', {day: day})
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
    width: 300,
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
    shadowRadius: 4
  }
})

export default Calendar_
