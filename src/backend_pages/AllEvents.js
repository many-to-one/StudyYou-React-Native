import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { AuthContext } from '../context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Event from './Event'

const AllEvents = () => {
    const { userData, proxy } = useContext(AuthContext);
    const [ events, setEvents] = useState([]);
    const [ asyncUserData, setAsyncUserData ] = useState('');

    useEffect(() => {
      getToken()
    }, [])

    const allEvents = async(info) => {

        const response = await fetch(`${proxy}/backend/events/${info.id}/`)
        const resp = await response.json();
        setEvents(resp)
        console.log(
            'id:', userData.id,
            'events:', events,
            'proxy:', proxy
            )
    }

    const getToken = async() => {
      let info = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
      console.log('info:', info)
      await allEvents(info)
    }

  return (
    <View style={styles.container}>
      <View>
        {events.map((ev, index) => (
            <Event key={index} ev={ev}/>
        ))}
      </View>
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
    
      },
})

export default AllEvents
