import React, { useContext, useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import { LanguageContext } from '../context/LanguageContext';
import { styles } from '../styles/Styles';

const PlacesStand = ({navigation}) => {
    const {trans} = useContext(LanguageContext);
    const [place, setPlace] = useState([])
    console.log(place)

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
        </View>
    </View>
  )
}

export default PlacesStand
