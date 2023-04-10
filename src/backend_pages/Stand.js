import React, { useContext, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { AuthContext } from '../context/AuthContext';
import { SelectList  } from 'react-native-dropdown-select-list';
import Icon from "react-native-vector-icons/Ionicons";
import { useIsFocused } from '@react-navigation/native';
import { LanguageContext } from '../context/LanguageContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../styles/Styles';
import ScheduleBtn from '../buttons/ScheduleBtn';
import StandWithPerson from './StandWithPerson';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

const Stand = ({day}) => {

    const navigation = useNavigation();
    const {proxy, userData, stuff} = useContext(AuthContext);
    const {trans} = useContext(LanguageContext);
    const [person1, setPerson1] = useState('')
    const [person2, setPerson2] = useState('')
    const [place, setPlace] = useState('')
    const [places, setPlaces] = useState([]);
    const [time, setTime] = useState('')
    const [users, setUsers] = useState([])
    const [Action, setAction] = useState('')
    const [dateDuty, setDateDuty] = useState([])
    const USERS = {}
    const isFocused = useIsFocused();

    const PLACES = {}

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

    const Day = moment(day)._d.toString().slice(0, 3)

    useEffect(() => {
      getUsers()
      console.log('day_', Day)
  }, [isFocused])

  useEffect(() => {
    getPlacesStand()
}, [isFocused])

  const getPlacesStand = async() => {
    const resp = await fetch(`${proxy}/backend/set_places_stand/${userData.congregation}/`)
    const data = await resp.json()
    if(data.status === 200){
      setPlaces(data.data)
    }
  }

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
    const body = {'date': day, 'action': 'Stand', 'congregation': userData.congregation}
    const resp = await fetch(`${proxy}/backend/get_calendar_date/`, {
      method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(body),
        });
        const data = await resp.json();
        console.log('data', data)
        if(data){
          setDateDuty(data)
          setPerson1('')
          setPerson2('')
          // setDateDuty([])
        }  
  }


  for(let i=0; i<places.length; i++){
    PLACES[places[i].id] = places[i].name
  }

  const dataPlaces = []

  for (const [key, value] of Object.entries(PLACES)) {
    dataPlaces.push(
      {key:key, value:value},
    )
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

  const setStand = async(person1, person2, time, place) => {
    const response1 = await fetch(`${proxy}/backend/set_calendar_stand/${person1}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'date': `${day}`,
        'action': 'Stand',
        'place': place,
        'person': `${person1}`,
        'time': `${day} ${time}`,
        'icon': 'business',
        'congregation': userData.congregation,
      })
    })

  const response2 = await fetch(`${proxy}/backend/set_calendar_stand/${person2}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'date': `${day}`,
      'action': 'Stand',
      'place': place,
      'person': `${person2}`,
      'time': `${day} ${time}`,
      'icon': 'business',
      'congregation': userData.congregation,
    })
  })
    const body = {'date': day, 'action': 'Stand', 'congregation': userData.congregation}
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

  // const deleteStand = async(user) => {
  //   const resp = await fetch(`${proxy}/backend/delete_calendar/${user.id}/`, {
  //     method: 'DELETE',
  //     headers: {
  //         'Content-Type': 'application/json'
  //     },
  //   })
  //   if(resp.status === 200){
  //     console.log('deleted', user)
  //     setPerson1('')
  //     setPerson2('')
  //     setDateDuty([])
  //     getCalendarDatesByDate()
  //   }
  // }

  console.log('dateDuty:', dateDuty, day, place)


  if(stuff === true){
    return(
      <View>
        <View>
          <SelectList 
            setSelected={(val) => setPlace(val)} 
            data={dataPlaces} 
            save="value" 
            placeholder={
              <View style={styles.placeholder}>
                <Icon name='business' size={20} color={'white'} />
                <Text style={styles.text}>{trans.Stand}</Text>
              </View>
            }
            boxStyles={styles.stand}
            inputStyles={styles.input}
            dropdownItemStyles={{color: 'white'}}
            dropdownTextStyles={{color: 'white'}}
            arrowicon={<Icon name="chevron-down" size={20} color={'white'} />} 
            searchicon={<Icon name="search" size={20} color={'white'} />} 
            closeicon={<Icon name="close" size={20} color={'white'} />} 
            search={true}
            dropdownStyles={styles.dropdown}
          />
          <SelectList 
            setSelected={(val) => setPerson1(val)} 
            data={data} 
            save="value" 
            placeholder={
              <View style={styles.placeholder}>
                <Icon name='business' size={20} color={'white'} />
                <Text style={styles.text}>{trans.Stand}</Text>
              </View>
            }
            boxStyles={styles.stand}
            inputStyles={styles.input}
            dropdownItemStyles={{color: 'white'}}
            dropdownTextStyles={{color: 'white'}}
            arrowicon={<Icon name="chevron-down" size={20} color={'white'} />} 
            searchicon={<Icon name="search" size={20} color={'white'} />} 
            closeicon={<Icon name="close" size={20} color={'white'} />} 
            search={true}
            dropdownStyles={styles.dropdown}
          />
          <SelectList 
            setSelected={(val) => setPerson2(val)} 
            data={data} 
            save="value" 
            placeholder={
              <View style={styles.placeholder}>
                <Icon name='business' size={20} color={'white'} />
                <Text style={styles.text}>{trans.Stand}</Text>
              </View>
            }
            boxStyles={styles.stand}
            inputStyles={styles.input}
            dropdownItemStyles={{color: 'white'}}
            dropdownTextStyles={{color: 'white'}}
            arrowicon={<Icon name="chevron-down" size={20} color={'white'} />} 
            searchicon={<Icon name="search" size={20} color={'white'} />} 
            closeicon={<Icon name="close" size={20} color={'white'} />} 
            search={true}
            dropdownStyles={styles.dropdown}
          />
          <SelectList 
            setSelected={(val) => setTime(val)} 
            data={TIME} 
            save="value" 
            placeholder={
              <View style={styles.placeholder}>
                <Icon name='business' size={20} color={'white'} />
                <Text style={styles.text}>{trans.Time}</Text>
              </View>
            }
            boxStyles={styles.stand}
            inputStyles={styles.input}
            dropdownItemStyles={{color: 'white'}}
            dropdownTextStyles={{color: 'white'}}
            arrowicon={<Icon name="chevron-down" size={20} color={'white'} />} 
            searchicon={<Icon name="search" size={20} color={'white'} />} 
            closeicon={<Icon name="close" size={20} color={'white'} />} 
            search={true}
            dropdownStyles={styles.dropdown}
          />
          <ScheduleBtn 
            onPress={() => setStand(person1, person2, time, place)}
            title={trans.Submit}
          />
          <ScheduleBtn 
            onPress={() => navigation.navigate('AutoStand')}
            title={'Auto'}
          />
          </View>
          <View>
            {dateDuty.map((person, index) => (
              
            <StandWithPerson 
              key={person.id}
              person={person}
              day={day}
              users={data}
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
              
            <StandWithPerson 
              key={person.id}
              person={person}
              day={day}
              users={data}
            />
            ))}
          </View>
      </View>
    )
  }


}

export default Stand
