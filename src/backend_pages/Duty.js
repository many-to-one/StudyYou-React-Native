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
import ShowStuff from './ShowStuff';

const Duty = ({day, week_ago, navigation}) => {

    const {proxy, stuff} = useContext(AuthContext);
    const {trans} = useContext(LanguageContext);
    const [selected, setSelected] = useState('')
    const [users, setUsers] = useState([])
    const [dateDuty, setDateDuty] = useState([])
    const USERS = {}
    const isFocused = useIsFocused();

    useEffect(() => {
      getUsers()
  }, [isFocused])

  const getUsers = async() => {
      let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
      const resp = await fetch(`${proxy}/users/users_by_service/${datas.congregation}/`)
      const data = await resp.json();
      if(resp.status === 200){
        setUsers(data)
        getCalendarDatesByDate()
      }
  }

  const getCalendarDatesByDate = async() => {
    let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))  
    const body = {'date': day, 'action': 'Duty', 'congregation': datas.congregation}
    const resp = await fetch(`${proxy}/backend/get_calendar_date/`, {
      method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(body),
        });
        const data = await resp.json();
        if(data){
          setDateDuty(data)
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

  const setDuty = async(selected) => {
    console.log('selected', selected)
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
              'action': 'Duty',
              'congregation': datas.congregation,
              'groupe': null,
              'icon': 'man-sharp',
              'person': null
            })
          })   
        }
      }
    const body = {'date': day, 'action': 'Duty', 'congregation': datas.congregation}
    const resp = await fetch(`${proxy}/backend/get_calendar_date/`, {
      method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(body),
        });
        const data = await resp.json();
        if(data){
          setDateDuty(data)
        }  
    getCalendarDatesByDate()
    getCalendarDatesByDate()
  }


  console.log('dateDuty:', dateDuty, day)


  if(stuff === true){
    return(
      <View>
      <View style={styles.row}>
        <SelectList 
          setSelected={(val) => setSelected(val)} 
          data={data} 
          save="value" 
          placeholder={
            <View style={styles.placeholder}>
              <Icon name='man-sharp' size={20} color={'white'} />
              <Text style={styles.text}>{trans.Duty}</Text>
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
        <TalkBtn onPress={() => setDuty(selected)}/>
        </View>
        <View>
          {dateDuty.map((person, index) => (
            <ShowStuff 
            key={person.id}
            person={person}
            USERS={USERS}
            action={'Duty'}
            day={day}
            stuff={stuff}
          />
          ))}
        </View>
      </View>
    )
  }else{
    return(
      <View>
        <View>
          {dateDuty.map((person, index) => (
            <ShowStuff 
            key={person.id}
            person={person}
            USERS={USERS}
            action={'Duty'}
            day={day}
            stuff={stuff}
          />
          ))}
        </View>
      </View>
    )
  }

}

export default Duty
