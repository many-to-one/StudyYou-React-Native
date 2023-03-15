import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react'
import { Animated, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AuthContext } from '../context/AuthContext';
import Icon from "react-native-vector-icons/Ionicons";
import BackButton from '../buttons/BackButton';
import { LanguageContext } from '../context/LanguageContext';
import moment from 'moment';

const Timetable = ({navigation}) => {
    const {proxy} = useContext(AuthContext);
    const {trans} = useContext(LanguageContext)
    const isFocused = useIsFocused();
    const [data, setData] = useState([])

    useEffect(() => {
        getCalendarDatesByUser()
    }, [isFocused])

    const getCalendarDatesByUser = async() => {
      let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
      const resp = await fetch(`${proxy}/backend/get_calendar_user/${datas.id}/`)
      const data = await resp.json()
      if(data){
          setData(data)
          data.map((e) => {
            if(e.date < moment().format('YYYY-MM-DD')){
              deleteCalendarDate(e.id)
            }
          })
      }
  }

    const deleteCalendarDate = async(id) => {
      const resp = await fetch(`${proxy}/backend/delete_calendar/${id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const data = await resp.json()
      if(data.status === 200){
        console.log('deleted', id)
      }
    }

    return(
      data.map((e) => {
        return <TouchableOpacity>
         <Animated.View style={styles.animated}>
           <ImageBackground
             source={require('../../assets/card_p.png')}
             style={styles.img}
           >
             <View style={styles.event}>
               <Icon name="mic" size={20} color={'#F9F9B5'} />
               <Text style={styles.text}>
                 {e.date}
               </Text>
               <Text style={styles.text}>
                 {trans[e.action]}
               </Text>
             </View>
           </ImageBackground>
         </Animated.View>
        </TouchableOpacity>
      })
    )

  // return (
  //   data.map((e) => {
  //       if(e.action === 'Microphones'){
  //           return  <TouchableOpacity>
  //           <Animated.View style={styles.animated}>
  //             <ImageBackground
  //               source={require('../../assets/card_p.png')}
  //               style={styles.img}
  //             >
  //               <View style={styles.event}>
  //                 <Icon name="mic" size={20} color={'#F9F9B5'} />
  //                 <Text style={styles.text}>
  //                   {e.date}
  //                 </Text>
  //                 <Text style={styles.text}>
  //                   {trans.Microphones}
  //                 </Text>
  //               </View>
  //             </ImageBackground>
  //           </Animated.View>
  //         </TouchableOpacity>
        
  //       }else if(e.action === 'Music'){
  //           return  <TouchableOpacity>
  //           <Animated.View style={styles.animated}>
  //             <ImageBackground
  //               source={require('../../assets/card_p.png')}
  //               style={styles.img}
  //             >
  //               <View style={styles.event}>
  //                 <Icon name="md-headset" size={20} color={'#F9F9B5'} />
  //                 <Text style={styles.text}>
  //                   {e.date}
  //                 </Text>
  //                 <Text style={styles.text}>
  //                   {trans.Music}
  //                 </Text>
  //               </View>
  //             </ImageBackground>
  //           </Animated.View>
  //         </TouchableOpacity>
        
  //       }else if(e.action === 'Duty'){
  //           return  <TouchableOpacity>
  //           <Animated.View style={styles.animated}>
  //             <ImageBackground
  //               source={require('../../assets/card_p.png')}
  //               style={styles.img}
  //             >
  //               <View style={styles.event}>
  //                 <Icon name="man-sharp" size={20} color={'#F9F9B5'} />
  //                 <Text style={styles.text}>
  //                   {e.date}
  //                 </Text>
  //                 <Text style={styles.text}>
  //                   {trans.Duty}
  //                 </Text>
  //               </View>
  //             </ImageBackground>
  //           </Animated.View>
  //         </TouchableOpacity>

  //       }else if(e.action === 'Ministry leader'){
  //           return  <TouchableOpacity>
  //           <Animated.View style={styles.animated}>
  //             <ImageBackground
  //               source={require('../../assets/card_p.png')}
  //               style={styles.img}
  //             >
  //               <View style={styles.event}>
  //                 <Icon name="people-circle-outline" size={20} color={'#F9F9B5'} />
  //                 <Text style={styles.text}>
  //                   {e.date}
  //                 </Text>
  //                 <Text style={styles.text}>
  //                   {trans.MinistryLeader}
  //                 </Text>
  //               </View>
  //             </ImageBackground>
  //           </Animated.View>
  //         </TouchableOpacity> 

  //       }else if(e.action === 'Leader (week)'){
  //           return  <TouchableOpacity>
  //           <Animated.View style={styles.animated}>
  //             <ImageBackground
  //               source={require('../../assets/card_p.png')}
  //               style={styles.img}
  //             >
  //               <View style={styles.event}>
  //                 <Icon name="person-outline" size={20} color={'#F9F9B5'} />
  //                 <Text style={styles.text}>
  //                   {e.date}
  //                 </Text>
  //                 <Text style={styles.text}>
  //                   {trans.LeaderAndIntroductoryRemarks}
  //                 </Text>
  //               </View>
  //             </ImageBackground>
  //           </Animated.View>
  //         </TouchableOpacity> 

  //       }else if(e.action === 'Prayer 1 (week)'){
  //           return  <TouchableOpacity>
  //           <Animated.View style={styles.animated}>
  //             <ImageBackground
  //               source={require('../../assets/card_p.png')}
  //               style={styles.img}
  //             >
  //               <View style={styles.event}>
  //                 <Icon name="ios-layers" size={20} color={'#F9F9B5'} />
  //                 <Text style={styles.text}>
  //                   {e.date}
  //                 </Text>
  //                 <Text style={styles.text}>
  //                   {trans.FirstPrayer}
  //                 </Text>
  //               </View>
  //             </ImageBackground>
  //           </Animated.View>
  //         </TouchableOpacity> 

  //       }else if(e.action === 'Treasures (week)'){
  //           return  <TouchableOpacity>
  //           <Animated.View style={styles.animated}>
  //             <ImageBackground
  //               source={require('../../assets/card_p.png')}
  //               style={styles.img}
  //             >
  //               <View style={styles.event}>
  //                 <Icon name="md-shield" size={20} color={'#F9F9B5'} />
  //                 <Text style={styles.text}>
  //                   {e.date}
  //                 </Text>
  //                 <Text style={styles.text}>
  //                   {trans.TreasuresFromGodsWord}
  //                 </Text>
  //               </View>
  //             </ImageBackground>
  //           </Animated.View>
  //         </TouchableOpacity> 

  //       }else if(e.action === 'Find treasures (week)'){
  //           return  <TouchableOpacity>
  //           <Animated.View style={styles.animated}>
  //             <ImageBackground
  //               source={require('../../assets/card_p.png')}
  //               style={styles.img}
  //             >
  //               <View style={styles.event}>
  //                 <Icon name="albums" size={20} color={'#F9F9B5'} />
  //                 <Text style={styles.text}>
  //                   {e.date}
  //                 </Text>
  //                 <Text style={styles.text}>
  //                   {trans.SpiritualGems}
  //                 </Text>
  //               </View>
  //             </ImageBackground>
  //           </Animated.View>
  //         </TouchableOpacity> 

  //       }else if(e.action === 'Bible reading (week)'){
  //           return  <TouchableOpacity>
  //           <Animated.View style={styles.animated}>
  //             <ImageBackground
  //               source={require('../../assets/card_p.png')}
  //               style={styles.img}
  //             >
  //               <View style={styles.event}>
  //                 <Icon name="book" size={20} color={'#F9F9B5'} />
  //                 <Text style={styles.text}>
  //                   {e.date}
  //                 </Text>
  //                 <Text style={styles.text}>
  //                   {trans.BibleReading}
  //                 </Text>
  //               </View>
  //             </ImageBackground>
  //           </Animated.View>
  //         </TouchableOpacity> 

  //       }else if(e.action === 'School leader (week)'){
  //           return  <TouchableOpacity>
  //           <Animated.View style={styles.animated}>
  //             <ImageBackground
  //               source={require('../../assets/card_p.png')}
  //               style={styles.img}
  //             >
  //               <View style={styles.event}>
  //                 <Icon name="school-sharp" size={20} color={'#F9F9B5'} />
  //                 <Text style={styles.text}>
  //                   {e.date}
  //                 </Text>
  //                 <Text style={styles.text}>
  //                   {trans.SchoolLeader}
  //                 </Text>
  //               </View>
  //             </ImageBackground>
  //           </Animated.View>
  //         </TouchableOpacity> 

  //       }else if(e.action === 'School: Initial Call'){
  //           return  <TouchableOpacity>
  //           <Animated.View style={styles.animated}>
  //             <ImageBackground
  //               source={require('../../assets/card_p.png')}
  //               style={styles.img}
  //             >
  //               <View style={styles.event}>
  //                 <Icon name="people-outline" size={20} color={'#F9F9B5'} />
  //                 <Text style={styles.text}>
  //                   {e.date}
  //                 </Text>
  //                 <Text style={styles.text}>
  //                   {trans.InitialCall}
  //                 </Text>
  //               </View>
  //             </ImageBackground>
  //           </Animated.View>
  //         </TouchableOpacity> 

  //       }else if(e.action === 'School: Return visit'){
  //           return  <TouchableOpacity>
  //           <Animated.View style={styles.animated}>
  //             <ImageBackground
  //               source={require('../../assets/card_p.png')}
  //               style={styles.img}
  //             >
  //               <View style={styles.event}>
  //                 <Icon name="people-outline" size={20} color={'#F9F9B5'} />
  //                 <Text style={styles.text}>
  //                   {e.date}
  //                 </Text>
  //                 <Text style={styles.text}>
  //                   {trans.ReturnVisit}
  //                 </Text>
  //               </View>
  //             </ImageBackground>
  //           </Animated.View>
  //         </TouchableOpacity> 

  //       }else if(e.action === 'School: Study'){
  //           return  <TouchableOpacity>
  //           <Animated.View style={styles.animated}>
  //             <ImageBackground
  //               source={require('../../assets/card_p.png')}
  //               style={styles.img}
  //             >
  //               <View style={styles.event}>
  //                 <Icon name="people-sharp" size={20} color={'#F9F9B5'} />
  //                 <Text style={styles.text}>
  //                   {e.date}
  //                 </Text>
  //                 <Text style={styles.text}>
  //                   {trans.SchoolStudy}
  //                 </Text>
  //               </View>
  //             </ImageBackground>
  //           </Animated.View>
  //         </TouchableOpacity> 

  //       }else if(e.action === 'School: Talk'){
  //           return  <TouchableOpacity>
  //           <Animated.View style={styles.animated}>
  //             <ImageBackground
  //               source={require('../../assets/card_p.png')}
  //               style={styles.img}
  //             >
  //               <View style={styles.event}>
  //                 <Icon name="md-man-outline" size={20} color={'#F9F9B5'} />
  //                 <Text style={styles.text}>
  //                   {e.date}
  //                 </Text>
  //                 <Text style={styles.text}>
  //                   {trans.SchoolTalk}
  //                 </Text>
  //               </View>
  //             </ImageBackground>
  //           </Animated.View>
  //         </TouchableOpacity> 

  //       }else if(e.action === 'Discussion (week)'){
  //           return  <TouchableOpacity>
  //           <Animated.View style={styles.animated}>
  //             <ImageBackground
  //               source={require('../../assets/card_p.png')}
  //               style={styles.img}
  //             >
  //               <View style={styles.event}>
  //                 <Icon name="md-film-outline" size={20} color={'#F9F9B5'} />
  //                 <Text style={styles.text}>
  //                   {e.date}
  //                 </Text>
  //                 <Text style={styles.text}>
  //                   {trans.Discussion}
  //                 </Text>
  //               </View>
  //             </ImageBackground>
  //           </Animated.View>
  //         </TouchableOpacity> 

  //       }else if(e.action === 'Local Needs'){
  //           return  <TouchableOpacity>
  //           <Animated.View style={styles.animated}>
  //             <ImageBackground
  //               source={require('../../assets/card_p.png')}
  //               style={styles.img}
  //             >
  //               <View style={styles.event}>
  //                 <Icon name="md-file-tray-full" size={20} color={'#F9F9B5'} />
  //                 <Text style={styles.text}>
  //                   {e.date}
  //                 </Text>
  //                 <Text style={styles.text}>
  //                   {trans.LocalNeeds}
  //                 </Text>
  //               </View>
  //             </ImageBackground>
  //           </Animated.View>
  //         </TouchableOpacity> 

  //       }else if(e.action === 'Bible Study Leader'){
  //           return  <TouchableOpacity>
  //           <Animated.View style={styles.animated}>
  //             <ImageBackground
  //               source={require('../../assets/card_p.png')}
  //               style={styles.img}
  //             >
  //               <View style={styles.event}>
  //                 <Icon name="md-library" size={20} color={'#F9F9B5'} />
  //                 <Text style={styles.text}>
  //                   {e.date}
  //                 </Text>
  //                 <Text style={styles.text}>
  //                   {trans.BibleStudyLeader}
  //                 </Text>
  //               </View>
  //             </ImageBackground>
  //           </Animated.View>
  //         </TouchableOpacity> 

  //       }else if(e.action === 'Bible Study Lector'){
  //           return  <TouchableOpacity>
  //           <Animated.View style={styles.animated}>
  //             <ImageBackground
  //               source={require('../../assets/card_p.png')}
  //               style={styles.img}
  //             >
  //               <View style={styles.event}>
  //                 <Icon name="md-reader" size={20} color={'#F9F9B5'} />
  //                 <Text style={styles.text}>
  //                   {e.date}
  //                 </Text>
  //                 <Text style={styles.text}>
  //                   {trans.BibleStudyLector}
  //                 </Text>
  //               </View>
  //             </ImageBackground>
  //           </Animated.View>
  //         </TouchableOpacity> 

  //       }else if(e.action === 'Prayer 2 (week)'){
  //           return  <TouchableOpacity>
  //           <Animated.View style={styles.animated}>
  //             <ImageBackground
  //               source={require('../../assets/card_p.png')}
  //               style={styles.img}
  //             >
  //               <View style={styles.event}>
  //                 <Icon name="ios-layers" size={20} color={'#F9F9B5'} />
  //                 <Text style={styles.text}>
  //                   {e.date}
  //                 </Text>
  //                 <Text style={styles.text}>
  //                   {trans.LastPrayer}
  //                 </Text>
  //               </View>
  //             </ImageBackground>
  //           </Animated.View>
  //       </TouchableOpacity> 

  //       }else if(e.action === 'Weekend Leader'){
  //           return  <TouchableOpacity>
  //           <Animated.View style={styles.animated}>
  //             <ImageBackground
  //               source={require('../../assets/card_p.png')}
  //               style={styles.img}
  //             >
  //               <View style={styles.event}>
  //                 <Icon name="person-outline" size={20} color={'#F9F9B5'} />
  //                 <Text style={styles.text}>
  //                   {e.date}
  //                 </Text>
  //                 <Text style={styles.text}>
  //                   {trans.WeekendLeader}
  //                 </Text>
  //               </View>
  //             </ImageBackground>
  //           </Animated.View>
  //         </TouchableOpacity> 

  //       }else if(e.action === 'Weekend Speach'){
  //           return  <TouchableOpacity>
  //           <Animated.View style={styles.animated}>
  //             <ImageBackground
  //               source={require('../../assets/card_p.png')}
  //               style={styles.img}
  //             >
  //               <View style={styles.event}>
  //                 <Icon name="md-man-outline" size={20} color={'#F9F9B5'} />
  //                 <Text style={styles.text}>
  //                   {e.date}
  //                 </Text>
  //                 <Text style={styles.text}>
  //                   {trans.WeekendSpeach}
  //                 </Text>
  //               </View>
  //             </ImageBackground>
  //           </Animated.View>
  //         </TouchableOpacity> 

  //       }else if(e.action === 'Watch Tower Leader'){
  //           return  <TouchableOpacity>
  //           <Animated.View style={styles.animated}>
  //             <ImageBackground
  //               source={require('../../assets/card_p.png')}
  //               style={styles.img}
  //             >
  //               <View style={styles.event}>
  //                 <Icon name="person-sharp" size={20} color={'#F9F9B5'} />
  //                 <Text style={styles.text}>
  //                   {e.date}
  //                 </Text>
  //                 <Text style={styles.text}>
  //                   {trans.WatchTowerLeader}
  //                 </Text>
  //               </View>
  //             </ImageBackground>
  //           </Animated.View>
  //         </TouchableOpacity> 

  //       }else if(e.action === 'Watch Tower Lector'){
  //         return  <TouchableOpacity>
  //         <Animated.View style={styles.animated}>
  //           <ImageBackground
  //             source={require('../../assets/card_p.png')}
  //             style={styles.img}
  //           >
  //             <View style={styles.event}>
  //               <Icon name="person-sharp" size={20} color={'#F9F9B5'} />
  //               <Text style={styles.text}>
  //                 {e.date}
  //               </Text>
  //               <Text style={styles.text}>
  //                 {trans.WatchTowerLector}
  //               </Text>
  //             </View>
  //           </ImageBackground>
  //         </Animated.View>
  //       </TouchableOpacity>

  //       }else if(e.action === 'MinistryWith'){
  //           return  <TouchableOpacity>
  //           <Animated.View style={styles.animated}>
  //             <ImageBackground
  //               source={require('../../assets/card_p.png')}
  //               style={styles.img}
  //             >
  //               <View style={styles.event}>
  //                 <Icon name="briefcase-sharp" size={20} color={'#F9F9B5'} />
  //                 <Text style={styles.text}>
  //                   {e.date}
  //                 </Text>
  //                 <Text style={styles.text}>
  //                   {trans.MinistryWith} {trans.With} {e.person} {e.time}
  //                 </Text>
  //               </View>
  //             </ImageBackground>
  //           </Animated.View>
  //         </TouchableOpacity> 
  //       }
  //   })
  // )
}

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontSize: 13,
      },
      event:{
        flexDirection: 'row',
        alignItems: 'center',
        width: 300,
        margin: 5,
        padding: 10,
        gap: 20,
        fontSize: 20,
        zIndex: 999,
        backgroundColor: 'transparent'
      }, 
      in_event:{
        flexDirection: 'column',
      },
      animated: {
        borderRadius: 15,
        shadowColor: 'white',
        shadowOpacity: 1,
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowRadius: 4,
        margin: 5
      }, 
      img: {
        width: 300,
        height: 60,
        resizeMode: 'cover',
      },
})

export default Timetable
