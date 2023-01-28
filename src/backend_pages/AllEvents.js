import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { AuthContext } from '../context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Event from './Event'
import AddEventButton from '../buttons/AddEventButton';

const AllEvents = ({datas}) => {
    const { userData, proxy } = useContext(AuthContext);
    const [ events, setEvents] = useState([]);

    useEffect(() => {
      allEvents()
    }, [])

    const allEvents = async() => {
      let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
      console.log('datas:', datas)
        const response = await fetch(`${proxy}/backend/events/${datas.id}/`)
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
      {/* <AddEventButton onPress={navigation.navigate('AddEvent', {datas: datas})} /> */}
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