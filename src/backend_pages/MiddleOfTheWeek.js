import React, { useContext } from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
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

const MiddleOfTheWeek = ({route, navigation}) => {
    const {day} = route.params;
    const {
      leaderAndIntroductoryRemarks_,
      firstPrayer_,
      treasuresFromGodsWord_,
      spiritualGems_,
      bibleReading_,
      schoolLeader_,
      initialCall_,
      returnVisit_,
      schoolStudy_,
      schoolTalk_,
      discussion_,
      localNeeds_,
      bibleStudyLeader_,
      bibleStudyLector_,
      lastPrayer_,
    } = useContext(LanguageContext);
  return (
    <ScrollView style={styles.scroll}>
        <View style={styles.container}>

        <View style={styles.event}>
          <Text style={styles.text}>{leaderAndIntroductoryRemarks_}:</Text>
          <WeekLeader  day={day}/>
        </View>

        <View style={styles.event}> 
          <Text style={styles.text}>{firstPrayer_}:</Text>
          <WeekPrayer1  day={day}/>
        </View>

        <View style={styles.event}>
          <Text style={styles.text}>{treasuresFromGodsWord_}:</Text>
          <WeekTreasures day={day}/>
        </View>

        <View style={styles.event}>
          <Text style={styles.text}>{spiritualGems_}:</Text>
          <WeekFindTreasures day={day}/>
        </View>

        <View style={styles.event}>
          <Text style={styles.text}>{bibleReading_}:</Text>
          <WeekReadingBible day={day}/>
        </View>

        <View style={styles.event}>
          <Text style={styles.text}>{schoolLeader_}:</Text>
          <WeekSchoolLeader day={day}/>
        </View>

        <View style={styles.event}>
          <Text style={styles.text}>{initialCall_}:</Text>
          <WeekVisit1 day={day}/>
        </View>

        <View style={styles.event}>
          <Text style={styles.text}>{returnVisit_}:</Text>
          <WeekVisit2 day={day}/>
        </View>

        <View style={styles.event}>
          <Text style={styles.text}>{schoolStudy_}:</Text>
          <WeekStudy day={day}/>
        </View>

        <View style={styles.event}>
          <Text style={styles.text}>{schoolTalk_}:</Text>
          <WeekSchoolTalk day={day}/>
        </View>

        <View style={styles.event}>
          <Text style={styles.text}>{discussion_}:</Text>
          <WeekDiscussion day={day}/>
        </View>

        <View style={styles.event}>
          <Text style={styles.text}>{localNeeds_}:</Text>
          <WeekLocalNeeds day={day}/>
        </View>

        <View style={styles.event}>
          <Text style={styles.text}>{bibleStudyLeader_}:</Text>
          <WeekBibleStudy day={day}/>
        </View>

        <View style={styles.event}>
          <Text style={styles.text}>{bibleStudyLector_}:</Text>
          <WeekBibleStudyLector day={day}/>
        </View>

        <View style={styles.event}>
          <Text style={styles.text}>{lastPrayer_}:</Text>
          <WeekPrayer2 day={day}/>
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

