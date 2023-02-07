import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, Text, TextInput, ScrollView, Animated, Dimensions } from 'react-native';
import { AuthContext } from '../context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import DoneButton from '../buttons/DoneButton'
import BackButton from '../buttons/BackButton';
import Icon from "react-native-vector-icons/MaterialIcons";
import { LinearGradient } from 'expo-linear-gradient';
import { useIsFocused } from '@react-navigation/native';

const UpdateEvent = ({route, navigation}) => {

    const { width, height } = Dimensions.get('window');
    const {ev} = route.params;
    const {proxy} = useContext(AuthContext);
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

    const getEvent = async() => {
        console.log('ev:',ev)
      const resp = await fetch(`${proxy}/backend/events/${ev.id}/${ev.user}/`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          },
      });
      const data = await resp.json()
      if(data){
        setEvent(data.event)
        setHours(data.hours)
        setMinutes(data.minutes)
        setVisits(data.visits)
        setPublications(data.publications)
        setFilms(data.films)
      }
    }

    const updateEvent = async() => {
        let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
        console.log('datas:', datas)
          const resp = await fetch(`${proxy}/backend/events/${ev.id}/${ev.user}/update/`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({
              event:event,
              hours:hours,
              minutes:minutes,
              visits:visits,
              publications:publications,
              films:films,
            })
          });
          const data = await resp.json()
          if(data){
            navigation.navigate('Home')
          }else{
            alert('Something went wrong...')
          }
        }

        const back = () => {
            navigation.navigate('Home')
            // window.location.reload()
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
      <View style={styles.row}>
        <TextInput style={styles.event} 
          placeholder="Event..."
          placeholderTextColor={'gray'}
          onChangeText={(text) => setEvent(text)}
          defaultValue={ev.event}
        />
      </View>

      <View style={styles.row}>
        <View style={styles.left_row}>
          <Text style={styles.text}>
            Hours:
          </Text>
        </View>
        <View>
          <TextInput 
            onChangeText={text => setHours(text)}
            style={styles.input}
            defaultValue={ev.hours}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.left_row}>
          <Text style={styles.text}>
            Minutes:
          </Text>
        </View>
        <View>
          <TextInput 
            defaultValue={ev.minutes}
            onChangeText={(text) => setMinutes(text)}
            style={styles.input}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.left_row}>
          <Text style={styles.text}>
            Visits:
          </Text>
        </View>
        <View>
          <TextInput 
            defaultValue={ev.visits}
            onChangeText={(text) => setVisits(text)}
            style={styles.input}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.left_row}>
          <Text style={styles.text}>
            Publications:
          </Text>
        </View>
        <View>
          <TextInput 
            defaultValue={ev.publications}
            onChangeText={(text) => setPublications(text)}
            style={styles.input}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.left_row}>
          <Text style={styles.text}>
            Films:
          </Text>
        </View>
        <View >
          <TextInput 
            defaultValue={ev.films}
            onChangeText={(text) => setFilms(text)}
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
      height: 50,
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
