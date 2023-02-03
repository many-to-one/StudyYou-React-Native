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
    const { userData, proxy } = useContext(AuthContext);
    const [ events, setEvents] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
      allEvents()
    }, [isFocused])

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 100);
    }, []);

    const allEvents = async() => {
      let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
      console.log('datas:', datas)
        const response = await fetch(`${proxy}/backend/events/${datas.id}/`)
        const resp = await response.json();
        setEvents(resp)
        console.log(
            'id:', userData.id,
            'events:', events,
            'proxy:', proxy,
            'userData:', userData,
            'resp', resp,
            )
    }

  return (
    <View style={styles.container}>

      <Animated.Image 
        source={require("../../assets/events.png")}
        style={[
          StyleSheet.absoluteFillObject,
        ]}
        blurRadius={5}
        />
        <LinearGradient
          colors={['rgba(0, 0, 0, 0)', '#3F0053']}
          style={{
          height,
          width,
          position: 'absolute',
          bottom: -50,
          }}
        />
         <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
         >


      <View > 
        {events.map((ev, index) => (
            <Event key={index} ev={ev}/>
        ))}
      </View>

      </ScrollView>
      <AddEventButton 
          onPress={() => {
            navigation.navigate('AddEvent');
          }}
        />

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
      backgroundColor: 'black'
    },
})

export default AllEvents