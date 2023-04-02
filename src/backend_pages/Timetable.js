import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react'
import { Animated, Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AuthContext } from '../context/AuthContext';
import Icon from "react-native-vector-icons/Ionicons";
import BackButton from '../buttons/BackButton';
import { LanguageContext } from '../context/LanguageContext';
import moment from 'moment';

const Timetable = ({navigation}) => {
    const {proxy} = useContext(AuthContext);
    const {trans} = useContext(LanguageContext)
    const isFocused = useIsFocused();
    const [data, setData] = useState([])
    const [sortedData, setSortedData] = useState([])
    const arr2 = {}
    const arr3 = []

    useEffect(() => {
        getCalendarDatesByUser()
    }, [isFocused])

    const getCalendarDatesByUser = async() => {
      let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
      const resp = await fetch(`${proxy}/backend/get_calendar_user/${datas.id}/`)
      const data = await resp.json()
      if(data){
        console.log('timetable', data)
          setData(data)
          data.map((e) => {
            if(e.date < moment().format('YYYY-MM-DD')){
              deleteCalendarDate(e.id)
            }
          })
      }
  }

    const deleteCalendarDate = async(id) => {
      const resp = await fetch(`${proxy}/backend/delete_calendar/${id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const data = await resp.json()
      if(data.status === 200){
        console.log('deleted', id)
      }
    }

    // ########## SORTED BY DATE ##########
    const arr1 = data.map(obj => {
      return {...obj, date: new Date(obj.date)};
    });

    const sortedAsc = arr1.sort(
      (objA, objB) => Number(objA.date) - Number(objB.date),
    );
    // ########################################
    
    return(
      sortedAsc.map((e) => {
        if(e.action === 'Stand'){
             return <View style={styles.user}>
               <Icon name={e.icon} size={20} color={'#F9F9B5'} />
               <Text style={styles.text}>
                 {e.time}
               </Text>
               <Text style={styles.text}>
                 {trans[e.action]}
               </Text>
               <Text style={styles.text}>
                 {e.place.slice(0, 30)}
               </Text>
             </View>
        }else{
             return <View style={styles.user}>
               <Icon name={e.icon} size={20} color={'#F9F9B5'} />
               <Text style={styles.text}>
                 {e.time}
               </Text>
               <Text style={styles.text}>
                 {trans[e.action]}
               </Text>
             </View>
        }
      })
    )

}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  user: {
    width: width / 1.25,
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#19868a',
    borderRadius: 15,
    backgroundColor: '#18909C80',
    gap: 15,
  },
    text: {
        color: 'white',
        fontSize: 13,
      },
      event:{
        flexDirection: 'row',
        alignItems: 'center',
        width: 300,
        margin: 5,
        padding: 10,
        gap: 20,
        fontSize: 20,
        zIndex: 999,
        backgroundColor: 'transparent'
      }, 
      in_event:{
        flexDirection: 'column',
      },
      animated: {
        borderRadius: 15,
        shadowColor: 'white',
        shadowOpacity: 1,
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowRadius: 4,
        margin: 5
      }, 
      img: {
        width: 300,
        height: 60,
        resizeMode: 'cover',
      },
})

export default Timetable
