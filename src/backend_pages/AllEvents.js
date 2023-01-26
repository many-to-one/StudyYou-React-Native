import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { AuthContext } from '../context/AuthContext'
import Event from './Event'

const AllEvents = () => {
    const { userData, proxy } = useContext(AuthContext);
    const [ events, setEvents] = useState([]);

    useEffect(() => {
        allEvents()
    }, [])

    const allEvents = async() => {
        const response = await fetch(`${proxy}/backend/events/${userData.id}/`)
        const resp = await response.json();
        setEvents(resp)
        console.log(
            'id:', userData.id,
            'events:', events,
            'proxy:', proxy
            )
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
        // justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
        padding: 20,
    
      },
})

export default AllEvents
