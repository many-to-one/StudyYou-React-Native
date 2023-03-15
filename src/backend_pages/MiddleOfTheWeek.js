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
    const {trans} = useContext(LanguageContext);
  return (
    <ScrollView style={styles.scroll}>
        <View style={styles.container}>

        <View style={styles.event}>
          <Text style={styles.text}>{trans.LeaderAndIntroductoryRemarks}:</Text>
          <WeekLeader  day={day}/>
        </View>

        <View style={styles.event}> 
          <Text style={styles.text}>{trans.FirstPrayer}:</Text>
          <WeekPrayer1  day={day}/>
        </View>

        <View style={styles.event}>
          <Text style={styles.text}>{trans.TreasuresFromGodsWord}:</Text>
          <WeekTreasures day={day}/>
        </View>

        <View style={styles.event}>
          <Text style={styles.text}>{trans.SpiritualGems}:</Text>
          <WeekFindTreasures day={day}/>
        </View>

        <View style={styles.event}>
          <Text style={styles.text}>{trans.BibleReading}:</Text>
          <WeekReadingBible day={day}/>
        </View>

        <View style={styles.event}>
          <Text style={styles.text}>{trans.SchoolLeader}:</Text>
          <WeekSchoolLeader day={day}/>
        </View>

        <View style={styles.event}>
          <Text style={styles.text}>{trans.InitialCall}:</Text>
          <WeekVisit1 day={day}/>
        </View>

        <View style={styles.event}>
          <Text style={styles.text}>{trans.ReturnVisit}:</Text>
          <WeekVisit2 day={day}/>
        </View>

        <View style={styles.event}>
          <Text style={styles.text}>{trans.SchoolStudy}:</Text>
          <WeekStudy day={day}/>
        </View>

        <View style={styles.event}>
          <Text style={styles.text}>{trans.SchoolTalk}:</Text>
          <WeekSchoolTalk day={day}/>
        </View>

        <View style={styles.event}>
          <Text style={styles.text}>{trans.Discussion}:</Text>
          <WeekDiscussion day={day}/>
        </View>

        <View style={styles.event}>
          <Text style={styles.text}>{trans.LocalNeeds}:</Text>
          <WeekLocalNeeds day={day}/>
        </View>

        <View style={styles.event}>
          <Text style={styles.text}>{trans.BibleStudyLeader}:</Text>
          <WeekBibleStudy day={day}/>
        </View>

        <View style={styles.event}>
          <Text style={styles.text}>{trans.BibleStudyLector}:</Text>
          <WeekBibleStudyLector day={day}/>
        </View>

        <View style={styles.event}>
          <Text style={styles.text}>{trans.LastPrayer}:</Text>
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

