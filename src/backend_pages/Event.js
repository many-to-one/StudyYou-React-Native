import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from "react-native-vector-icons/MaterialIcons";
import { AuthContext } from '../context/AuthContext';

const Event = ({ev}) => {
  console.log('event:', ev.event)
  const {proxy} = useContext(AuthContext);

  const deleteEvent = async() => {
    await fetch(`${proxy}/backend/events/${ev.id}/${ev.user}/delete/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    // navigation.navigate('AllEvents');
    window.location.reload();
}

  return (
    <View style={styles.container}>
      <View style={styles.event}>
        <Text style={styles.event_date}>{ev.date.slice(0, 10)}</Text>
        <Text style={styles.event_text}>{ev.event}</Text>
      </View>  
      <View>
        <Icon 
          name='delete' 
          onPress={() => deleteEvent()}
          // onPress={() => navigation.navigate('Delete', {id: ev.id, user: ev.user})} 
          style={styles.delete}  
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({

    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#282c34',
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
      color: '#fff',
      marginLeft: 10,
    },
    event_text: {
      fontSize: 15,
      fontWeight: 'bold',
      color: '#fff',
      marginLeft: 10,
    },
    delete: {
      color: '#F0007F',
      fontSize: 30,
    },
  })

export default Event
