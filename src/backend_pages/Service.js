import React, { useContext } from 'react'
import { Animated, Button, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import Microphones from '../backend_pages/Microphones';
import Music from '../backend_pages/Music';
import { LanguageContext } from '../context/LanguageContext';
import Cleaning from './Cleaning';
import Duty from './Duty';
import { styles } from '../styles/Styles';
import { SafeAreaView } from 'react-native-safe-area-context';

const Service = ({route, navigation}) => {

    const {day, week_ago} = route.params;
    const {trans} = useContext(LanguageContext);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.Image 
        source={require("../../assets/service_ibg.png")}
          style={[
            StyleSheet.absoluteFillObject,
          ]}
          blurRadius={5}
      />
      <ScrollView >  
      <View style={styles.cont}>
        <View style={styles.event_}>
          <Text style={styles.text_}>{trans.Microphones}:</Text>
          <Microphones  
            day={day} 
            week_ago={week_ago}
          />
        </View>
        <View style={styles.event_}>
          <Text style={styles.text_}>{trans.Music}:</Text>
          <Music 
            day={day} 
            week_ago={week_ago}
          />
        </View>
        <View style={styles.event_}>
          <Text style={styles.text_}>{trans.Duty}:</Text>
          <Duty 
            day={day} 
            week_ago={week_ago}
          />
        </View>
        <View style={styles.event_}>
          <Text style={styles.text_}>{trans.Cleaning}:</Text>
          <Cleaning 
            day={day} 
            week_ago={week_ago}
          />
        </View>
      </View>
      </ScrollView>

    </SafeAreaView>
  )
}

export default Service
