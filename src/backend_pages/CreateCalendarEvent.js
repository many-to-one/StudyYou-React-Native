import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useContext, useEffect, useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { AuthContext } from '../context/AuthContext';
import { MultipleSelectList  } from 'react-native-dropdown-select-list';
import Icon from "react-native-vector-icons/Ionicons";
import { useIsFocused } from '@react-navigation/native';

const CreateCalendarEvent = ({route, navigation}) => {

    const {proxy} = useContext(AuthContext);
    const {day} = route.params;
    const [selected, setSelected] = useState('')
    const [users, setUsers] = useState([])
    const USERS = {}
    const isFocused = useIsFocused();

    useEffect(() => {
      getUsers()
  }, [isFocused])

  const getUsers = async() => {
      const resp = await fetch(`${proxy}/users/users/`)
      const data = await resp.json();
      if(resp.status === 200){
        setUsers(data)
        console.log('ok:', data)
      }
  }


  for(let i=0; i<users.length; i++){
    USERS[users[i].id] = [users[i].username, users[i].id]
  }

  const data = []

  for (const [key, value] of Object.entries(USERS)) {
    data.push(
      {key:key, value:value},
    )
  }


  const selectedUser = async(selected) => {
    selected.map((e) => {
      // console.log('selectedUser', e[1])
      const body = {
        'date': '21-02-2023',
        'action': 'Microphones'
      }
      const resp = fetch(`${proxy}/backend/calendar/${e[1]}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      // const data = resp.json()
      // if(data.status === 200){
      //   navigation.navigate('Profile')
      //   console.log('posted, ok', data)
      // }
    })
  }

    const plsHolder = () => {
      return <Icon name='md-language' size={20} color={'white'} />
    }

    const setDate = async() => {
        let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
        const resp = await fetch(`${proxy}/backend/calendar/${datas.id}/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(day)
        })
        const data = await resp.json()
        if(data.status === 200){
          navigation.navigate('Profile')
          console.log('posted, ok')
        }
          
      }

      console.log('selected:', selected)

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Microfones</Text>
      <MultipleSelectList 
          onSelect={() => selectedUser(selected)}
          setSelected={setSelected}
          placeholder={plsHolder()}
          // fontFamily='lato'
          data={data} 
          save='value'
          boxStyles={styles.event}
          inputStyles={styles.text}
          dropdownStyles={styles.event}
          dropdownItemStyles={{color: 'white'}}
          dropdownTextStyles={{color: 'white'}}
          arrowicon={<Icon name="chevron-down" size={20} color={'white'} />} 
          searchicon={<Icon name="search" size={20} color={'white'} />} 
          search={true} 
          // defaultOption={{key: 'RU', value: language.RU}}
          // defaultOption={{ key:'1', value:'Jammu & Kashmir' }}
        />
        {/* <Button onPress={}>Set</Button> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 25,
    paddingTop: 25,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  event:{
    width: 320,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#78D7D9',
    margin: 5,
    padding: 10,
    color: 'white',
    fontSize: 20,
    zIndex: 999,
    backgroundColor: 'transparent'
  },  
})

export default CreateCalendarEvent
