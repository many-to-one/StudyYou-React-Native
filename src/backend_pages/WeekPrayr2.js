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

const WeekPrayer2 = ({day, week_ago, navigation}) => {

    const {proxy, stuff} = useContext(AuthContext);
    const {trans} = useContext(LanguageContext);
    const [selected, setSelected] = useState('')
    const [users, setUsers] = useState([])
    const [dateWeekPrayer2, setDateWeekPrayer2] = useState([])
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
    const body = {'date': day, 'action': 'LastPrayer', 'congregation': datas.congregation}
    const resp = await fetch(`${proxy}/backend/get_calendar_date/`, {
      method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(body),
        });
        const data = await resp.json();
        if(data){
          setDateWeekPrayer2(data)
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

  const setWeekPrayer2 = async(selected) => {
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
              'action': 'LastPrayer',
              'congregation': datas.congregation,
              'groupe': null,
              'icon': 'ios-layers',
            })
          })    
        }
      }
    const body = {'date': day, 'action': 'LastPrayer', 'congregation': datas.congregation,}
    const resp = await fetch(`${proxy}/backend/get_calendar_date/`, {
      method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(body),
        });
        const data = await resp.json();
        if(data){
          setDateWeekPrayer2(data)
        } 
    getCalendarDatesByDate()
  }


  console.log('dateWeekPrayer2:', dateWeekPrayer2, day)



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
                <Text style={styles.text}>{trans.LastPrayer}</Text>
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
          <TalkBtn onPress={() => setWeekPrayer2(selected)}/>
        </View>
        <View>
          {dateWeekPrayer2.map((person, index) => (
            <ShowStuff 
            key={person.id}
            person={person}
            USERS={USERS}
            action={'LastPrayer'} 
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
          {dateWeekPrayer2.map((person, index) => (
            <ShowStuff 
            key={person.id}
            person={person}
            USERS={USERS}
            action={'LastPrayer'} 
            day={day}
            stuff={stuff}
          />
          ))}
        </View>
      </View>
    )
  }



// if(dateWeekPrayer2.length === 1 && stuff === true){
//   return ( 
//     dateWeekPrayer2.map((e) => {
//       if(e.date === day && e.action === 'LastPrayer'){  
//           return  <View style={styles.user}>
//           <Icon name='ios-layers' size={20} color={'#F9F9B5'} />
//           <Text style={styles.user_text}>{USERS[e.user]}</Text>
//               <Icon 
//                   name="close-circle-outline" 
//                   size={20} 
//                   color={'white'} 
//                   onPress={() => deleteWeekPrayer2(e)}     
//                   />
//           </View>  
                              
//       }
//   }) 

//   )
     
// }else if(dateWeekPrayer2.length === 0 && stuff === true){
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
//                     <Text style={styles.text}>{trans.LastPrayer}</Text>
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
//               <TalkBtn onPress={() => setWeekPrayer2(selected)}/>
//             </View>
//   )}else if(dateWeekPrayer2.length === 1 && stuff === false){
//     return ( 
//       dateWeekPrayer2.map((e) => {
//         if(e.date === day && e.action === 'LastPrayer'){  
//           return  <View style={styles.user}>
//           <Icon name='ios-layers' size={20} color={'#F9F9B5'} />
//           <Text style={styles.user_text}>{USERS[e.user]}</Text>
//           </View>                            
//         }
//       }) 
//     )     
//   }
}

export default WeekPrayer2
