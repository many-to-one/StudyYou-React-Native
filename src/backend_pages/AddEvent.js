import React, { useContext, useState } from 'react'
import { StyleSheet, View, Text, TextInput, ScrollView } from 'react-native';
import { AuthContext } from '../context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import DoneButton from '../buttons/DoneButton'

const AddEvent = ({ navigation }) => {   
  
    const {proxy} = useContext(AuthContext);
    const [event, setEvent] = useState('');
    const [hours, setHours] = useState(null);
    const [minutes, setMinutes] = useState(null);
    const [visits, setVisits] = useState(null);
    const [publications, setPublications] = useState(null);
    const [films, setFilms] = useState(null);

    const addEvent = async() => {
      let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
      console.log('datas:', datas)
        const resp = await fetch(`${proxy}/backend/event/create/${datas.id}/`, {
          method: 'POST',
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
        if(resp.status === 200){
          window.location.reload()
          navigation.navigate('Home')
        }else{
          alert('Something went wrong...')
        }
      }

  return (
    <View style={styles.container}>
    <ScrollView>
      <View style={styles.row}>
        <TextInput style={styles.event} 
          placeholder="Event..."
          placeholderTextColor={'gray'}
          onChangeText={(text) => setEvent(text)}
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
            onChangeText={(text) => setHours(text)}
            style={styles.input}
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
            onChangeText={(text) => setFilms(text)}
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
    borderColor: 'black',
    backgroundColor: '#282c34',
    width: 320,
    height: 50,
    borderRadius: 10,
    margin: 5,
    padding: 10,
    color: 'white',
    fontSize: 20,
  },  
  left_row: {
    backgroundColor: '#282c34',
    width: 250,
    height:50,
    borderRadius: 10,
    margin: 5,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  right_row: {
    backgroundColor: '#282c34',
    width: 50,
    height:50,
    borderRadius: 10,
    margin: 5,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  input: {
    backgroundColor: '#282c34',
    width: 50,
    height:50,
    borderRadius: 10,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    color: 'white',
    fontSize: 25,
  },
});

export default AddEvent