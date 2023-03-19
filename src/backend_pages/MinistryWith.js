import React, { useContext, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { AuthContext } from '../context/AuthContext';
import { SelectList  } from 'react-native-dropdown-select-list';
import Icon from "react-native-vector-icons/Ionicons";
import { useIsFocused } from '@react-navigation/native';
import { LanguageContext } from '../context/LanguageContext';
import MinistryWithPerson from './MinistryWithPerson';
import { styles } from '../styles/Styles';
import TalkBtn from '../buttons/TalkBtn';
import SheduleBtn from '../buttons/ScheduleBtn'

const MinistryWith = ({day, navigation}) => {

    const {proxy, userData} = useContext(AuthContext);
    const {trans} = useContext(LanguageContext);
    const [selected, setSelected] = useState('')
    const [time, setTime] = useState('')
    const [users, setUsers] = useState([])
    const [dateMinistryWith, setDateMinistryWith] = useState([])
    const USERS = {}
    const isFocused = useIsFocused();

    useEffect(() => {
      getUsers()
  }, [isFocused])

  const getUsers = async() => {
    console.log('userData id', userData.id)
    const resp = await fetch(`${proxy}/users/users/${userData.congregation}/`)
      const data = await resp.json();
      if(resp.status === 200){
        setUsers(data)
        getCalendarDatesByDate()
      }
  }

  const getCalendarDatesByDate = async() => {
    const body = {'date': day, 'action': 'MinistryWith', 'congregation': userData.congregation} //'person': selected
    const resp = await fetch(`${proxy}/backend/get_calendar_date/`, {
      method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(body),
        });
        const data = await resp.json();
        if(data){
          setDateMinistryWith(data)
          setSelected([])
          console.log('data+',data)
        }  
  }

  for(let i=0; i<users.length; i++){
    USERS[users[i].id] = users[i].username
  }

  const data = []
  const TIME = [
    {key:'1', value:'06:00'},
    {key:'2', value:'07:00'},
    {key:'2', value:'08:00'},
    {key:'2', value:'09:00'},
    {key:'2', value:'10:00'},
    {key:'2', value:'11:00'},
    {key:'2', value:'12:00'},
    {key:'2', value:'13:00'},
    {key:'2', value:'14:00'},
    {key:'2', value:'15:00'},
    {key:'2', value:'16:00'},
    {key:'2', value:'17:00'},
    {key:'2', value:'18:00'},
    {key:'2', value:'19:00'},
    {key:'2', value:'20:00'},
    {key:'2', value:'21:00'},
    {key:'2', value:'22:00'},
  ]

  for (const [key, value] of Object.entries(USERS)) {
    data.push(
      {key:key, value:value},
    )
  }

  const setMinistryWith = async(selected, time) => {
      const response1 = await fetch(`${proxy}/backend/set_calendar_person/${userData.id}/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'date': `${day}`,
            'action': 'MinistryWith',
            'person': `${selected}`,
            'time': `${time}`,
            'congregation': userData.congregation,
          })
        })

      const response2 = await fetch(`${proxy}/backend/set_calendar_from_person/${selected}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'date': `${day}`,
          'action': 'MinistryWith',
          'person': `${userData.id}`,
          'time': `${time}`,
          'congregation': userData.congregation,
        })
      })

        const body = {
          'date': day, 
          'action': 'MinistryWith', 
          'congregation': userData.congregation,
        }
        const resp = await fetch(`${proxy}/backend/get_calendar_date/`, {
          method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body:JSON.stringify(body),
            });
            const data = await resp.json();
            if(data){
              setDateMinistryWith(data)
              console.log('data+',data)
            }  
        getCalendarDatesByDate()
  }

console.log('dateMinistryWith:', dateMinistryWith, day)

return(
    <View>
      <View>
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
        />
        <SelectList 
          setSelected={(val) => setTime(val)} 
          data={TIME} 
          save="value" 
          placeholder={
            <View style={styles.placeholder}>
              <Icon name='briefcase-sharp' size={20} color={'white'} />
              <Text style={styles.text}>{trans.Time}</Text>
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
        <SheduleBtn onPress={() => setMinistryWith(selected, time)}/>
        </View>
        <View>
          {dateMinistryWith.map((person, index) => (
            <MinistryWithPerson 
            key={person.id}
            person={person}
            day={day}
          />
          ))}
        </View>
      </View>
)

}

export default MinistryWith
