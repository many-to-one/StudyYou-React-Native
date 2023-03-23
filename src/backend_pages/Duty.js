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

const Duty = ({day, navigation}) => {

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
      const resp = await fetch(`${proxy}/users/users_by_helper/${datas.congregation}/`)
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

  const setMicrophones = async(selected) => {
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
              'action': 'Duty',
              'congregation': datas.congregation,
              'groupe': null,
              'icon': 'man-sharp',
              'person': null
            })
          })   
        }
      }
    })
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

  const deleteMicrophone = async(user) => {
    const resp = await fetch(`${proxy}/backend/delete_calendar/${user.id}/`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
      },
    })
    if(resp.status === 200){
      console.log('deleted', user)
      setSelected([])
      setDateDuty([])
      getCalendarDatesByDate()
    }
  }

  console.log('dateDuty:', dateDuty, day)

if(dateDuty.length > 1 && stuff === true){
  return ( 
    dateDuty.map((e) => {
      if(e.date === day && e.action === 'Duty'){            
        return  <View style={styles.user}>
                  <Icon name='man-sharp' size={20} color={'#F9F9B5'} />
                  <Text style={styles.user_text}>{USERS[e.user]}</Text>
                    <Icon 
                      name="close-circle-outline" 
                      size={20} 
                      color={'white'} 
                      onPress={() => deleteMicrophone(e)}     
                    />
                </View>                           
      }
  }) 

  )
    }else if(dateDuty.length === 0 && stuff === true){
        return (
            <View style={styles.row}>
              <MultipleSelectList 
                setSelected={(val) => setSelected(val)} 
                data={data} 
                save="value"
                // onSelect={(value) => alert(`${value}`)} 
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
              />
              <TalkBtn onPress={() => setMicrophones(selected)}/>
            </View>
        )
    }else if(dateDuty.length === 1 && stuff === true){
      return ( 
        dateDuty.map((e) => {
            if(e.date === day && e.action === 'Duty'){  
                return  <View>
                  <View style={styles.user}>
                  <Icon name='man-sharp' size={20} color={'#F9F9B5'} />
                    <Text style={styles.user_text}>{USERS[e.user]}</Text>
                        <Icon 
                            name="close-circle-outline" 
                            size={20} 
                            color={'#F9F9B5'} 
                            onPress={() => deleteMicrophone(e)}     
                            />
                  </View>
                  <View style={styles.row}>
                    <MultipleSelectList 
                    setSelected={(val) => setSelected(val)} 
                    data={data} 
                    save="value"
                    // onSelect={() => alert('selected')} 
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
                    />
                    <TalkBtn onPress={() => setMicrophones(selected)}/>
                  </View>
                </View>
                
                                    
            }
        }) 

        )
}else if(dateDuty.length >= 1 && stuff === false){
  return ( 
    dateDuty.map((e) => {
      if(e.date === day && e.action === 'Duty'){            
        return  <View style={styles.user}>
                  <Icon name='man-sharp' size={20} color={'#F9F9B5'} />
                  <Text style={styles.user_text}>{USERS[e.user]}</Text>
                </View>                           
      }
  }) 

  )
    }
}

export default Duty
