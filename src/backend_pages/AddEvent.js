import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, Text, TextInput, ScrollView, Animated, Dimensions } from 'react-native';
import { AuthContext } from '../context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import DoneButton from '../buttons/DoneButton'
import { useIsFocused } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import BackButton from '../buttons/BackButton';
import { LanguageContext } from '../context/LanguageContext';

const AddEvent = ({ navigation }) => {   

  const { width, height } = Dimensions.get('window');
  const {proxy} = useContext(AuthContext);
  const {Hours, Minutes, Publications, Visits, Films, trans} = useContext(LanguageContext);
  const isFocused = useIsFocused();
  const [events, setEvents] = useState({name:{}})


    useEffect(() => {
      setData()
    },[isFocused])

    const Data = ['1', '2'] 

    const setData = async() => {
      setEvents({
        'event': '',
        'hours': 0,
        'minutes': 0,
        'visits': 0,
        'publications': 0,
        'films': 0,
      })
    }

    const addEvent = async() => {
      let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
      console.log('sendedData:', events)
        const resp = await fetch(`${proxy}/backend/event/create/${datas.id}/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(events),
        });
        const data = await resp.json()
        if(resp.status === 200){
          navigation.navigate('Home')
        }else{
          alert('Something went wrong...')
        }
      }

  return (
    <View style={styles.container}>
      <Animated.Image 
          source={require("../../assets/events_ibg.png")}
          style={[
            StyleSheet.absoluteFillObject,
          ]}
          blurRadius={5}
        />
        {/* <LinearGradient
            colors={['rgba(0, 0, 0, 0)', '#3F0053']}
            style={{
            height,
            width,
            position: 'absolute',
            bottom: -50,
            }}
          /> */}
    <ScrollView>
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
            {trans.Hours}:
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
            {trans.Minutes}:
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
            {trans.Visits}:
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
            {trans.Publications}:
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
            {trans.Films}:
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

      <DoneButton onPress={() => addEvent()}/>
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
    borderRadius: 20,
    // borderWidth: 1,
    // borderColor: 'white',
    margin: 10,
    padding: 10,
    color: 'white',
    fontSize: 20,
    zIndex: 999,
    shadowColor: 'white',
      shadowOpacity: 1,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowRadius: 4
  },  
  left_row: {
    width: 250,
    height:50,
    // borderWidth: 1,
    // borderColor: 'white',
    borderRadius: 20,
    margin: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 10,
    shadowColor: 'white',
      shadowOpacity: 1,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowRadius: 4
  },
  input: {
    width: 50,
    height:50,
    // borderWidth: 1,
    // borderColor: 'white',
    borderRadius: 20,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    color: 'white',
    fontSize: 25,
    shadowColor: 'white',
      shadowOpacity: 1,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowRadius: 4
  },
  back_button: {
      fontSize: 50,
      color: '#EFA9FD',
      position: 'absolute',
      marginTop: 470,
      marginLeft: 30,
  }
});

export default AddEvent