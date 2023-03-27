import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { AuthContext } from '../context/AuthContext';
import { styles } from '../styles/Styles';

const ShowStuff = ({person, USERS, action, day, stuff}) => {
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

      //  ################################ FOR ADMIN ################################## //
    if(live === true && person.date === day && person.action === action && stuff === true && person.time === day && person.check_arr_icon === false){  
        return  <View style={styles.user}>
        <Icon name={person.icon} size={20} color={'#F9F9B5'} />
        <Text style={styles.user_text}>{USERS[person.user]}</Text>
        <Text style={styles.user_text}>{person.groupe}</Text>
          <Icon 
            name="close-circle-outline" 
            size={20} 
            color={'#F9F9B5'} 
            onPress={() => deleteMinistryLeader(person)}     
          />
        </View> 

      //  ################################ FOR USER ################################## //
    }else if(live === true && person.date === day && person.action === action && stuff === false){  
      return  <View style={styles._user}>
      <Icon name={person.icon} size={20} color={'#F9F9B5'} />
      <Text style={styles.user_text}>{USERS[person.user]}</Text>
      </View> 

      //  ################################ FOR ADMIN (CLEANING) ################################## //
    }else if(live === true && person.date === day && person.action === 'Cleaning' && stuff === true && person.time === day){  
      return  <View style={styles.user}>
      <Icon name={person.icon} size={20} color={'#F9F9B5'} />
      <Text style={styles.user_text}>{person.groupe}</Text>
      <Icon 
            name="close-circle-outline" 
            size={20} 
            color={'#F9F9B5'} 
            onPress={() => deleteMinistryLeader(person)}     
          />
      </View> 

      //  ################################ FOR USER (CLEANING) ################################## //
    }else if(live === true && person.date === day && person.action === 'Cleaning' && stuff === false && person.time === day){  
      return  <View style={styles.user}>
      <Icon name={person.icon} size={20} color={'#F9F9B5'} />
      <Text style={styles.user_text}>{person.groupe}</Text>
      </View>

      //  ################################ FOR ADMIN (WEEK AGO) ################################## //
    }else if(live === true && person.date === day && person.action === action && stuff === true && person.time !== 'user week ago' && person.check_arr_icon === false){  
      return  <View style={styles.user}>
      <Icon name={person.icon} size={20} color={'#F9F9B5'} />
      <Text style={styles.user_text}>{USERS[person.user]} was week ago</Text>
      <Icon 
            name="close-circle-outline" 
            size={20} 
            color={'#F9F9B5'} 
            onPress={() => deleteMinistryLeader(person)}     
          />
      </View> 

      //  ################################ FOR USER (WEEK AGO) ################################## //
    }else if(live === true && person.date === day && person.action === action && stuff === false && person.time === 'user week ago'){  
      return  <View style={styles.user}>
      <Icon name={person.icon} size={20} color={'#F9F9B5'} />
      <Text style={styles.user_text}>{USERS[person.user]}</Text>
      </View>

      //  ################################ FOR ADMIN (ARR_LIST) ################################## //
    }else if(live === true && person.date === day && person.action === action && stuff === true && person.time === day && person.check_arr_icon === true){  
      return  <View style={styles.user}>
      <Icon name={person.icon} size={20} color={'#F9F9B5'} />
      <Text style={styles.user_text}>{USERS[person.user]}</Text>
      <Icon name={person.arr_icon[0]} size={15} color={'green'} />
      <Icon name={person.arr_icon[1]} size={15} color={'red'} />
      <Icon name={person.arr_icon[2]} size={15} color={'blue'} />
      <Icon name={person.arr_icon[3]} size={15} color={'green'} />
      <Icon name={person.arr_icon[4]} size={15} color={'green'} />
      <Icon name={person.arr_icon[5]} size={15} color={'green'} />
      <Icon 
            name="close-circle-outline" 
            size={20} 
            color={'#F9F9B5'} 
            onPress={() => deleteMinistryLeader(person)}     
          />
      </View> 
    

      //  ################################ FOR ADMIN (ARR_LIST & WEEK AGO) ################################## //
    }else if(live === true && person.date === day && person.action === action && stuff === true && person.time === 'user week ago' && person.check_arr_icon === true){  
      return  <View style={styles.user}>
      <Icon name={person.icon} size={20} color={'#F9F9B5'} />
      <Text style={styles.user_text}>{USERS[person.user]} was week ago</Text>
      {/* <Icon name={person.arr_icon[0]} size={15} color={'green'} /> */}
      <Icon name={person.arr_icon[1]} size={15} color={'red'} />
      <Icon name={person.arr_icon[2]} size={15} color={'blue'} />
      <Icon name={person.arr_icon[3]} size={15} color={'green'} />
      <Icon name={person.arr_icon[4]} size={15} color={'green'} />
      <Icon name={person.arr_icon[5]} size={15} color={'green'} />
      <Icon 
            name="close-circle-outline" 
            size={20} 
            color={'#F9F9B5'} 
            onPress={() => deleteMinistryLeader(person)}     
          />
      </View> 
    }
}
export default ShowStuff

