import React, { useContext } from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";
import { LanguageContext } from '../context/LanguageContext';


const CreateCalendarEvent = ({route, navigation}) => {

  const {day, week_ago} = route.params;
  const {
    trans,
  } = useContext(LanguageContext);


    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>

        <TouchableOpacity>
          <View style={styles.event}>
            <Icon 
              name="people-sharp" 
              size={50} 
              color={'#78D7D9'} 
              onPress={() => navigation.navigate('Service', {day: day, week_ago: week_ago})}     
            />
            <Text style={styles.text}>{trans.TechnicalSupport}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.event}>
            <Icon 
              name="people-circle-outline" 
              size={50} 
              color={'#78D7D9'} 
              onPress={() => navigation.navigate('Ministries', {day: day, week_ago: week_ago})}     
            />
            <Text style={styles.text}>{trans.MinistryLeaders}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.event}>
            <Icon 
              name="reader" 
              size={50} 
              color={'#78D7D9'} 
              onPress={() => navigation.navigate('MiddleOfTheWeek', {day: day, week_ago: week_ago})}     
            />
            <Text style={styles.text}>{trans.MidweekMeetings}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.event}>
            <Icon 
              name="newspaper" 
              size={50} 
              color={'#78D7D9'} 
              onPress={() => navigation.navigate('WeekendMeetings', {day: day, week_ago: week_ago})}     
            />
            <Text style={styles.text}>{trans.WeekendMeetings}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.event}>
            <Icon 
              name="briefcase-sharp" 
              size={50} 
              color={'#78D7D9'} 
              onPress={() => navigation.navigate('MinistryWithEvent', {day: day})}     
            />
            <Text style={styles.text}>{trans.MinistryWith}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.event}>
            <Icon 
              name="business" 
              size={50} 
              color={'#78D7D9'} 
              onPress={() => navigation.navigate('MinistryWithStand', {day: day})}     
            />
            <Text style={styles.text}>{trans.Stand}</Text>
          </View>
        </TouchableOpacity>

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
    // flex: 1,
    backgroundColor: 'black',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
    paddingTop: 25,
  },
  text: {
    color: '#78D7D9',
    fontSize: 10,
    marginTop: 50,
  },
  event:{
    justifyContent: 'center',
    alignItems: 'center',
    width: 140,
    height: 140,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#78D7D9',
    margin: 5,
    // padding: 10,
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
    // color: 'white',
    // fontSize: 20,
    zIndex: 999,
},    
})

export default CreateCalendarEvent
