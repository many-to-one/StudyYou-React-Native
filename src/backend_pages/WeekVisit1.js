import React, { useContext, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { AuthContext } from '../context/AuthContext';
import { MultipleSelectList  } from 'react-native-dropdown-select-list';
import Icon from "react-native-vector-icons/Ionicons";
import { useIsFocused } from '@react-navigation/native';
import { LanguageContext } from '../context/LanguageContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TalkBtn from '../buttons/TalkBtn';
import { styles } from '../styles/Styles';

const WeekVisit1 = ({day, navigation}) => {

    const {proxy, stuff} = useContext(AuthContext);
    const {trans} = useContext(LanguageContext);
    const [selected, setSelected] = useState('')
    const [users, setUsers] = useState([])
    const [dateWeekVisit1, setDateWeekVisit1] = useState([])
    const USERS = {}
    const isFocused = useIsFocused();

    useEffect(() => {
      getUsers()
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
    const body = {'date': day, 'action': 'InitialCall', 'congregation': datas.congregation}
    const resp = await fetch(`${proxy}/backend/get_calendar_date/`, {
      method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(body),
        });
        const data = await resp.json();
        if(data){
            setDateWeekVisit1(data)
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

  const setWeekVisit1 = async(selected) => {
    let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
    selected.map((e) => {
      for(let k in USERS){  
        if(e === USERS[k]){

          const resp = fetch(`${proxy}/backend/set_calendar/${k}/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              'date': `${day}`,
              'action': 'InitialCall',
              'congregation': datas.congregation,
              'groupe': null,
              'icon': 'people-outline',
            })
          })    
        }
      }
    })
    const body = {'date': day, 'action': 'InitialCall', 'congregation': datas.congregation,}
    const resp = await fetch(`${proxy}/backend/get_calendar_date/`, {
      method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(body),
        });
        const data = await resp.json();
        if(data){
            setDateWeekVisit1(data)
        }
    getCalendarDatesByDate()
  }

  const deleteWeekVisit1 = async(user) => {
    const resp = await fetch(`${proxy}/backend/delete_calendar/${user.id}/`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
      },
    })
    if(resp.status === 200){
      console.log('deleted', user)
      setSelected([])
      setDateWeekVisit1([])      
      getCalendarDatesByDate()
    }
  }

  console.log('dateWeekVisit1:', dateWeekVisit1, stuff)

  if(dateWeekVisit1.length > 1 && stuff === true){
    return ( 
      dateWeekVisit1.map((e) => {
          if(e.date === day && e.action === 'InitialCall'){  
              return  <View style={styles.user}>
              <Icon name='people-outline' size={20} color={'#F9F9B5'} />
              <Text style={styles.user_text}>{USERS[e.user]}</Text>
                  <Icon 
                      name="close-circle-outline" 
                      size={20} 
                      color={'#F9F9B5'} 
                      onPress={() => deleteWeekVisit1(e)}     
                      />
              </View>  
  
          }
      }) 
  
    )
      }else if(dateWeekVisit1.length === 0 && stuff === true){
          return (
              <View style={styles.row}>
                <MultipleSelectList 
                  setSelected={(val) => setSelected(val)} 
                  data={data} 
                  save="value"
                  // onSelect={(value) => alert(`${value}`)} 
                  placeholder={
                    <View style={styles.placeholder}>
                      <Icon name='people-outline' size={20} color={'white'} />
                      <Text style={styles.text}>{trans.InitialCall}</Text>
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
                <TalkBtn onPress={() => setWeekVisit1(selected)}/>
              </View>
          )
      }else if(dateWeekVisit1.length === 1 && stuff === true){
          return ( 
            dateWeekVisit1.map((e) => {
              if(e.date === day && e.action === 'InitialCall'){  
                  return  <View>
                    <View style={styles.user}>
                    <Icon name='people-outline' size={20} color={'#F9F9B5'} />
                      <Text style={styles.user_text}>{USERS[e.user]}</Text>
                          <Icon 
                              name="close-circle-outline" 
                              size={20} 
                              color={'#F9F9B5'} 
                              onPress={() => deleteWeekVisit1(e)}     
                              />
                    </View>
                    <View style={styles.row}>
                      <MultipleSelectList 
                      setSelected={(val) => setSelected(val)}  
                      data={data} 
                      save="value"
                      // onSelect={() => alert('selected')} 
                      placeholder={
                        <View style={styles.placeholder}>
                          <Icon name='people-outline' size={20} color={'white'} />
                          <Text style={styles.text}>{trans.InitialCall}</Text>
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
                      <TalkBtn onPress={() => setWeekVisit1(selected)}/>
                    </View>
                  </View>
                  
                                      
              }
          }) 
    
            )
    }else if(dateWeekVisit1.length >= 1 && stuff === false){
      return ( 
        dateWeekVisit1.map((e) => {
            if(e.date === day && e.action === 'InitialCall'){  
                return  <View style={styles.user}>
                <Icon name='people-outline' size={20} color={'#F9F9B5'} />
                <Text style={styles.user_text}>{USERS[e.user]}</Text>
                </View>  
    
            }
        }) 
    
      )
        }
}

export default WeekVisit1
