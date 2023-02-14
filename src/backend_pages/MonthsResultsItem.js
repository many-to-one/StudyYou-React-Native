import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View, Dimensions, FlatList } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const MonthsResultsItem = ({res}) => {
  const { width, height } = Dimensions.get('window');
  const {proxy, Hours, Minutes, Publications, Visits, Films,} = useContext(AuthContext);
  const navigation = useNavigation();
  let datas;

  const deleteMonthResult = async() => {
    let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
      const resp = await fetch(`${proxy}/backend/month/delete/${res.id}/${datas.id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await resp.json()
    navigation.navigate('Menu')
    // if(data){
    //   window.location.reload()
    // }
  }

  const getHistory = async() => {
    const resp = await fetch(`${proxy}/events_history/${datas.id}/`)
    const data = await resp.json()
  }

  return (
    <View style={styles.container}>

        <View >

          <View style={styles.title}>
            <View style={styles.date_history}>
              <Text style={styles.text}>{res.date}</Text>
              <Icon 
                name='history'
                onPress={() => deleteMonthResult()}
                style={styles.delete}
              />
            </View>  
              <Icon 
                name='delete-alert-outline'
                onPress={() => deleteMonthResult()}
                style={styles.delete}
              />
          </View>
      
          <View style={styles.row}>
            <View style={styles.left_row}>
              <Text style={styles.text}>
                {Hours}:
              </Text>
            </View>
            <View style={styles.input}>
              <Text style={styles.text}>
                {res.hours}
              </Text>
            </View>
           </View>  

          <View style={styles.row}>
            <View style={styles.left_row}>
              <Text style={styles.text}>
                {Minutes}:
              </Text>
            </View>
            <View style={styles.input}>
              <Text style={styles.text}>
                {res.minutes}
              </Text>
            </View>
          </View>   

          <View style={styles.row}>
            <View style={styles.left_row}>
              <Text style={styles.text}>
                {Publications}:
              </Text>
            </View>
            <View style={styles.input}>
              <Text style={styles.text}>
                {res.publications}
              </Text>
            </View>
          </View>  

          <View style={styles.row}>
            <View style={styles.left_row}>
              <Text style={styles.text}>
                {Visits}:
              </Text>
            </View>
            <View style={styles.input}>
              <Text style={styles.text}>
                {res.visits}
              </Text>
            </View>
          </View>  

          <View style={styles.row}>
            <View style={styles.left_row}>
              <Text style={styles.text}>
                {Films}:
              </Text>
            </View>
            <View style={styles.input}>
              <Text style={styles.text}>
                {res.films}
              </Text>
            </View>
          </View>
        </View>
        </View>

  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 25,
      paddingTop: 25,
    },
    row: {
      flex: 1,
      flexDirection: 'row',
    },
    text: {
      justifyContent: 'center',
      alignItems: 'center',
      color: '#FAFAE6',
      fontSize: 20,
    },
    text_res: {
      justifyContent: 'center',
      alignItems: 'center',
      color: '#FAFAE6',
      fontSize: 20,
      padding: 20,
    }, 
    left_row: {
      width: 250,
      height:50,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: '#23CFD4',
      margin: 5,
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingLeft: 10,
      opacity: 1,
    },
    input: {
      width: 50,
      height:50,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: '#23CFD4',
      opacity: 10,
      margin: 5,
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: 10,
      color: 'white',
      fontSize: 25,
    },
    backbtn: {
      marginLeft: 100,
    },
    delete: {
      color: '#23CFD4',
      fontSize: 30,
      marginRight: 10,
    },
    date_history: {
      flex: 1,
      flexDirection: 'row',
      gap: 10,
      justifyContent: 'center',
    },
    title: {
      flex: 1,
      flexDirection: 'row',
      gap: 10,
      justifyContent: 'space-between',
      // marginLeft: -25,
    },
});

export default MonthsResultsItem
