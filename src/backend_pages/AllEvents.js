import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View, Animated, Image, Dimensions, ScrollView, RefreshControl } from 'react-native'
import { AuthContext } from '../context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Event from './Event'
import AddEventButton from '../buttons/AddEventButton';
import { LinearGradient } from 'expo-linear-gradient';
import { useIsFocused, useNavigation } from '@react-navigation/native';

const AllEvents = ({datas}) => {
    const navigation = useNavigation();
    const { width, height } = Dimensions.get('window');
    const BACKDROP_HEIGHT = height * 0.65;
    const { userData, proxy, } = useContext(AuthContext);
    const [ events, setEvents] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
      allEvents()
    }, [isFocused])

    const onRefresh = React.useCallback(() => {
      setTimeout(() => {
        allEvents();
      }, 100);
      console.log('refreshed AllEvents')
    }, []);

    const allEvents = async() => {
      let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
        const response = await fetch(`${proxy}/backend/events/${datas.id}/`)
        const data = await response.json();
        setEvents(data)
        if (data){
          console.log('allEvents', data)
        // onRefresh()
        }
    }

  return (

    <View style={styles.container}>
    <ScrollView>
         <View
          contentContainerStyle={styles.scrollView}
         >

      <View > 
        {events.map((ev, index) => (
            <Event key={ev.id} ev={ev}/>
        ))}
      </View>

      </View>

</ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem',
      padding: 20,
      // backgroundColor: 'black'
    },
})

export default AllEvents