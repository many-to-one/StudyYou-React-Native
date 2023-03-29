import React, { useContext } from 'react'
import { Animated, Button, Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import Microphones from '../backend_pages/Microphones';
import Music from '../backend_pages/Music';
import { LanguageContext } from '../context/LanguageContext';
import Duty from './Duty';
import Ministry from './Ministry';
import { styles } from '../styles/Styles';

const Ministries = ({route, navigation}) => {

    const {day, week_ago} = route.params;
    const {trans} = useContext(LanguageContext);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.Image 
        source={require("../../assets/groupe_m.png")}
          style={[
            StyleSheet.absoluteFillObject,
          ]}
          blurRadius={5}
      />
        <ScrollView>
        <View>
        <View style={styles.event_}>
          <Text style={styles.text}>{trans.MinistryLeaders}</Text>
          <Ministry  
            day={day} 
            week_ago={week_ago}
          />
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}


export default Ministries
