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

const Cleaning = ({day, week_ago, navigation}) => {

    const {proxy, congr, stuff} = useContext(AuthContext); //////////////////
    const c = congr() /////////////////////
    const {trans} = useContext(LanguageContext);
    const [selected, setSelected] = useState('')
    const [users, setUsers] = useState([])
    const [dateCleaning, setDateCleaning] = useState([])
    const USERS = {}
    const [congregation, setCongregation] = useState(true)
    const isFocused = useIsFocused();

    useEffect(() => {
      getUsersByGroupe()
  }, [isFocused])

  useEffect(() => {
    getCalendarDatesByDate()
}, [isFocused])

  const getUsersByGroupe = async() => {
    let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))        ///////////////////
    const resp = await fetch(`${proxy}/users/users_by_groupe/${datas.congregation}/${selected}/`)    ///////////////
      const data = await resp.json();
      if(resp.status === 200){
        console.log('gra')
        setUsers(data)
        setCongregation(datas.congregation)
      }
  }

  const getCalendarDatesByDate = async() => {
    let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))  /////////////////
    const body = {'date': day, 'action': 'Cleaning', 'groupe': `${selected}`, 'congregation': datas.congregation}  ////////////////
    const resp = await fetch(`${proxy}/backend/get_calendar_date/`, {
      method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(body),
        });
        const data = await resp.json();
        if(data){
          console.log('dateCl', data)
          setDateCleaning(data)
          setUsers(data)
          setSelected([])
        }  
  }

  for(let i=0; i<users.length; i++){
    USERS[users[i].id] = users[i].groupe
  }

  const data = []

  for (const [key, value] of Object.entries(USERS)) {
    data.push(
      {key:key, value:value},
    )
  }

  const groups = [
    {key: '1', value: '1'},
    {key: '2', value: '2'},
    {key: '3', value: '3'},
    {key: '4', value: '4'},
    {key: '5', value: '5'},
    {key: '6', value: '6'},
    {key: '7', value: '7'},
    {key: '8', value: '8'},
    {key: '9', value: '9'},
    {key: '10', value: '10'},
  ]

  // console.log('USERS', USERS)
  console.log('selected', selected)

  const setCleaning = async(selected) => {
    let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))  /////////////////////
    console.log('USERS', USERS)

      const resp1 = await fetch(`${proxy}/backend/set_calendar/${datas.id}/${week_ago}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'date': `${day}`,
          'action': 'Cleaning',
          'congregation': datas.congregation, 
          'groupe': `${selected}`, 
          'icon': 'ios-water',
        })
      })   

    const body = {'date': day, 'action': 'Cleaning', 'groupe': `${selected}`, 'congregation': datas.congregation}   /////////////////////////
    const resp2 = await fetch(`${proxy}/backend/get_calendar_date/`, {
      method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(body),
        });
        const data = await resp2.json();
        if(data){
          setDateCleaning(data)
        }
    getCalendarDatesByDate()
  }


console.log('dateCleaning:', dateCleaning, stuff)


if(stuff === true){
  return(
    <View>
    <View style={styles.row}>
      <SelectList 
        setSelected={(val) => setSelected(val)} 
        data={groups} 
        save="value" 
        placeholder={
          <View style={styles.placeholder}>
            <Icon name='briefcase-sharp' size={20} color={'white'} />
            <Text style={styles.text}>{trans.Cleaning}</Text>
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
      <TalkBtn onPress={() => setCleaning(selected)}/>
      </View>
      <View>
        {dateCleaning.map((person, index) => (
          <ShowStuff 
          key={person.id}
          person={person}
          USERS={USERS}
          action={'Cleaning'}
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
        {dateCleaning.map((person, index) => (
          <ShowStuff 
          key={person.id}
          person={person}
          USERS={USERS}
          action={'Cleaning'}
          day={day}
          stuff={stuff}
        />
        ))}
      </View>
    </View>
  )
}


// if(dateMicrophones.length > 1 && stuff === true){
//   return ( 
//     dateMicrophones.map((e) => {
//         if(e.date === day && e.action === 'Cleaning'){  
//             return  <View style={styles.user}>
//             <Icon name='ios-water' size={20} color={'#F9F9B5'} />
//             <Text style={styles.user_text}>{e.groupe}</Text>
//                 <Icon 
//                     name="close-circle-outline" 
//                     size={20} 
//                     color={'#F9F9B5'} 
//                     onPress={() => deleteMicrophone(e)}     
//                     />
//             </View>  

//         }
//     }) 

//   )
//     }else if(dateMicrophones.length === 0 && stuff === true){
//         return (
//             <View style={styles.row}>
//               <MultipleSelectList 
//                 setSelected={(val) => setSelected(val)} 
//                 data={groups} 
//                 save="value"
//                 onSelect={() => getUsersByGroupe()} 
//                 placeholder={
//                   <View style={styles.placeholder}>
//                     <Icon name='ios-water' size={20} color={'white'} />
//                     <Text style={styles.text}>{trans.Cleaning}</Text>
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
//               <TalkBtn onPress={() => setCleaning(selected)}/>
//             </View>
//         )
//     }else if(dateMicrophones.length === 1 && stuff === true){
//         return ( 
//           dateMicrophones.map((e) => {
//               if(e.date === day && e.action === 'Cleaning'){  
//                   return  <View>
//                     <View style={styles.user}>
//                     <Icon name='ios-water' size={20} color={'#F9F9B5'} />
//                       <Text style={styles.user_text}>{e.groupe}</Text>
//                           <Icon 
//                               name="close-circle-outline" 
//                               size={20} 
//                               color={'#F9F9B5'} 
//                               onPress={() => deleteMicrophone(e)}     
//                               />
//                     </View>
//                   </View>
                  
                                      
//               }
//           }) 
  
//           )
//   }else if(dateMicrophones.length >= 1 && stuff === false){
//     return ( 
//       dateMicrophones.map((e) => {
//           if(e.date === day && e.action === 'Cleaning'){  
//               return  <View style={styles.user}>
//               <Icon name='ios-water' size={20} color={'#F9F9B5'} />
//               <Text style={styles.user_text}>{e.groupe}</Text>
//               </View>  
  
//           }
//       }) 
  
//     )
//       }
}

export default Cleaning
