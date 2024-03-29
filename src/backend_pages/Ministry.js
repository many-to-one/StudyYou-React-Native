import React, { useContext, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { AuthContext } from '../context/AuthContext';
import { SelectList  } from 'react-native-dropdown-select-list'; // react-native-multiple-select-list (also good)
import Icon from "react-native-vector-icons/Ionicons";
import { useIsFocused } from '@react-navigation/native';
import { LanguageContext } from '../context/LanguageContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TalkBtn from '../buttons/TalkBtn';
import ShowStuff  from './ShowStuff'
import { styles } from '../styles/Styles';
import ScheduleBtn from '../buttons/ScheduleBtn';

const Ministry = ({day, week_ago, navigation}) => {

  const {proxy, stuff} = useContext(AuthContext);
  const {trans} = useContext(LanguageContext);
  const [selected, setSelected] = useState([])
  const [users, setUsers] = useState([])
  const [dateMinistry, setDateMinistry] = useState([])
  const USERS = {}
  const isFocused = useIsFocused();

    useEffect(() => {
      getUsers()
  }, [isFocused])

  const getUsers = async() => {
    let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
    const resp = await fetch(`${proxy}/users/users_by_ministry/${datas.congregation}/`)
      const data = await resp.json();
      if(resp.status === 200){
        setUsers(data)
        getCalendarDatesByDate()
      }
  }

  const getCalendarDatesByDate = async() => {
    let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
    const body = {'date': day, 'action': 'MinistryLeader', 'congregation': datas.congregation}
    const resp = await fetch(`${proxy}/backend/get_calendar_date/`, {
      method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(body),
        });
        const data = await resp.json();
        if(data){
          setDateMinistry(data)
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

  const setMinistryUsers = async(selected) => {
    let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
      for(let k in USERS){  
        if(selected === USERS[k]){

          const resp = fetch(`${proxy}/backend/set_calendar/${k}/${week_ago}/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              'date': `${day}`,
              'action': 'MinistryLeader',
              'congregation': datas.congregation,
              'groupe': null,
              'icon': 'people-circle-outline',
            })
          })

          if(resp.status === 200){
            setSelected([])
          }    
        }
      }
    const body = {'date': day, 'action': 'MinistryLeader', 'congregation': datas.congregation,}
    const resp = await fetch(`${proxy}/backend/get_calendar_date/`, {
      method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(body),
        });
        const data = await resp.json();
        if(data){
          setDateMinistry(data)
        }  
    getCalendarDatesByDate()
    getCalendarDatesByDate()
  }

console.log('dateMinistry:', dateMinistry, day)
console.log('selected:', selected)



 if(stuff === true){
  return (
    <View>
    <View style={styles.row}>
      <SelectList 
        setSelected={(val) => setSelected(val)} 
        data={data} 
        save="value" 
        placeholder={
          <View style={styles.placeholder}>
            <Icon name='briefcase-sharp' size={20} color={'white'} />
            <Text style={styles.text}>{trans.MinistryWith}</Text>
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
        dropdownStyles={styles.dropdown}
        disabledItemStyles={{width: 300}}
        disabledCheckBoxStyles={{color: 'white'}}
        dropdownShown={false}
      />
      <TalkBtn onPress={() => setMinistryUsers(selected)}/>
      </View>
      <View>
        {dateMinistry.map((person, index) => (
          <ShowStuff 
          key={person.id}
          person={person}
          USERS={USERS}
          action={'MinistryLeader'}
          day={day}
          stuff={stuff}
        />
        ))}
      </View>
        <ScheduleBtn 
          onPress={() => navigation.navigate('AutoMinistry')}
          title={'Auto'}
        />
    </View>
  )
 }else{
  return(
    <View>
      <View>
        {dateMinistry.map((person, index) => (
          <ShowStuff 
          key={person.id}
          person={person}
          USERS={USERS}
          action={'MinistryLeader'}
          day={day}
          stuff={stuff}
        />
        ))}
      </View>
    </View>
  )
 }
}

export default Ministry