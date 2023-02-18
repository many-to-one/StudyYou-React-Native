import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const CalendarMonth = ({e}) => {
  
  
  

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
  

export default CalendarMonth
