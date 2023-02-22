import React, { useContext, useEffect, useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { AuthContext } from '../context/AuthContext';
import { MultipleSelectList  } from 'react-native-dropdown-select-list';
import Icon from "react-native-vector-icons/Ionicons";
import { useIsFocused } from '@react-navigation/native';


const Microphones = ({day, navigation}) => {

    const {proxy} = useContext(AuthContext);
    // const {day} = route.params;
    const [selected, setSelected] = useState('')
    const [users, setUsers] = useState([])
    const [dateMicrophones, setDateMicrophones] = useState([])
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
      getCalendarDatesByDate()
  }

  const getCalendarDatesByDate = async() => {
    const resp = await fetch(`${proxy}/backend/get_microphones/${day}/`)
    const data = await resp.json();
    if(resp.status === 200){
      setDateMicrophones(data)
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
    selected.map((e) => {
      for(let k in USERS){  
        if(e === USERS[k]){

          const resp = fetch(`${proxy}/backend/calendar/${k}/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              'date': `${day}`,
              'action': 'Microphones'
            })
          })

          if(resp.status === 200){
          alert('data was sent')  
          }
          setSelected([])
        }
      }
    })
  }

  const deleteMicrophone = async(user) => {

  }

  


console.log('dateMicrophones:', dateMicrophones)

    if(dateMicrophones.length > 0){
        return ( 
        dateMicrophones.map((e) => {
            if(e.date === day){  
                return  <View style={styles.container}>
                            <Text style={styles.text}>{e.action}</Text>
        
                            <View style={styles.event}>
                                <View style={styles.user}>
                                <Text style={styles.user_text}>{USERS[e.user]}</Text>
                                    <Icon 
                                        name="close-circle-outline" 
                                        size={20} 
                                        color={'white'} 
                                        onPress={() => deleteMicrophone(e)}     
                                        />
                                </View>
                            </View>    
                        </View>
                                    
            }
        }) 

        )
    }else if(dateMicrophones.length === 0){
        return (
            <View style={styles.container}>
              <Text style={styles.text}>Microfones</Text>
              <MultipleSelectList 
                setSelected={(val) => setSelected(val)} 
                data={data} 
                save="value"
                // onSelect={() => alert('selected')} 
                placeholder={<Icon name='mic' size={20} color={'white'} />}
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
              <Button 
                  style={styles.button}
                  title={'Set'}
                  onPress={() => setMicrophones(selected)}
              />
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    flexDirection: 'column',
    // justifyContent: 'center',
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
    backgroundColor: "transparent"
  },
  input:{
    width: 230,
    height: 50,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#78D7D9',
    margin: 5,
    padding: 10,
    color: 'white',
    fontSize: 20,
    zIndex: 999,
    backgroundColor: "#a6a6a6"
  },
  box:{
    width: 320,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#78D7D9',
    margin: 5,
    padding: 10,
    color: 'white',
    fontSize: 20,
    zIndex: 999,
    backgroundColor: "#a6a6a6"
  },
  user: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // width: 100,
    height: 50,
    borderRadius: 20,
    backgroundColor: "gray",
    gap: 10,
  },
  user_text: {
    fontSize: 15,
    color: 'white',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 320,
    height: 50,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#78F5FA',
    margin: 5,
    padding: 10,
    backgroundColor: '#F9F9B5',
    // color: 'white',
    // fontSize: 20,
    zIndex: 999,
},    
})

export default Microphones
