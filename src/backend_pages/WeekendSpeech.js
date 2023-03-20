import React, { useContext, useEffect, useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { AuthContext } from '../context/AuthContext';
import { SelectList  } from 'react-native-dropdown-select-list';
import Icon from "react-native-vector-icons/Ionicons";
import { useIsFocused } from '@react-navigation/native';
import { LanguageContext } from '../context/LanguageContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TalkBtn from '../buttons/TalkBtn';
import { styles } from '../styles/Styles';

const WeekendSpeach = ({day, navigation}) => {

    const {proxy, stuff} = useContext(AuthContext);
    const {trans} = useContext(LanguageContext);
    const [selected, setSelected] = useState('')
    const [users, setUsers] = useState([])
    const [person, setPerson] = useState('')
    const [topic, setTopic] = useState('')
    const [guest, setGuest] = useState(false)
    const [dateWeekendSpeach, setDateWeekendSpeach] = useState([])
    const USERS = {}
    const isFocused = useIsFocused();

    useEffect(() => {
      getUsers()
      console.log('GUEST', guest)
  }, [isFocused])

  useEffect(() => {
    getCalendarDatesByDate()
}, [isFocused])

  const getUsers = async() => {
    let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
    const resp = await fetch(`${proxy}/users/users/${datas.congregation}/`)
      const data = await resp.json();
      if(resp.status === 200){
        setUsers(data)
        getCalendarDatesByDate()
      }
  }

  const getCalendarDatesByDate = async() => {
    let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
    const body = {'date': day, 'action': 'WeekendSpeach', 'congregation': datas.congregation}
    const resp = await fetch(`${proxy}/backend/get_calendar_date/`, {
      method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(body),
        });
        const data = await resp.json();
        if(data){
          setDateWeekendSpeach(data)
          setSelected([])
          data.map((e) => {
            setPerson(e.person)
          })
        }  
  }

  console.log('PERSON', person)

  for(let i=0; i<users.length; i++){
    USERS[users[i].id] = users[i].username
  }

  const data = []

  for (const [key, value] of Object.entries(USERS)) {
    data.push(
      {key:key, value:value},
    )
  }


  const setWeekendSpeach = async(selected) => {
    let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
      for(let k in USERS){  
        if(selected === USERS[k]){

          const resp = fetch(`${proxy}/backend/set_calendar/${k}/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              'date': `${day}`,
              'action': 'WeekendSpeach',
              'congregation': datas.congregation,
              'groupe': null,
              'topic': topic,
              'icon': 'md-man-outline',
            })
          })    
        }
      }
      const body = {'date': day, 'action': 'WeekendSpeach', 'congregation': datas.congregation,}
      const resp = await fetch(`${proxy}/backend/get_calendar_date/`, {
        method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body:JSON.stringify(body),
          });
          const data = await resp.json();
          if(data){
            setDateWeekendSpeach(data)
          }  
      getCalendarDatesByDate()
  }

  const deleteWeekendSpeach = async(user) => {
    const resp = await fetch(`${proxy}/backend/delete_calendar/${user.id}/`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
      },
    })
    if(resp.status === 200){
      console.log('deleted', user)
      setSelected([])
      setDateWeekendSpeach([])      
      getCalendarDatesByDate()
    }
  }



  const setGuestSpeaker = async() => {
    let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
    const resp = await fetch(`${proxy}/backend/set_calendar_speach/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'date': `${day}`,
        'action': 'WeekendSpeach',
        'person': person,
        'topic': topic,
        'congregation': datas.congregation,
        'groupe': null,
        'icon': 'md-man-outline',
      })
    })
    setGuest(person)
    getGuestSpeaker()
  }

  const getGuestSpeaker = async() => {
    let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
    const body = {'date': day, 'action': 'WeekendSpeach', 'person': person, 'congregation': datas.congregation}
    const resp = await fetch(`${proxy}/backend/get_calendar_date/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(body),
    });
      const data = await resp.json();
      if(data){
          setDateWeekendSpeach(data)
          console.log('DateWeekendSpeach', data)
          setSelected([])
      }  
  }

  console.log('dateWeekendSpeach:', dateWeekendSpeach, stuff)





if(dateWeekendSpeach.length === 1 && stuff === true && person === null){

  return ( 
    dateWeekendSpeach.map((e) => {
      if(e.date === day && e.action === 'WeekendSpeach'){  
        return <View>
        <View style={styles.user}>
        <Icon name='md-man-outline' size={20} color={'#F9F9B5'} />
        <Text style={styles.user_text}>{USERS[e.user]}</Text>
          <Icon 
            name="close-circle-outline" 
            size={20} 
            color={'white'} 
            onPress={() => deleteWeekendSpeach(e)}     
          />
        </View> 
         <Text style={styles.user_text}>
          {e.topic}
         </Text>  
        </View>                          
      }
    }) 
  )
     
}else if(dateWeekendSpeach.length === 1 && stuff === true && person !== null){

  return ( 
    dateWeekendSpeach.map((e) => {
      if(e.date === day && e.action === 'WeekendSpeach'){  
        return <View>
        <View style={styles.user}>
        <Icon name='md-man-outline' size={20} color={'#F9F9B5'} />
        <Text style={styles.user_text}>{e.person}</Text>
          <Icon 
            name="close-circle-outline" 
            size={20} 
            color={'white'} 
            onPress={() => deleteWeekendSpeach(e)}     
          />
        </View> 
         <Text style={styles.user_text}>
          {e.topic}
         </Text>  
        </View>                        
      }
    }) 
  )
     
}else if(dateWeekendSpeach.length === 0 && stuff === true){
  return (
      <View >
        <View style={styles.row}>
        <SelectList 
          setSelected={(val) => setSelected(val)} 
          data={data} 
          save="value"
          // onSelect={(value) => alert(`${value}`)} 
          placeholder={
            <View style={styles.placeholder}>
              <Icon name='md-man-outline' size={20} color={'white'} />
              <Text style={styles.text}>{trans.WeekendSpeach}</Text>
            </View>
          }
          boxStyles={styles.event}
          inputStyles={styles.input}
          dropdownItemStyles={{color: 'white'}}
          dropdownTextStyles={{color: 'white'}}
          arrowicon={<Icon name="chevron-down" size={20} color={'white'} />} 
          searchicon={<Icon name="search" size={20} color={'white'} />} 
          closeicon={<Icon name="close" size={20} color={'white'} />} 
          search={true}
        />
          <TalkBtn onPress={() => setWeekendSpeach(selected)}/>
        </View>

        <View style={styles.row}>
          <TextInput style={styles.topic} 
            placeholder={trans.Topic}
            placeholderTextColor={'gray'}
            onChangeText={(e) => setTopic(e)}
          />
        </View>
        <View style={styles.row}>
          <TextInput style={styles.topic} 
            placeholder={trans.Speaker}
            placeholderTextColor={'gray'}
            onChangeText={(e) => setPerson(e)}
          />
          <TalkBtn onPress={() => setGuestSpeaker()}/>
        </View>

      </View>

  )

}else if(dateWeekendSpeach.length === 1 && stuff === false && person === null){
    return ( 
      dateWeekendSpeach.map((e) => {
        if(e.date === day && e.action === 'WeekendSpeach'){  
          return  <View>
            <View style={styles.user}>
              <Icon name='md-man-outline' size={20} color={'#F9F9B5'} />
              <Text style={styles.user_text}>{USERS[e.user]}</Text>
            </View> 
            <Text style={styles.user_text}>{e.topic}</Text> 
          </View>                           
        }
      }) 
    )     

}else if(dateWeekendSpeach.length === 1 && stuff === false && person !== null){
  return ( 
    dateWeekendSpeach.map((e) => {
      if(e.date === day && e.action === 'WeekendSpeach'){  
        return  <View>
          <View style={styles.user}>
            <Icon name='md-man-outline' size={20} color={'#F9F9B5'} />
            <Text style={styles.user_text}>{e.person}</Text>
          </View> 
          <Text style={styles.user_text}>{e.topic}</Text>   
        </View>                         
      }
    }) 
  )     
}
}

export default WeekendSpeach
