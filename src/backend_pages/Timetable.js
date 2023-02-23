import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AuthContext } from '../context/AuthContext';
import Icon from "react-native-vector-icons/Ionicons";
import BackButton from '../buttons/BackButton';

const Timetable = ({navigation}) => {
    const {proxy} = useContext(AuthContext);
    const isFocused = useIsFocused();
    const [data, setData] = useState([])

    useEffect(() => {
        getCalendarDatesByUser()
    }, [isFocused])

    const getCalendarDatesByUser = async() => {
        let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
        const resp = await fetch(`${proxy}/backend/get_calendar_user/${datas.id}/`)
        const data = await resp.json()
        if(data){
            setData(data)
            console.log('data',data)
        }
    }

  return (
    data.map((e) => {
        // <BackButton onPress={() => navigation.navigate('Home')}/>
        if(e.action === 'Microphones'){
            return <View style={styles.event}>
                <Icon 
                    name="mic" 
                    size={20} 
                    color={'#78D7D9'}      
                />
            <View style={styles.in_event}>
                <Text style={styles.text}>{e.date}</Text>
                <Text style={styles.text}>{e.action}</Text>
            </View>
        </View>
        
        }else if(e.action === 'Music'){
            return <View style={styles.event}>
                <Icon 
                    name="md-headset" 
                    size={20} 
                    color={'#78D7D9'}      
                />
            <View style={styles.in_event}>
                <Text style={styles.text}>{e.date}</Text>
                <Text style={styles.text}>{e.action}</Text>
            </View>
        </View>
        
        }else if(e.action === 'Duty'){
            return <View style={styles.event}>
                <Icon 
                    name="man-sharp" 
                    size={20} 
                    color={'#78D7D9'}      
                />
            <View style={styles.in_event}>
                <Text style={styles.text}>{e.date}</Text>
                <Text style={styles.text}>{e.action}</Text>
            </View>
        </View>
        }
    })
  )
}

const styles = StyleSheet.create({
    text: {
        // color: '#78D7D9',
        color: 'white',
        fontSize: 15,
      },
      event:{
        flexDirection: 'row',
        alignItems: 'center',
        width: 300,
        borderRadius: 10,
        borderWidth: 1,
        // borderColor: 'white',
        borderColor: '#78D7D9',
        margin: 5,
        padding: 10,
        gap: 20,
        // color: 'white',
        fontSize: 20,
        zIndex: 999,
        backgroundColor: 'transparent'
      }, 
      in_event:{
        flexDirection: 'column',
      },
})

export default Timetable
