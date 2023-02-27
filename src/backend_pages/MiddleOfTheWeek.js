import React from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import WeekLeader from './WeekLeader';
import WeekPrayer1 from './WeekPrayer1';
import WeekTreasures from './WeekTreasures';

const MiddleOfTheWeek = ({route, navigation}) => {
    const {day} = route.params;
  return (
    <ScrollView style={styles.scroll}>
        <View style={styles.container}>

        <View style={styles.event}>
          <Text style={styles.text}>Leader and Introductory remarks:</Text>
          <WeekLeader  day={day}/>
        </View>

        <View style={styles.event}>
          <Text style={styles.text}>Prayer 1:</Text>
          <WeekPrayer1  day={day}/>
        </View>

        <View style={styles.event}>
          <Text style={styles.text}>Treasures from God's word:</Text>
          <WeekTreasures day={day}/>
        </View>

      </View>
      </ScrollView>
  )
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  scroll: {
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 25,
    paddingTop: 25,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  event: {gap: 10,
    width: 320,
    margin: 5,
    padding: 10,
    color: 'white',
    fontSize: 20,
    zIndex: 999,
    backgroundColor: "transparent",
  },
  input:{
    width: 230,
    height: 50,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#78D7D9',
    margin: 5,
    padding: 10,
    color: 'white',
    fontSize: 20,
    zIndex: 999,
    backgroundColor: "#a6a6a6"
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 320,
    height: 50,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#78F5FA',
    margin: 5,
    padding: 10,
    backgroundColor: '#F9F9B5',
    zIndex: 999,
},    
})


export default MiddleOfTheWeek

