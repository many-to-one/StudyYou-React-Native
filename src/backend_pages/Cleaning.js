import React, { useContext, useEffect, useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { AuthContext } from '../context/AuthContext';
import { MultipleSelectList  } from 'react-native-dropdown-select-list';
import Icon from "react-native-vector-icons/Ionicons";
import { useIsFocused } from '@react-navigation/native';
import ScheduleBtn from '../buttons/ScheduleBtn';
import { LanguageContext } from '../context/LanguageContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cleaning = ({day, navigation}) => {

    const {proxy, congr, stuff} = useContext(AuthContext); //////////////////
    const c = congr() /////////////////////
    const {trans} = useContext(LanguageContext);
    const [selected, setSelected] = useState('')
    const [users, setUsers] = useState([])
    const [dateMicrophones, setDateMicrophones] = useState([])
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
    const body = {'date': day, 'action': 'Cleaning', 'congregation': datas.congregation}  ////////////////
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
          setDateMicrophones(data)
          setUsers(data)
          setSelected([])
          // setDateMicrophones([])
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

  console.log('USERS', USERS)
  console.log('selected', selected)
  const setCleaning = async(selected) => {
    let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))  /////////////////////
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
              'action': 'Cleaning',
              'congregation': datas.congregation, 
              'groupe': `${e}`, 
              'icon': 'ios-water',
            })
          })   
        }
      }
    })
    const body = {'date': day, 'action': 'Cleaning', 'congregation': datas.congregation}   /////////////////////////
    const resp = await fetch(`${proxy}/backend/get_calendar_date/`, {
      method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(body),
        });
        const data = await resp.json();
        if(data){
          setDateMicrophones(data)
        }
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
      setDateMicrophones([])
      getCalendarDatesByDate()
    }
  }

console.log('dateCleaning:', dateMicrophones, stuff)

if(dateMicrophones.length > 1 && stuff === true){
  return ( 
    dateMicrophones.map((e) => {
        if(e.date === day && e.action === 'Cleaning'){  
            return  <View style={styles.user}>
            <Icon name='ios-water' size={20} color={'#F9F9B5'} />
            <Text style={styles.user_text}>{e.groupe}</Text>
                <Icon 
                    name="close-circle-outline" 
                    size={20} 
                    color={'#F9F9B5'} 
                    onPress={() => deleteMicrophone(e)}     
                    />
            </View>  

        }
    }) 

  )
    }else if(dateMicrophones.length === 0 && stuff === true){
        return (
            <View >
              <MultipleSelectList 
                setSelected={(val) => setSelected(val)} 
                data={groups} 
                save="value"
                onSelect={() => getUsersByGroupe()} 
                placeholder={
                  <View style={styles.placeholder}>
                    <Icon name='ios-water' size={20} color={'white'} />
                    <Text style={styles.text}>{trans.Microphones}</Text>
                  </View>
                }
                boxStyles={styles.event}
                inputStyles={styles.input}
                dropdownStyles={styles.box}
                dropdownItemStyles={{color: 'white'}}
                dropdownTextStyles={{color: 'white'}}
                arrowicon={<Icon name="chevron-down" size={20} color={'white'} />} 
                searchicon={<Icon name="search" size={20} color={'white'} />} 
                closeicon={<Icon name="close" size={20} color={'white'} />} 
                search={true}
              />
              <ScheduleBtn 
                  style={{backgroundColor: '#F9F9B5',}}
                  title={'Submit'}
                  onPress={() => setCleaning(selected)}
              />
            </View>
        )
    }else if(dateMicrophones.length === 1 && stuff === true){
        return ( 
          dateMicrophones.map((e) => {
              if(e.date === day && e.action === 'Cleaning'){  
                  return  <View>
                    <View style={styles.user}>
                    <Icon name='ios-water' size={20} color={'#F9F9B5'} />
                      <Text style={styles.user_text}>{e.groupe}</Text>
                          <Icon 
                              name="close-circle-outline" 
                              size={20} 
                              color={'#F9F9B5'} 
                              onPress={() => deleteMicrophone(e)}     
                              />
                    </View>
                    <MultipleSelectList 
                    setSelected={(val) => setSelected(val)} 
                    data={data} 
                    save="value"
                    // onSelect={() => alert('selected')} 
                    placeholder={
                      <View style={styles.placeholder}>
                        <Icon name='ios-water' size={20} color={'white'} />
                        <Text style={styles.text}>{trans.Microphones}</Text>
                      </View>
                    }
                    boxStyles={styles.event}
                    inputStyles={styles.input}
                    dropdownStyles={styles.box}
                    dropdownItemStyles={{color: 'white'}}
                    dropdownTextStyles={{color: 'white'}}
                    arrowicon={<Icon name="chevron-down" size={20} color={'white'} />} 
                    searchicon={<Icon name="search" size={20} color={'white'} />} 
                    closeicon={<Icon name="close" size={20} color={'white'} />} 
                    search={true}
                    />
                    <ScheduleBtn 
                        style={{backgroundColor: '#F9F9B5',}}
                        title={'Submit'}
                        onPress={() => setCleaning(selected)}
                    />
                  </View>
                  
                                      
              }
          }) 
  
          )
  }else if(dateMicrophones.length >= 1 && stuff === false){
    return ( 
      dateMicrophones.map((e) => {
          if(e.date === day && e.action === 'Cleaning'){  
              return  <View style={styles.user}>
              <Icon name='ios-water' size={20} color={'#F9F9B5'} />
              <Text style={styles.user_text}>{e.groupe}</Text>
              </View>  
  
          }
      }) 
  
    )
      }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 25,
    paddingTop: 25,
  },
  text: {
    color: 'white',
    fontSize: 10,
  },
  event:{
    width: 290,
    margin: 2,
    padding: 10,
    color: 'white',
    fontSize: 20,
    zIndex: 999,
    backgroundColor: "transparent"
  },
  input:{
    width: 200,
    height: 50,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#333333',
    margin: 5,
    padding: 10,
    color: 'white',
    fontSize: 20,
    zIndex: 999,
  },
  box:{
    width: 290,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4f4f4f',
    margin: 2,
    padding: 10,
    color: 'white',
    fontSize: 20,
    zIndex: 999,
    backgroundColor: "#a6a6a6"
  },
  user: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
    height: 50,
    borderRadius: 15,
    backgroundColor: "#333333",
    gap: 10,
  },
  user_text: {
    fontSize: 15,
    color: 'white',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    width: 320,
    height: 50,
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: '#78F5FA',
    margin: 5,
    padding: 10,
    backgroundColor: '#F9F9B5',
    zIndex: 999,
},  
placeholder: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10,
},     
})

export default Cleaning
