import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { AuthContext } from '../context/AuthContext';

const MinistryWithPerson = ({person, day}) => {
    const {proxy, userData} = useContext(AuthContext);
    const [live, setLive] = useState(true)

    const deleteMinistryWith = async(user) => {
        const resp = await fetch(`${proxy}/backend/delete_calendar/${user.id}/`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          },
        })
        if(resp.status === 200){
          console.log('deleted', user)
          setLive(false)
        }
      }

    if(live === true && person.date === day && person.action === 'MinistryWith' && person.user === userData.id){  
        return  <View style={styles.user}>
        <Icon name='briefcase-sharp' size={20} color={'#F9F9B5'} />
        <Text style={styles.user_text}>{person.person}</Text>
        <Text style={styles.user_text}>{person.time}</Text>
          <Icon 
            name="close-circle-outline" 
            size={20} 
            color={'#F9F9B5'} 
            onPress={() => deleteMinistryWith(person)}     
          />
        </View> 
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 25,
      paddingTop: 25,
    },
    text: {
      color: 'white',
      fontSize: 10,
    },
    event:{
      width: 290,
      margin: 2,
      padding: 10,
      color: 'white',
      fontSize: 20,
      zIndex: 999,
      backgroundColor: "transparent"
    },
    input:{
      width: 200,
      height: 50,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: '#333333',
      margin: 5,
      padding: 10,
      color: 'white',
      fontSize: 20,
      zIndex: 999,
    },
    box:{
      width: 290,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#4f4f4f',
      margin: 2,
      padding: 10,
      color: 'white',
      fontSize: 20,
      zIndex: 999,
      backgroundColor: "#a6a6a6"
    },
    user: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginBottom: 10,
      height: 50,
      borderRadius: 15,
      backgroundColor: "#333333",
      gap: 10,
    },
    user_text: {
      fontSize: 15,
      color: 'white',
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
      width: 320,
      height: 50,
      borderRadius: 10,
      borderWidth: 2,
      backgroundColor: '#78F5FA',
      margin: 5,
      padding: 10,
      backgroundColor: '#F9F9B5',
      zIndex: 999,
  },  
  placeholder: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },     
  })

export default MinistryWithPerson

