import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, Text, TextInput, ScrollView, Animated, Dimensions } from 'react-native';
import { AuthContext } from '../context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import DoneButton from '../buttons/DoneButton'
import BackButton from '../buttons/BackButton';
import Icon from "react-native-vector-icons/MaterialIcons";
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

const UpdateEvent = ({route, navigation}) => {

    const { width, height } = Dimensions.get('window');
    const {ev} = route.params;
    const {proxy, setLanguauge, Hours, Minutes, Publications, Visits, Films} = useContext(AuthContext);
    const [events, setEvents] = useState({name: {}});
    const [event, setEvent] = useState('');
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [visits, setVisits] = useState(0);
    const [publications, setPublications] = useState(0);
    const [films, setFilms] = useState(0);
    const isFocused = useIsFocused();

    useEffect(() => {
      getEvent()
    }, [isFocused]);


    const onRefresh = React.useCallback(() => {
      setTimeout(() => {
      }, 100);
      console.log('events:', events)
    }, []);

    const getEvent = async() => {
      const resp = await fetch(`${proxy}/backend/events/${ev.id}/${ev.user}/`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          },
      });
      const data = await resp.json()
      if(data){
        setEvents(data)
        // setEvents({...events, 'hours': ev.hours})
        console.log('ev.id:', ev.id)
        // onRefresh()
      }
    }

    const updateEvent = async() => {
          const resp = await fetch(`${proxy}/backend/events/${ev.id}/${ev.user}/update/`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body:JSON.stringify(events),
          });
          const data = await resp.json()
          if(data){
            onRefresh()
            navigation.navigate('Home')
          }else{
            alert('Something went wrong...')
          }
        }

        const back = () => {
            onRefresh()
            navigation.navigate('Home')
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
    <ScrollView>
      <BackButton onPress={() => back()}/>
      <View style={styles.row}>
        <TextInput style={styles.event} 
          placeholder="Event..."
          placeholderTextColor={'gray'}
          value={events.event}
          onChangeText={(e) => {setEvents({...events, 'event': e})}}
        />
      </View>

      <View style={styles.row}>
        <View style={styles.left_row}>
          <Text style={styles.text}>
            {Hours}:
          </Text>
        </View>
        <View>
          <TextInput 
            value={events.hours}
            onChangeText={(e) => {setEvents({...events, 'hours': e})}}
            style={styles.input}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.left_row}>
          <Text style={styles.text}>
            {Minutes}:
          </Text>
        </View>
        <View>
          <TextInput 
            value={events.minutes}
            onChangeText={(e) => {setEvents({...events, 'minutes': e})}}
            style={styles.input}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.left_row}>
          <Text style={styles.text}>
            {Visits}:
          </Text>
        </View>
        <View>
          <TextInput 
            value={events.visits}
            onChangeText={(e) => {setEvents({...events, 'visits': e})}}
            style={styles.input}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.left_row}>
          <Text style={styles.text}>
            {Publications}:
          </Text>
        </View>
        <View>
          <TextInput 
            value={events.publications}
            onChangeText={(e) => {setEvents({...events, 'publications': e})}}
            style={styles.input}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.left_row}>
          <Text style={styles.text}>
            {Films}:
          </Text>
        </View>
        <View >
          <TextInput 
            value={events.films}
            onChangeText={(e) => {setEvents({...events, 'films': e})}}
            style={styles.input}
          />
        </View>
      </View>

      <DoneButton onPress={() => updateEvent()}/>
    </ScrollView>
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
    row: {
      flex: 1,
      flexDirection: 'row'
    },
    text: {
      color: 'white',
      fontSize: 20,
    },
    event:{
      width: 320,
      // height: 50,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: '#EFA9FD',
      margin: 5,
      padding: 10,
      color: 'white',
      fontSize: 20,
    },  
    left_row: {
      width: 250,
      height:50,
      borderWidth: 2,
      borderColor: '#EFA9FD',
      borderRadius: 10,
      margin: 5,
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingLeft: 10,
    },
    input: {
      width: 50,
      height:50,
      borderWidth: 2,
      borderColor: '#EFA9FD',
      borderRadius: 10,
      margin: 5,
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: 10,
      color: 'white',
      fontSize: 25,
    },
    back_button: {
        fontSize: 50,
        color: '#EFA9FD',
        position: 'absolute',
        marginTop: 470,
        marginLeft: 30,
    }
  });

export default UpdateEvent
