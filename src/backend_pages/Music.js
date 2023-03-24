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
import ShowStuff from './ShowStuff';

const Music = ({day, navigation}) => {

    const {proxy, congr, stuff} = useContext(AuthContext);
    const c = congr()
    const {trans} = useContext(LanguageContext);
    const [selected, setSelected] = useState('')
    const [users, setUsers] = useState([])
    const [dateMusic, setDateMusic] = useState([])
    const USERS = {}
    const [live, setLive] = useState(true)
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
    const body = {'date': day, 'action': 'Music', 'congregation': datas.congregation}
    const resp = await fetch(`${proxy}/backend/get_calendar_date/`, {
      method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(body),
        });
        const data = await resp.json();
        if(data){
          setDateMusic(data)
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

  const setMusic = async(selected) => {
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
              'action': 'Music',
              'congregation': datas.congregation,
              'groupe': null,
              'icon': 'md-headset',
            })
          })   
        }
      }
    })
    const body = {'date': day, 'action': 'Music', 'congregation': datas.congregation}
    const resp = await fetch(`${proxy}/backend/get_calendar_date/`, {
      method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(body),
        });
        const data = await resp.json();
        if(data){
          setDateMusic(data)
        }  
    getCalendarDatesByDate()
  }

  console.log('dateMusic:', dateMusic, day)


  return (
    <View>
    <View style={styles.row}>
      <MultipleSelectList 
        setSelected={(val) => setSelected(val)} 
        data={data} 
        save="value" 
        placeholder={
          <View style={styles.placeholder}>
            <Icon name='briefcase-sharp' size={20} color={'white'} />
            <Text style={styles.text}>{trans.Music}</Text>
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
      <TalkBtn onPress={() => setMusic(selected)}/>
      </View>
      <View>
        {dateMusic.map((person, index) => (
          <ShowStuff 
          key={person.id}
          person={person}
          USERS={USERS}
          action={'Music'}
          day={day}
          stuff={stuff}
        />
        ))}
      </View>
    </View>
        )






// if(dateMusic.length > 1 && stuff === true){
//   return ( 
//     dateMusic.map((e) => {
//       if(e.date === day && e.action === 'Music'){  
//           return  <View style={styles.user}>
//           <Icon name='md-headset' size={20} color={'#F9F9B5'} />
//           <Text style={styles.user_text}>{USERS[e.user]}</Text>
//               <Icon 
//                   name="close-circle-outline" 
//                   size={20} 
//                   color={'white'} 
//                   onPress={() => deleteMicrophone(e)}     
//                   />
//           </View>  
                              
//       }
//   }) 

//   )
//     }else if(dateMusic.length === 0 && stuff === true){
//         return (
//             <View style={styles.row}>
//               <MultipleSelectList 
//                 setSelected={(val) => setSelected(val)} 
//                 data={data} 
//                 save="value"
//                 // onSelect={(value) => alert(`${value}`)} 
//                 placeholder={
//                   <View style={styles.placeholder}>
//                     <Icon name='md-headset' size={20} color={'white'} />
//                     <Text style={styles.text}>{trans.Music}</Text>
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
//               />
//               <TalkBtn onPress={() => setMicrophones(selected)}/>
//             </View>
//         )
//     }else if(dateMusic.length == 1 && stuff === true){
//         return ( 
//             dateMusic.map((e) => {
//               if(e.date === day && e.action === 'Music'){  
//                   return  <View>
//                     <View style={styles.user}>
//                     <Icon name='md-headset' size={20} color={'#F9F9B5'} />
//                       <Text style={styles.user_text}>{USERS[e.user]}</Text>
//                           <Icon 
//                               name="close-circle-outline" 
//                               size={20} 
//                               color={'white'} 
//                               onPress={() => deleteMicrophone(e)}     
//                               />
//                     </View>
//                     <View style={styles.row}>
//                       <MultipleSelectList 
//                       setSelected={(val) => setSelected(val)} 
//                       data={data} 
//                       save="value"
//                       // onSelect={() => alert('selected')} 
//                       placeholder={
//                         <View style={styles.placeholder}>
//                           <Icon name='md-headset' size={20} color={'white'} />
//                           <Text style={styles.text}>Music</Text>
//                         </View>
//                       }
//                       boxStyles={styles.event}
//                       inputStyles={styles.input}
//                       dropdownItemStyles={{color: 'white'}}
//                       dropdownTextStyles={{color: 'white'}}
//                       arrowicon={<Icon name="chevron-down" size={20} color={'white'} />} 
//                       searchicon={<Icon name="search" size={20} color={'white'} />} 
//                       closeicon={<Icon name="close" size={20} color={'white'} />} 
//                       search={true}
//                       />
//                       <TalkBtn onPress={() => setMicrophones(selected)}/>
//                     </View>
//                   </View>
                  
                                      
//               }
//           })  
  
//           )
//   }else if(dateMusic.length >= 1 && stuff === false){
//     return ( 
//       dateMusic.map((e) => {
//         if(e.date === day && e.action === 'Music'){  
//             return  <View style={styles.user}>
//             <Icon name='md-headset' size={20} color={'#F9F9B5'} />
//             <Text style={styles.user_text}>{USERS[e.user]}</Text>
//             </View>  
                                
//         }
//     }) 
  
//     )
//       }
}

export default Music
