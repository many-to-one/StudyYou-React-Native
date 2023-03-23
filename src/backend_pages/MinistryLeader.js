import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { AuthContext } from '../context/AuthContext';
import { styles } from '../styles/Styles';

const MinistryLeader = ({person, day}) => {
    const {proxy, userData} = useContext(AuthContext);
    const [live, setLive] = useState(true)

    const deleteMinistryLeader = async(user) => {
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

    if(live === true && person.date === day && person.action === 'MinistryLeader' && person.user === userData.id){  
        return  <View style={styles.user}>
        <Icon name='briefcase-sharp' size={20} color={'#F9F9B5'} />
        <Text style={styles.user_text}>{person.user}</Text>
        {/* <Text style={styles.user_text}>{person.time}</Text> */}
          <Icon 
            name="close-circle-outline" 
            size={20} 
            color={'#F9F9B5'} 
            onPress={() => deleteMinistryLeader(person)}     
          />
        </View> 
    }

}

export default MinistryLeader

