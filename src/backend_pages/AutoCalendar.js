import { Calendar, LocaleConfig, XDate } from 'react-native-calendars';
import { Dimensions, StyleSheet, View } from 'react-native';
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { LanguageContext } from '../context/LanguageContext';
import ScheduleBtn from '../buttons/ScheduleBtn';

const AutoCalendar = (props) => {

  const navigation = useNavigation();
  const {proxy, userData} = useContext(AuthContext);
  const {dayNames, monthNames} = useContext(LanguageContext);
  const [marked, setMarked] = useState({})
  const [choice, setChoice] = useState([])
  const [live, setLive] = useState(false)
  const isFocused = useIsFocused();
  const days = [];

  useEffect(() => {
    setMarked({})
  }, [isFocused])

  LocaleConfig.locales['pl'] = {
    monthNames: monthNames,
    monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
    dayNames: dayNames,
    dayNamesShort: dayNames,
    today: 'Aujourd\'hui'
  };
  LocaleConfig.defaultLocale = 'pl';

  const setDate = (day) => {
    let duration = moment.duration({ 'days': 7 });
    let _week_ago = moment(day).subtract(duration)
    let day_ = day
    marked[day.toString()] = {
        selected: true,
        marked: true,
        selectedColor: '#F9F9B5',
        selectedTextColor: 'black',
      }
    // navigation.navigate('CreateCalendarEvent', {day: day, week_ago:  moment(_week_ago._d).format('YYYY-MM-DD')})
    console.log(day.toString())
    setLive(false)
  }


  const setDate2 = (day) => {
    let duration = moment.duration({ 'days': 7 });
    let _week_ago = moment(day).subtract(duration)
    let day_ = day
    marked[day.toString()] = {
        selected: true,
        marked: true,
        selectedColor: '#F9F9B5',
        selectedTextColor: 'black',
      }
    // navigation.navigate('CreateCalendarEvent', {day: day, week_ago:  moment(_week_ago._d).format('YYYY-MM-DD')})
    console.log(day.toString())
    setLive(true)
  }


  const makeData = async() => {
    for (const [key, value] of Object.entries(marked)) {
      days.push(
        key
      )
    }
    console.log('days', days)
    sendDates(days)
  }

  const sendDates = async(days) => {
    const resp = await fetch(`${proxy}/backend/set_random_stand_big/`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'date': `${days}`,
          'action': 'Stand',
          'icon': 'business',
          'congregation': `${userData.congregation}`,
        })
    }) 
    const data = await resp.json()
    console.log('marked', marked)
    console.log('data', data)
    navigation.navigate('Profile')
  }


  if(live === true){
    return (
        <View>
            <Calendar 
              onDayPress={(day) =>  setDate(day.dateString)}
            //   onDayPress={(day) =>  marked.push(day.dateString)}
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
            <ScheduleBtn 
                onPress={() => makeData()}
                title={'Submit'}
            />
        </View>
      )
  }else{
    return (
        <View>
            <Calendar 
              onDayPress={(day) =>  setDate2(day.dateString)}
            //   onDayPress={(day) =>  marked.push(day.dateString)}
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
            <ScheduleBtn 
                onPress={() => makeData()}
                title={'Submit'}
            />
        </View>
      )
  }
  
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  event:{
    width: width / 1.2,
    height: 380,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#19868a',
    marginTop: 15,
    padding: 10,
    color: 'white',
    fontSize: 20,
    zIndex: 999,
    backgroundColor: '#18909C80',
    shadowColor: '#19868a',
      shadowOpacity: 1,
      shadowOffset: {
        width: 0,
        height: 0,
      },
    shadowRadius: 8,
    marginBottom: 20,
  }
})

export default AutoCalendar
