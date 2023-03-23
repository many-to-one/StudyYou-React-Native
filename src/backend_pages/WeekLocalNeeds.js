import React, { useContext, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { AuthContext } from '../context/AuthContext';
import { SelectList  } from 'react-native-dropdown-select-list';
import Icon from "react-native-vector-icons/Ionicons";
import { useIsFocused } from '@react-navigation/native';
import { LanguageContext } from '../context/LanguageContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TalkBtn from '../buttons/TalkBtn';
import { styles } from '../styles/Styles';

const WeekLocalNeeds = ({day, navigation}) => {

    const {proxy, stuff} = useContext(AuthContext);
    const {trans} = useContext(LanguageContext);
    const [selected, setSelected] = useState('')
    const [users, setUsers] = useState([])
    const [dateWeekLocalNeeds, setDateWeekLocalNeeds] = useState([])
    const USERS = {}
    const isFocused = useIsFocused();

    useEffect(() => {
      getUsers()
  }, [isFocused])

  const getUsers = async() => {
    let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
    const resp = await fetch(`${proxy}/users/users_by_leader/${datas.congregation}/`)
      const data = await resp.json();
      if(resp.status === 200){
        setUsers(data)
        getCalendarDatesByDate()
      }
  }

  const getCalendarDatesByDate = async() => {
    let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData")) 
    const body = {'date': day, 'action': 'LocalNeeds', 'congregation': datas.congregation}
    const resp = await fetch(`${proxy}/backend/get_calendar_date/`, {
      method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(body),
        });
        const data = await resp.json();
        if(data){
            setDateWeekLocalNeeds(data)
            setSelected([])
        }  
  }

  for(let i=0; i<users.length; i++){
    USERS[users[i].id] = users[i].username
  }

  const data = []

  for (const [key, value] of Object.entries(USERS)) {
    data.push(
      {key:key, value:value},
    )
  }

  const setWeekLocalNeeds = async(selected) => {
    let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
      for(let k in USERS){  
        if(selected === USERS[k]){
          fetch(`${proxy}/backend/set_calendar/${k}/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              'date': `${day}`,
              'action': 'LocalNeeds',
              'congregation': datas.congregation,
              'groupe': null,
              'icon': 'md-file-tray-full',
            })
          })    
        }
      }
    const body = {'date': day, 'action': 'Local Needs', 'congregation': datas.congregation,}
    const resp = await fetch(`${proxy}/backend/get_calendar_date/`, {
      method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(body),
        });
        const data = await resp.json();
        if(data){
          setDateWeekLocalNeeds(data)
        }
    getCalendarDatesByDate()
  }

  const deleteWeekLocalNeeds = async(user) => {
    const resp = await fetch(`${proxy}/backend/delete_calendar/${user.id}/`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
      },
    })
    if(resp.status === 200){
      console.log('deleted', user)
      setSelected([])
      setDateWeekLocalNeeds([])      
      getCalendarDatesByDate()
    }
  }

  console.log('dateWeekLocalNeeds:', dateWeekLocalNeeds, stuff)

if(dateWeekLocalNeeds.length === 1 && stuff === true){
  return ( 
    dateWeekLocalNeeds.map((e) => {
      if(e.date === day && e.action === 'LocalNeeds'){  
          return  <View style={styles.user}>
          <Icon name='md-file-tray-full' size={20} color={'#F9F9B5'} />
          <Text style={styles.user_text}>{USERS[e.user]}</Text>
              <Icon 
                  name="close-circle-outline" 
                  size={20} 
                  color={'white'} 
                  onPress={() => deleteWeekLocalNeeds(e)}     
                  />
          </View>  
                              
      }
  }) 

  )
     
}else if(dateWeekLocalNeeds.length === 0 && stuff === true){
        return (
            <View style={styles.row}>
              <SelectList
                setSelected={(val) => setSelected(val)} 
                data={data} 
                save="value"
                // onSelect={(value) => alert(`${value}`)} 
                placeholder={
                  <View style={styles.placeholder}>
                    <Icon name='md-file-tray-full' size={20} color={'white'} />
                    <Text style={styles.text}>{trans.LocalNeeds}</Text>
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
              <TalkBtn onPress={() => setWeekLocalNeeds(selected)}/>
            </View>
        )
  }else if(dateWeekLocalNeeds.length === 1 && stuff === false){
    return ( 
      dateWeekLocalNeeds.map((e) => {
        if(e.date === day && e.action === 'LocalNeeds'){  
            return  <View style={styles.user}>
            <Icon name='md-file-tray-full' size={20} color={'#F9F9B5'} />
            <Text style={styles.user_text}>{USERS[e.user]}</Text>
            </View>  
                                
        }
    }) 
    )     
  }
}

export default WeekLocalNeeds
