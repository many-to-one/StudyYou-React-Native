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

const WeekSchoolLeader = ({day, week_ago, navigation}) => {

    const {proxy, stuff} = useContext(AuthContext);
    const {trans} = useContext(LanguageContext);
    const [selected, setSelected] = useState('')
    const [users, setUsers] = useState([])
    const [dateWeekSchoolLeader, setDateWeekSchoolLeader] = useState([])
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
    const body = {'date': day, 'action': 'SchoolLeader', 'congregation': datas.congregation}
    const resp = await fetch(`${proxy}/backend/get_calendar_date/`, {
      method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(body),
        });
        const data = await resp.json();
        if(data){
            setDateWeekSchoolLeader(data)
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

  const setWeekSchoolLeader = async(selected) => {
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
              'action': 'SchoolLeader',
              'congregation': datas.congregation,
              'groupe': null,
              'icon': 'school-sharp',
            })
          })    
        }
      }
    const body = {'date': day, 'action': 'SchoolLeader', 'congregation': datas.congregation,}
    const resp = await fetch(`${proxy}/backend/get_calendar_date/`, {
      method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(body),
        });
        const data = await resp.json();
        if(data){
          setDateWeekSchoolLeader(data)
        }  
    getCalendarDatesByDate()
  }

  console.log('dateWeekSchoolLeader:', dateWeekSchoolLeader, day)



  if(stuff === true){
    return(
      <View>
        <View style={styles.row}>
          <SelectList 
            setSelected={(val) => setSelected(val)} 
            data={data} 
            save="value"
            // onSelect={(value) => setWeekSchoolLeader(value)} 
            placeholder={
              <View style={styles.placeholder}>
                <Icon name='school-sharp' size={20} color={'white'} />
                <Text style={styles.text}>{trans.SchoolLeader}</Text>
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
          <TalkBtn onPress={() => setWeekSchoolLeader(selected)}/>
        </View>
        <View>
          {dateWeekSchoolLeader.map((person, index) => (
            <ShowStuff 
            key={person.id}
            person={person}
            USERS={USERS}
            action={'SchoolLeader'} 
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
          {dateWeekSchoolLeader.map((person, index) => (
            <ShowStuff 
            key={person.id}
            person={person}
            USERS={USERS}
            action={'SchoolLeader'} 
            day={day}
            stuff={stuff}
          />
          ))}
        </View>
      </View>
    )
  }



// if(dateWeekSchoolLeader.length === 1 && stuff === true){
//   return ( 
//     dateWeekSchoolLeader.map((e) => {
//       if(e.date === day && e.action === 'SchoolLeader'){  
//           return  <View style={styles.user}>
//           <Icon name='school-sharp' size={20} color={'#F9F9B5'} />
//           <Text style={styles.user_text}>{USERS[e.user]}</Text>
//             <Icon 
//               name="close-circle-outline" 
//               size={20} 
//               color={'white'} 
//               onPress={() => deleteWeekSchoolLeader(e)}     
//               />
//           </View>  
                              
//       }
//   }) 

//   )
     
// }else if(dateWeekSchoolLeader.length === 0 && stuff === true){
//         return (
//             <View style={styles.row}>
//               <SelectList 
//                 setSelected={(val) => setSelected(val)} 
//                 data={data} 
//                 save="value"
//                 // onSelect={(value) => alert(`${value}`)} 
//                 placeholder={
//                   <View style={styles.placeholder}>
//                     <Icon name='school-sharp' size={20} color={'white'} />
//                     <Text style={styles.text}>{trans.SchoolLeader}</Text>
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
//               <TalkBtn onPress={() => setWeekSchoolLeader(selected)}/>
//             </View>
//   )}else if(dateWeekSchoolLeader.length === 1 && stuff === false){
//     return ( 
//       dateWeekSchoolLeader.map((e) => {
//         if(e.date === day && e.action === 'SchoolLeader'){  
//             return  <View style={styles.user}>
//             <Icon name='school-sharp' size={20} color={'#F9F9B5'} />
//             <Text style={styles.user_text}>{USERS[e.user]}</Text>
//             </View>                          
//         }
//       }) 
//     )    
//   }
}

export default WeekSchoolLeader
