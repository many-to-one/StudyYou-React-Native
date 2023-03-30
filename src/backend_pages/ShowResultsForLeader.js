import React from 'react'
import { Animated, ScrollView, StyleSheet, View } from 'react-native'
import MonthsResultsItem from './MonthsResultsItem'
import { styles } from '../styles/Styles';

const ShowResultsForLeader = ({navigation, route}) => {
    const {results} = route.params
  return (
    <View style={styles.container}>
       <Animated.Image 
           source={require("../../assets/history_i.png")}
           style={[
             StyleSheet.absoluteFillObject,
           ]}
           blurRadius={5}
       />
       <ScrollView>
       {results.map((res, index) => (
           <MonthsResultsItem key={res.id} res={res}/>
       ))}
       </ScrollView>
    </View>
  )
}

export default ShowResultsForLeader
