import React, { useContext, useEffect, useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import { LanguageContext } from '../context/LanguageContext';
import { styles } from '../styles/Styles';
import TalkBtn from '../buttons/TalkBtn'
import { AuthContext } from '../context/AuthContext';
import PlacesStandData from './PlacesStandData';
import { useIsFocused } from '@react-navigation/native';

const PlacesStand = ({navigation}) => {
    const {trans} = useContext(LanguageContext);
    const {proxy, userData} = useContext(AuthContext);
    const [place, setPlace] = useState([]);
    const [places, setPlaces] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
      getPlacesStand()
    }, [isFocused])

    const getPlacesStand = async() => {
      const resp = await fetch(`${proxy}/backend/set_places_stand/${userData.congregation}/`)
      const data = await resp.json()
      if(data.status === 200){
        setPlaces(data.data)
      }
    }

    console.log('places', places)

    const setPlacesStand = async() => {
      const body = {
        'name': place,
        'congregation': userData.congregation,
      }
      const resp = await fetch(`${proxy}/backend/set_places_stand/${userData.congregation}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      })
      const data = await resp.json()
      if(data.status === 200){
        console.log('data', data)
        await getPlacesStand()
        // setPlace([])
      }
    }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
      {trans.PlacesStand}
      </Text>
      <View style={styles.row}>
        <TextInput style={styles.box} 
          placeholder={'...'}
          placeholderTextColor={'gray'}
          onChangeText={(e) => setPlace(e)}
        />
        <TalkBtn onPress={() => setPlacesStand()}/>
      </View>
      {places.map((e, index) => (
        <PlacesStandData e={e}/>
      ))}
    </View>
  )
}

export default PlacesStand
