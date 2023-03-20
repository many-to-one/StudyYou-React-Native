import React, { useContext, useEffect, useState } from 'react'
import { Text, View } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { AuthContext } from '../context/AuthContext';
import { styles } from '../styles/Styles';

const StandWithPerson = ({person, day}) => {
    const {proxy, userData, stuff} = useContext(AuthContext);
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

    if(live === true && person.date === day && stuff === true){  
        return  <View>
          <View style={styles.user}>
            <Icon name='business' size={20} color={'#F9F9B5'} />
            <Text style={styles.user_text_stand}>{person.place}</Text>
            <Text style={styles.user_text_stand}>{person.person}</Text>
            <Text style={styles.user_text_stand}>{person.time}</Text>
              <Icon 
                name="close-circle-outline" 
                size={20} 
                color={'#F9F9B5'} 
                onPress={() => deleteMinistryWith(person)}     
              />
          </View>
        </View> 
    }else{
        return  <View>
          <View style={styles.user}>
            <Icon name='business' size={20} color={'#F9F9B5'} />
            <Text style={styles.user_text_stand}>{person.place}</Text>
            <Text style={styles.user_text_stand}>{person.person}</Text>
            <Text style={styles.user_text_stand}>{person.time}</Text>
          </View>
        </View> 
    }

}

export default StandWithPerson

