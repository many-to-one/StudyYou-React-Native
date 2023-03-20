import React, { useContext, useState } from 'react'
import { View, Text } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";
import { AuthContext } from '../context/AuthContext';
import { styles } from '../styles/Styles';

const PlacesStandData = ({e}) => {

    const [live, setLive] = useState(true)
    const {proxy, userData} = useContext(AuthContext);

    const deletePlacesStand = async (name) => {
        const body = {
            'name': name,
        }
        const resp = await fetch(`${proxy}/backend/set_places_stand/${userData.congregation}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        const data = await resp.json()
        if(data){
            console.log('del', data)
            setLive(false)
        }
    }

    console.log('live', live)

  if(live === true){
    return (
        <View style={styles.user}>
            <Icon name='business' size={20} color={'#F9F9B5'} />
            <Text style={styles.user_text}>{e.name}</Text>
            <Icon 
                name="close-circle-outline" 
                size={20} 
                color={'#F9F9B5'} 
                onPress={() => deletePlacesStand(e.name)}     
              />
        </View>
      )
  }else{
    <View></View>
  }
}

export default PlacesStandData
