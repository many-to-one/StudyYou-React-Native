import React, { useContext, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { AuthContext } from '../context/AuthContext';
import { SelectList  } from 'react-native-dropdown-select-list';
import Icon from "react-native-vector-icons/Ionicons";
import { useIsFocused } from '@react-navigation/native';
import { LanguageContext } from '../context/LanguageContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../styles/Styles';
import TalkBtn from '../buttons/TalkBtn';
import ShowStuff from './ShowStuff';

const WatchTowerLeader = ({day, week_ago, navigation}) => {

    const {proxy, stuff} = useContext(AuthContext);
    const {trans} = useContext(LanguageContext);
    const [selected, setSelected] = useState('')
    const [users, setUsers] = useState([])
    const [dateWatchTowerLeader, setDateWatchTowerLeader] = useState([])
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
    const body = {'date': day, 'action': 'WatchTowerLeader', 'congregation': datas.congregation}
    const resp = await fetch(`${proxy}/backend/get_calendar_date/`, {
      method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(body),
        });
        const data = await resp.json();
        if(data){
            setDateWatchTowerLeader(data)
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

  const setWatchTowerLeader = async(selected) => {
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
              'action': 'WatchTowerLeader',
              'congregation': datas.congregation,
              'groupe': null,
              'icon': 'person-sharp',
            })
          })   
        }
      }
    const body = {'date': day, 'action': 'WatchTowerLeader', 'congregation': datas.congregation}
    const resp = await fetch(`${proxy}/backend/get_calendar_date/`, {
      method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(body),
        });
        const data = await resp.json();
        if(data){
          setDateWatchTowerLeader(data)
        }
    getCalendarDatesByDate()
  }


  console.log('dateWatchTowerLeader:', dateWatchTowerLeader, day)


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
                <Icon name='person-sharp' size={20} color={'white'} />
                <Text style={styles.text}>{trans.WatchTowerLeader}</Text>
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
          <TalkBtn onPress={() => setWatchTowerLeader(selected)}/>
        </View>
        <View>
          {dateWatchTowerLeader.map((person, index) => (
            <ShowStuff 
            key={person.id}
            person={person}
            USERS={USERS}
            action={'WatchTowerLeader'} 
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
          {dateWatchTowerLeader.map((person, index) => (
            <ShowStuff 
            key={person.id}
            person={person}
            USERS={USERS}
            action={'WatchTowerLeader'} 
            day={day}
            stuff={stuff}
          />
          ))}
        </View>
      </View>
    )
  }



// if(dateWatchTowerLeader.length === 1 && stuff === true){
//   return ( 
//     dateWatchTowerLeader.map((e) => {
//       if(e.date === day && e.action === 'WatchTowerLeader'){  
//           return  <View style={styles.user}>
//           <Icon name='person-sharp' size={20} color={'#F9F9B5'} />
//           <Text style={styles.user_text}>{USERS[e.user]}</Text>
//               <Icon 
//                   name="close-circle-outline" 
//                   size={20} 
//                   color={'white'} 
//                   onPress={() => deleteWatchTowerLeader(e)}     
//                   />
//           </View>  
                              
//       }
//   }) 

//   )
     
// }else if(dateWatchTowerLeader.length === 0 && stuff === true){
//         return (
//             <View style={styles.row}>
//               <SelectList 
//                 setSelected={(val) => setSelected(val)} 
//                 data={data} 
//                 save="value"
//                 // onSelect={(value) => alert(`${value}`)} 
//                 placeholder={
//                   <View style={styles.placeholder}>
//                     <Icon name='person-sharp' size={20} color={'white'} />
//                     <Text style={styles.text}>{trans.WatchTowerLeader}</Text>
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
//               <TalkBtn onPress={() => setWatchTowerLeader(selected)}/>
//             </View>
//         )
//   }else if(dateWatchTowerLeader.length === 1 && stuff === false){
//       return ( 
//         dateWatchTowerLeader.map((e) => {
//           if(e.date === day && e.action === 'WatchTowerLeader'){  
//               return  <View style={styles.user}>
//               <Icon name='person-sharp' size={20} color={'#F9F9B5'} />
//               <Text style={styles.user_text}>{USERS[e.user]}</Text>
//               </View>                               
//           }
//         }) 
//       )     
//     }
}

export default WatchTowerLeader
