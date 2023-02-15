import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useContext, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { AuthContext } from '../context/AuthContext';

const CreateCalendarEvent = ({route, navigation}) => {

    const {proxy} = useContext(AuthContext);
    const {day} = route.params;
    // const [sts, setSts] = useState('')


    useEffect(() => {
        setDate()
        // console.log('day:', day)
    }, [])

    const setDate = async() => {
        let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
        const resp = await fetch(`${proxy}/backend/calendar/${datas.id}/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(day)
        })
        const data = await resp.json()
        if(data.status === 200){
          navigation.navigate('Profile')
          console.log('posted, ok')
        }
          
      }

  return (
    <View>
      <Text>Set Data</Text>
    </View>
  )
}

export default CreateCalendarEvent
