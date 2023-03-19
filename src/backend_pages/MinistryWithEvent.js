import React, { useContext } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { LanguageContext } from '../context/LanguageContext';
import MinistryWith from './MinistryWith';
import { styles } from '../styles/Styles';

const MinistryWithEvent = ({route, navigation}) => {
    const {day} = route.params;
    const {trans} = useContext(LanguageContext);
  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <Text style={styles.text}>{trans.MinistryWith}:</Text>
        <MinistryWith day={day}/>
      </View>
    </ScrollView>
  )
}

export default MinistryWithEvent

