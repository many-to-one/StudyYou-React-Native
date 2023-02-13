import React, { Component, useState } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import Icon from "react-native-vector-icons/Entypo";
import moment from 'moment';

const Calendar = () => {
    const [day_, setDay] = useState('')


    const onDateChange =(date) => {
        let customDatesStyles = []
        console.log('date:', date._i)
        setDay(date)
        // customDatesStyles(date)

    }

    const customDatesStyles = () => {
        let customDatesStyles = []
        customDatesStyles.push({
            date: day_,
            // Random colors
            style: {backgroundColor: 'red'},
            textStyle: {color: 'black'}, // sets the font color
            containerStyle: [], // extra styling for day container
          });
    }

  return (
    <View style={styles.event}>
      <CalendarPicker 
        startFromMonday={true}
        // selectedDayColor={'#F9F9B5'}
        onDateChange={onDateChange}
        textStyle={{
            color: 'white',
            fontSize: 17
        }}
        width={310}
        previousTitle={
            <Icon name='chevron-small-left' size={20} color={'white'}/>
        }
        nextTitle={
            <Icon name='chevron-small-right' size={20} color={'white'}/>
        }
        customDatesStyles={customDatesStyles}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontSize: 20,
      },
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
      },  
})

export default Calendar
