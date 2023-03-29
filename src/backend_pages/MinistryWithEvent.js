import React, { useContext } from 'react'
import { Animated, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { LanguageContext } from '../context/LanguageContext';
import MinistryWith from './MinistryWith';
import { styles } from '../styles/Styles';

const MinistryWithEvent = ({route, navigation}) => {
    const {day} = route.params;
    const {trans} = useContext(LanguageContext);
  return (
    <SafeAreaView style={styles.container}>
      <Animated.Image 
        source={require("../../assets/pair_m.png")}
          style={[
            StyleSheet.absoluteFillObject,
          ]}
          blurRadius={5}
      />
        <ScrollView>
          <View>
            <Text style={styles.text}>{trans.MinistryWith}:</Text>
            <MinistryWith day={day}/>
          </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default MinistryWithEvent

