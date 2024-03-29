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

const WeekPrayer1 = ({day, week_ago, navigation}) => {

    const {proxy, stuff} = useContext(AuthContext);
    const {trans} = useContext(LanguageContext);
    const [selected, setSelected] = useState('')
    const [users, setUsers] = useState([])
    const [dateWeekPrayer1, setDateWeekPrayer1] = useState([])
    const USERS = {}
    const isFocused = useIsFocused();

    useEffect(() => {
      getUsers()
  }, [isFocused])

  const getUsers = async() => {
    let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
    const resp = await fetch(`${proxy}/users/users_by_helper/${datas.congregation}/`)
      const data = await resp.json();
      if(resp.status === 200){
        setUsers(data)
        getCalendarDatesByDate()
      }
  }

  const getCalendarDatesByDate = async() => {
    let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
    const body = {'date': day, 'action': 'FirstPrayer', 'congregation': datas.congregation}
    const resp = await fetch(`${proxy}/backend/get_calendar_date/`, {
      method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(body),
        });
        const data = await resp.json();
        if(data){
          setDateWeekPrayer1(data)
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

  const setWeekPrayer1 = async(selected) => {
    let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
      for(let k in USERS){  
        if(selected === USERS[k]){
          fetch(`${proxy}/backend/set_calendar/${k}/${week_ago}/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              'date': `${day}`,
              'action': 'FirstPrayer',
              'congregation': datas.congregation,
              'groupe': null,
              'icon': 'ios-layers',
            })
          })    
        }
      }
    const body = {'date': day, 'action': 'Prayer 1 (week)', 'congregation': datas.congregation,}
    const resp = await fetch(`${proxy}/backend/get_calendar_date/`, {
      method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(body),
        });
        const data = await resp.json();
        if(data){
          setDateWeekPrayer1(data)
        }
    getCalendarDatesByDate()
  }

  const deleteWeekPrayer1 = async(user) => {
    const resp = await fetch(`${proxy}/backend/delete_calendar/${user.id}/`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
      },
    })
    if(resp.status === 200){
      console.log('deleted', user)
      setSelected([])
      setDateWeekPrayer1([])
      getCalendarDatesByDate()
    }
  }

  console.log('dateWeekPrayer1:', dateWeekPrayer1, stuff)


  if(stuff === true){
    return(
      <View>
        <View style={styles.row}>
            <SelectList 
              setSelected={(val) => setSelected(val)} 
              data={data} 
              save="value"
              // onSelect={(value) => alert(`${value}`)} 
              placeholder={
                <View style={styles.placeholder}>
                  <Icon name='ios-layers' size={20} color={'white'} />
                  <Text style={styles.text}>{trans.FirstPrayer}</Text>
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
            />
            <TalkBtn onPress={() => setWeekPrayer1(selected)}/>
          </View>
          <View>
          {dateWeekPrayer1.map((person, index) => (
            <ShowStuff 
            key={person.id}
            person={person}
            USERS={USERS}
            action={'FirstPrayer'}
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
          {dateWeekPrayer1.map((person, index) => (
            <ShowStuff 
            key={person.id}
            person={person}
            USERS={USERS}
            action={'FirstPrayer'}
            day={day}
            stuff={stuff}
          />
          ))}
        </View>
      </View>
    )
  }


// if(dateWeekPrayer1.length === 1 && stuff === true){
//   return ( 
//     dateWeekPrayer1.map((e) => {
//       if(e.date === day && e.action === 'FirstPrayer'){  
//           return  <View style={styles.user}>
//           <Icon name='ios-layers' size={20} color={'#F9F9B5'} />
//           <Text style={styles.user_text}>{USERS[e.user]}</Text>
//               <Icon 
//                   name="close-circle-outline" 
//                   size={20} 
//                   color={'white'} 
//                   onPress={() => deleteWeekPrayer1(e)}     
//                   />
//           </View>  
                              
//       }
//   }) 

//   )
     
// }else if(dateWeekPrayer1.length === 0 && stuff === true){
//         return (
//             <View style={styles.row}>
//               <SelectList 
//                 setSelected={(val) => setSelected(val)} 
//                 data={data} 
//                 save="value"
//                 // onSelect={(value) => alert(`${value}`)} 
//                 placeholder={
//                   <View style={styles.placeholder}>
//                     <Icon name='ios-layers' size={20} color={'white'} />
//                     <Text style={styles.text}>{trans.FirstPrayer}</Text>
//                   </View>
//                 }
//                 boxStyles={styles.event}
//                 inputStyles={styles.input}
//                 dropdownItemStyles={{color: 'white'}}
//                 dropdownTextStyles={{color: 'white'}}
//                 arrowicon={<Icon name="chevron-down" size={20} color={'white'} />} 
//                 searchicon={<Icon name="search" size={20} color={'white'} />} 
//                 closeicon={<Icon name="close" size={20} color={'white'} />} 
//                 search={true}
//                 dropdownStyles={styles.dropdown}
//               />
//               <TalkBtn onPress={() => setWeekPrayer1(selected)}/>
//             </View>
//         )
// }else if(dateWeekPrayer1.length === 1 && stuff === false){
//   return ( 
//     dateWeekPrayer1.map((e) => {
//       if(e.date === day && e.action === 'FirstPrayer'){  
//           return  <View style={styles.user}>
//           <Icon name='ios-layers' size={20} color={'#F9F9B5'} />
//           <Text style={styles.user_text}>{USERS[e.user]}</Text>
//           </View>  
                              
//       }
//     }) 
//   )     
// }
}

export default WeekPrayer1
