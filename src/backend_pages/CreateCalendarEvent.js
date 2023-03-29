import React, { useContext } from 'react'
import { Animated, Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";
import { LanguageContext } from '../context/LanguageContext';
import { styles } from '../styles/Styles';


const CreateCalendarEvent = ({route, navigation}) => {

  const {day, week_ago} = route.params;
  const {
    trans,
  } = useContext(LanguageContext);


    return (

      <SafeAreaView style={styles.container}>
        <Animated.Image 
          source={require("../../assets/plan_ibg.png")}
          style={[
            StyleSheet.absoluteFillObject,
          ]}
          blurRadius={2}
        />
        <ScrollView>
        <View style={styles.cont}>

        <TouchableOpacity>
          <View style={styles.cub}>
            <Icon 
              name="people-sharp" 
              size={50} 
              color={'#F4F788'} 
              onPress={() => navigation.navigate('Service', {day: day, week_ago: week_ago})}     
            />
            <Text style={styles.text}>{trans.TechnicalSupport}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.cub}>
            <Icon 
              name="people-circle-outline" 
              size={50} 
              color={'#F4F788'} 
              onPress={() => navigation.navigate('Ministries', {day: day, week_ago: week_ago})}     
            />
            <Text style={styles.text}>{trans.MinistryLeaders}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.cub}>
            <Icon 
              name="reader" 
              size={50} 
              color={'#F4F788'} 
              onPress={() => navigation.navigate('MiddleOfTheWeek', {day: day, week_ago: week_ago})}     
            />
            <Text style={styles.text}>{trans.MidweekMeetings}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.cub}>
            <Icon 
              name="newspaper" 
              size={50} 
              color={'#F4F788'} 
              onPress={() => navigation.navigate('WeekendMeetings', {day: day, week_ago: week_ago})}     
            />
            <Text style={styles.text}>{trans.WeekendMeetings}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.cub}>
            <Icon 
              name="briefcase-sharp" 
              size={50} 
              color={'#F4F788'} 
              onPress={() => navigation.navigate('MinistryWithEvent', {day: day})}     
            />
            <Text style={styles.text}>{trans.MinistryWith}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.cub}>
            <Icon 
              name="business" 
              size={50} 
              color={'#F4F788'} 
              onPress={() => navigation.navigate('MinistryWithStand', {day: day})}     
            />
            <Text style={styles.text}>{trans.Stand}</Text>
          </View>
        </TouchableOpacity>

      </View>
      </ScrollView>
      </SafeAreaView>

    )
}


export default CreateCalendarEvent
