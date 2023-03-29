import React, { useContext } from 'react'
import { Animated, Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { LanguageContext } from '../context/LanguageContext';
import WeekBibleStudy from './WeekBibleStudy';
import WeekBibleStudyLector from './WeekBibleStudyLector';
import WeekDiscussion from './WeekDiscussion';
import WeekFindTreasures from './WeekFindTreasures';
import WeekLeader from './WeekLeader';
import WeekLocalNeeds from './WeekLocalNeeds';
import WeekPrayer1 from './WeekPrayer1';
import WeekPrayer2 from './WeekPrayr2';
import WeekReadingBible from './WeekReadingBible';
import WeekSchoolLeader from './WeekSchoolLeader';
import WeekSchoolTalk from './WeekSchoolTalk';
import WeekStudy from './WeekStudy';
import WeekTreasures from './WeekTreasures';
import WeekVisit1 from './WeekVisit1';
import WeekVisit2 from './WeekVisit2';
import { styles } from '../styles/Styles';

const MiddleOfTheWeek = ({route, navigation}) => {
    const {day, week_ago} = route.params;
    const {trans} = useContext(LanguageContext);
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
          <Text style={styles.text_}>{trans.LeaderAndIntroductoryRemarks}:</Text>
          <WeekLeader  
            day={day}
            week_ago={week_ago}
          />
        </View>

        <View style={styles.event_}> 
          <Text style={styles.text_}>{trans.FirstPrayer}:</Text>
          <WeekPrayer1  
            day={day}
            week_ago={week_ago}
          />
        </View>

        <View style={styles.event_}>
          <Text style={styles.text_}>{trans.TreasuresFromGodsWord}:</Text>
          <WeekTreasures 
            day={day}
            week_ago={week_ago}
          />
        </View>

        <View style={styles.event_}>
          <Text style={styles.text_}>{trans.SpiritualGems}:</Text>
          <WeekFindTreasures 
            day={day}
            week_ago={week_ago}
          />
        </View>

        <View style={styles.event_}>
          <Text style={styles.text_}>{trans.BibleReading}:</Text>
          <WeekReadingBible 
            day={day}
            week_ago={week_ago}
          />
        </View>

        <View style={styles.event_}>
          <Text style={styles.text_}>{trans.SchoolLeader}:</Text>
          <WeekSchoolLeader 
            day={day}
            week_ago={week_ago}
          />
        </View>

        <View style={styles.event_}>
          <Text style={styles.text_}>{trans.InitialCall}:</Text>
          <WeekVisit1 
            day={day}
            week_ago={week_ago}
          />
        </View>

        <View style={styles.event_}>
          <Text style={styles.text_}>{trans.ReturnVisit}:</Text>
          <WeekVisit2 
            day={day}
            week_ago={week_ago}
          />
        </View>

        <View style={styles.event_}>
          <Text style={styles.text_}>{trans.SchoolStudy}:</Text>
          <WeekStudy 
            day={day}
            week_ago={week_ago}
          />
        </View>

        <View style={styles.event_}>
          <Text style={styles.text_}>{trans.SchoolTalk}:</Text>
          <WeekSchoolTalk 
            day={day}
            week_ago={week_ago}
          />
        </View>

        <View style={styles.event_}>
          <Text style={styles.text_}>{trans.Discussion}:</Text>
          <WeekDiscussion 
            day={day}
            week_ago={week_ago}
          />
        </View>

        <View style={styles.event_}>
          <Text style={styles.text_}>{trans.LocalNeeds}:</Text>
          <WeekLocalNeeds 
            day={day}
            week_ago={week_ago}
          />
        </View>

        <View style={styles.event_}>
          <Text style={styles.text_}>{trans.BibleStudyLeader}:</Text>
          <WeekBibleStudy 
            day={day}
            week_ago={week_ago}
          />
        </View>

        <View style={styles.event_}>
          <Text style={styles.text_}>{trans.BibleStudyLector}:</Text>
          <WeekBibleStudyLector 
            day={day}
            week_ago={week_ago}
          />
        </View>

        <View style={styles.event_}>
          <Text style={styles.text_}>{trans.LastPrayer}:</Text>
          <WeekPrayer2 
            day={day}
            week_ago={week_ago}
          />
        </View>

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
//     flexDirection: 'column',
//     alignItems: 'center',
//     gap: 25,
//     paddingTop: 25,
//   },
//   text: {
//     color: 'white',
//     fontSize: 20,
//   },
//   event: {
//     gap: 10,
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


export default MiddleOfTheWeek

