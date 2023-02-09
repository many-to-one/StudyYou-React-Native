import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthContext } from '../context/AuthContext';

const Event = ({ev}) => {
  const {proxy} = useContext(AuthContext);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  // useEffect(() => {
  //   getEvent()
  // }, [isFocused]);

  const onRefresh = React.useCallback(() => {
    setTimeout(() => {
    }, 100);
    console.log('refreshed Event')
  }, []);

  // const getEvent = async() => {
  //   const resp = await fetch(`${proxy}/backend/events/${ev.id}/${ev.user}/`, {
  //       method: 'GET',
  //       headers: {
  //           'Content-Type': 'application/json'
  //       },
  //   });
  //   const data = await resp.json()
  //   if(data){
  //     console.log('data received:', data.hours)
  //     onRefresh()
  //   }
  // }

  const deleteEvent = async() => {
    await fetch(`${proxy}/backend/events/${ev.id}/${ev.user}/delete/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    window.location.reload();
  }

  const goToUpdate = async() => {
    onRefresh()
    navigation.navigate('UpdateEvent', {ev:ev})
  }

  return (
    <TouchableOpacity onPress={() => goToUpdate()}
    >
    <View style={styles.container}>
      <View style={styles.event}>
        <Text style={styles.event_date}>{ev.date.slice(0, 10)}</Text>
        <Text style={styles.event_text}>{ev.event}</Text>
      </View>  
      <View>
        <Icon 
          name='delete-forever' 
          onPress={() => deleteEvent()} 
          style={styles.delete}  
        />
      </View>
    </View>
    </TouchableOpacity>

    //  <View style={styles.container}>
    //  <Button onPress={() => navigation.navigate(
    //     'UpdateEvent',{
    //       ev:ev
    //     }
    //     )}
    //   />
    //   <View style={styles.event}>
    //     <Text style={styles.event_date}>{ev.date.slice(0, 10)}</Text>
    //     <Text style={styles.event_text}>{ev.event}</Text>
    //   </View>  
    //   <View>
    //     <Icon 
    //       name='delete-forever' 
    //       onPress={() => deleteEvent()} 
    //       style={styles.delete}  
    //     />
    //   </View>
    // </View>
  )
}

const styles = StyleSheet.create({

    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: '#EFA9FD', 
      width: 300,
      height:50,
      borderRadius: 10,
      margin: 5,
    },
    event:{
      justifyContent: 'center',
      borderColor: 'white',
    },
    event_date: {
      fontSize: 15,
      fontWeight: 'bold',
      color: '#FAFAE6',
      marginLeft: 10,
    },
    event_text: {
      fontSize: 15,
      fontWeight: 'bold',
      color: '#FAFAE6',
      marginLeft: 10,
    },
    delete: {
      color: '#F9F9B5',
      fontSize: 30,
    },
  })

export default Event
