import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AuthContext } from '../context/AuthContext';
import { SelectList } from 'react-native-dropdown-select-list';
import Icon from "react-native-vector-icons/Ionicons";
import { useIsFocused } from '@react-navigation/native';

const CreateCalendarEvent = ({route, navigation}) => {

    const {proxy} = useContext(AuthContext);
    const {day} = route.params;
    const [selected, setSelected] = useState('')
    const [users, setUsers] = useState([])
    const isFocused = useIsFocused();

    useEffect(() => {
      getUsers()
      console.log('users:', users)
  }, [isFocused])

  const getUsers = async() => {
    let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
      const response = await fetch(`${proxy}/backend/events/${datas.id}/`)
      const data = await response.json();
      setUsers(data)
      if (data){
        console.log('allEvents', data)
      // onRefresh()
      }
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

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Microfones</Text>
      <SelectList 
          onSelect={() => language(selected)}
          setSelected={setSelected}
          placeholder={plsHolder()}
          // fontFamily='lato'
          data={users} 
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
