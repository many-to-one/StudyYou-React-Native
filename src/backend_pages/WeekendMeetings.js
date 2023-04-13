import React, { useContext } from 'react'
import { Animated, Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { LanguageContext } from '../context/LanguageContext';
import WatchTowerLeader from './WatchTowerLeader';
import WatchTowerLector from './WatchTowerLector';
import WeekendLeader from './WeekendLeader';
import WeekendSpeach from './WeekendSpeech';
import { styles } from '../styles/Styles';
import { AuthContext } from '../context/AuthContext';
import ScheduleBtn from '../buttons/ScheduleBtn';


const WeekendMeetings = ({route, navigation}) => {
    const {day, week_ago} = route.params;
    const {trans} = useContext(LanguageContext);
    const {userData} = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.Image 
        source={require("../../assets/meeting_ibg.png")}
          style={[
            StyleSheet.absoluteFillObject,
          ]}
          blurRadius={5}
      />

      <ScrollView>
        <View>

        <View style={styles.event_}>
          <Text style={styles.text_}>{trans.WeekendLeader}:</Text>
          <WeekendLeader  
            day={day}
            week_ago={week_ago}
          />
        </View>

        <View style={styles.event_}>
          <Text style={styles.text_}>{trans.WeekendSpeach}:</Text>
          <WeekendSpeach  
            day={day}
            week_ago={week_ago}
          />
        </View>

        <View style={styles.event_}>
          <Text style={styles.text_}>{trans.WatchTowerLeader}:</Text>
          <WatchTowerLeader  
            day={day}
            week_ago={week_ago}
          />
        </View>

        <View style={styles.event_}>
          <Text style={styles.text_}>{trans.WatchTowerLector}:</Text>
          <WatchTowerLector 
            day={day}
            week_ago={week_ago}
          />
        </View>

        {userData.admin ?
          <ScheduleBtn 
            onPress={() => navigation.navigate('AutoWeekend')}
            title={'Auto'}
          />
        : 
        <View />
        }

      </View>
      </ScrollView>

    </SafeAreaView>
  )
}

// const { width, height } = Dimensions.get('window');
// const styles = StyleSheet.create({
//   scroll: {
//     backgroundColor: 'black',
//   },
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//     flexDirection: 'column',
//     alignItems: 'center',
//     gap: 25,
//     paddingTop: 25,
//   },
//   text: {
//     color: 'white',
//     fontSize: 20,
//   },
//   event: {gap: 10,
//     width: 320,
//     margin: 5,
//     padding: 10,
//     color: 'white',
//     fontSize: 20,
//     zIndex: 999,
//     backgroundColor: "transparent",
//   },
//   input:{
//     width: 230,
//     height: 50,
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: '#78D7D9',
//     margin: 5,
//     padding: 10,
//     color: 'white',
//     fontSize: 20,
//     zIndex: 999,
//     backgroundColor: "#a6a6a6"
//   },
//   button: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: 320,
//     height: 50,
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: '#78F5FA',
//     margin: 5,
//     padding: 10,
//     backgroundColor: '#F9F9B5',
//     zIndex: 999,
// },    
// })


export default WeekendMeetings

