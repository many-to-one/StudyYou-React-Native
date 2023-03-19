import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Button, Animated, ImageBackground } from 'react-native'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthContext } from '../context/AuthContext';

const Event = ({ev}) => {
  const {proxy} = useContext(AuthContext);
  const navigation = useNavigation();
  const [live, setLive] = useState(true)

  // const onRefresh = React.useCallback(() => {
  //   setTimeout(() => {
  //   }, 100);
  //   console.log('refreshed Event')
  // }, []);

  const deleteEvent = async() => {
    await fetch(`${proxy}/backend/events/${ev.id}/${ev.user}/delete/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    setLive(false)
    navigation.navigate('Home')
  }

  
    if(live === true){

      return(
        <TouchableOpacity onPress={() => navigation.navigate('UpdateEvent', {ev:ev})}>
          <Animated.View style={styles.animated}>
            <ImageBackground
              source={require('../../assets/card.png')}
              style={styles.img}
            >
              <View style={styles.container}>
                <View style={styles.event}>
                  <Text style={styles.event_date}>{ev.date.slice(0, 10)}</Text>
                  {/* <Text style={styles.event_text}>{ev.event.slice(0,25)} ...</Text> */}
                </View>  
                <View>
                  <Icon 
                    name='delete-forever' 
                    onPress={() => deleteEvent()} 
                    style={styles.delete}  
                  />
                </View>
              </View>
            </ImageBackground>
          </Animated.View>
        </TouchableOpacity>

      )

    }else{

      return(
        <View></View>
      )

    }
  
}

const styles = StyleSheet.create({

    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: 25,
      // borderWidth: 1,
      // borderColor: '#EFA9FD', 
      // borderColor: '#78D7D9',
      // width: 300,
      // height:50,
      // borderRadius: 10,
      margin: 5,
    },
    animated: {
      borderRadius: 25,
      shadowColor: 'white',
      shadowOpacity: 1,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowRadius: 4,
      margin: 5,
    }, 
    img: {
      width: 300,
      height: 60,
      borderRadius: 25,
      resizeMode: 'cover',
    },
    event:{
      justifyContent: 'center',
      borderColor: 'white',
      // borderRadius: 25,
      margin: 5,
    },
    event_date: {
      fontSize: 10,
      fontWeight: 'bold',
      color: 'white',
      // color: '#FAFAE6',
      marginLeft: 10,
    },
    event_text: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#FAFAE6',
      // color: '#a1efff',
      marginLeft: 10,
    },
    delete: {
      color: '#F9F9B5',
      fontSize: 30,
    },
  })

export default Event
