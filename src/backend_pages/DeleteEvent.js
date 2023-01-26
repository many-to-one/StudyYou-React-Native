import React, { useContext, useEffect } from 'react'
import { View } from 'react-native'
import { AuthContext } from '../context/AuthContext';

const DeleteEvent = ({ route, navigation }) => {
    const {id, user} = route.params;
    const {proxy} = useContext(AuthContext);

    useEffect(() => {
        deleteEvent()
    }, [])

    const deleteEvent = async() => {
        await fetch(`${proxy}/backend/events/${id}/${user}/delete/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
    
        navigation.navigate('Home');
    }

  return (
    <View>
      
    </View>
  )
}

export default DeleteEvent
