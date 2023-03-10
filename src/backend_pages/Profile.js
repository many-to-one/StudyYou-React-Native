import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react'
import { Animated, Dimensions, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../context/AuthContext'
import ChangePasswordBtn from '../buttons/ChangePasswordBtn';
import { SelectList } from 'react-native-dropdown-select-list';
import Icon from "react-native-vector-icons/Ionicons";
import Calendar from './Calendar';
import Timetable from './Timetable';
import { LanguageContext } from '../context/LanguageContext';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { useIsFocused } from '@react-navigation/native';

const Profile = ({navigation}) => {
    const { width, height } = Dimensions.get('window');
    const isFocused = useIsFocused();
    const {profile, proxy, userData} = useContext(AuthContext);
    const {setLanguage, Changepassword_} = useContext(LanguageContext);
    const [profileData, setProfileData] = useState([]);
    const [selected, setSelected] = useState('')
    const [result, setResult] = useState({})

    const Data = [
      {key: 'PL', value: 'PL'},
      {key: 'RU', value: 'RU'},
      {key: 'UA', value: 'UA'},
    ] 

    const progresData = [
      {
        name: 'hours',
        population: result.all_hours,
        color: '#a1efff',
        legendFontColor: 'white',
        legendFontSize: 15,
      },
      {
        name: 'Rest',
        population: 600 - result.all_hours,
        color: '#0227ba', 
        legendFontColor: 'white',
        legendFontSize: 15,
      },
    ];

    useEffect(() => {
        getProfile()
    }, [isFocused])

    const getProfile = async() => {
      const resp = await profile()
      const data = resp
      setProfileData(data.data)
      console.log('pro', data.data)
      
      const resp2 = await fetch(`${proxy}/backend/get_months_results/${data.data.id}/`)
      const data2 = await resp2.json()
      if(data2.status === 200){
        setResult(data2)
        console.log('data2', data2)
      }
    }

    const language = async(selected) => {
      await AsyncStorage.setItem('language', selected) 
      await setLanguage()
    }

  const plsHolder = () => {
    return <Icon name='globe-outline' size={30} color={'white'} />
  }

  console.log('all_hours', result.all_hours)
  console.log('all_hours', result.all_minutes)
  return (

    <View style={styles.container}>
      <Animated.Image 
          source={require("../../assets/profile_ibg.png")}
          style={[
            StyleSheet.absoluteFillObject,
          ]}
          blurRadius={5}
        />
        {/* <LinearGradient
            colors={['rgba(0, 0, 0, 0)', '#393939']}
            style={{
            height,
            width,
            position: 'absolute',
            bottom: -50,
            }}
          /> */}
    
    <ScrollView>

    <View style={styles.cont}>
      <SelectList 
          onSelect={() => language(selected)}
          setSelected={setSelected}
          placeholder={plsHolder()}
          data={Data} 
          boxStyles={styles.event}
          inputStyles={styles.text}
          dropdownStyles={styles.selectlist}
          dropdownItemStyles={{color: 'white'}}
          dropdownTextStyles={{color: 'white'}}
          arrowicon={<Icon name="chevron-down" size={20} color={'white'} />} 
          searchicon={<Icon name="search" size={20} color={'white'} />} 
          search={true} 
        />
        <TouchableOpacity>
          <Animated.View style={styles.animated}>
            <ImageBackground
              source={require('../../assets/card.png')}
              style={styles.img}
            >
              <View style={styles.inside}>
                <Icon name="person-circle-outline" size={20} color={'#a1efff'} />
                <Text style={styles.text}>
                  {profileData.username}
                </Text>
              </View>
            </ImageBackground>
          </Animated.View>
        </TouchableOpacity>

        <TouchableOpacity>
          <Animated.View style={styles.animated}>
            <ImageBackground
              source={require('../../assets/card.png')}
              style={styles.img}
            >
              <View style={styles.inside}>
                <Icon name="person-circle-outline" size={20} color={'#a1efff'} />
                <Text style={styles.text}>
                  {profileData.congregation}
                </Text>
              </View>
            </ImageBackground>
          </Animated.View>
        </TouchableOpacity>

        <TouchableOpacity>
          <Animated.View style={styles.animated}>
            <ImageBackground
              source={require('../../assets/card.png')}
              style={styles.img}
            >
              <View style={styles.inside}>
              <Icon name="mail-outline" size={20} color={'#a1efff'} />
                <Text style={styles.text}>
                  {profileData.email}
                </Text>
              </View>
            </ImageBackground>
          </Animated.View>
        </TouchableOpacity>

        {profileData.is_superuser ? 

          <TouchableOpacity>
          <Animated.View style={styles.animated}>
            <ImageBackground
              source={require('../../assets/card.png')}
              style={styles.img}
            >
              <View style={styles.inside}>
                <Icon name="md-star" size={20} color={'#a1efff'} />
                <Text style={styles.text}>
                  superuser
                </Text>
              </View>
            </ImageBackground>
          </Animated.View>
        </TouchableOpacity>
         :
         <View />
    }
        <ChangePasswordBtn 
            title={Changepassword_}
            onPress={() => navigation.navigate('RequestResetMail')}
        />

        <ScrollView style={styles.timetable}>
          <Timetable />
        </ScrollView>

        <Calendar />

        <PieChart
          data={progresData}
          width={width}
          height={220}
          chartConfig={styles.chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />

        <View style={styles.result}>

          <View style={styles.result_row}>
            <Text style={styles.text}>
              Minuty:
            </Text>
            <Text style={styles.text}>
              {result.all_minutes}
            </Text>
          </View>

          <View style={styles.result_row}>
            <Text style={styles.text}>
              Odwiedziny:
            </Text>
            <Text style={styles.text}>
              {result.all_visits}
            </Text>
          </View>
          
          <View style={styles.result_row}>
            <Text style={styles.text}>
              Publicacje:
            </Text>
            <Text style={styles.text}>
              {result.all_publications}
            </Text>
          </View>

          <View style={styles.result_row}>
            <Text style={styles.text}>
              Films:
            </Text>
            <Text style={styles.text}>
              {result.all_films}
            </Text>
          </View>
        </View>

    </View> 
    </ScrollView>
    </View>
    

  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 25,
      paddingTop: 25,
    },
    row: {
      flex: 1,
      flexDirection: 'row'
    },
    text: {
      color: '#a1efff',
      fontSize: 15,
    },
    cont: {
      alignItems: 'center',
      gap: 10
    },
    selectlist:{
      width: 300,
      borderRadius: 10,
      borderWidth: 1,
      // borderColor: '#EFA9FD',
      // borderColor: '#78D7D9',
      borderColor: 'white',
      marginBottom: 20,
      padding: 10,
      color: 'white',
      fontSize: 20,
      zIndex: 999,
      backgroundColor: 'transparent'
    },
    animated: {
      borderRadius: 25,
      shadowColor: 'white',
      shadowOpacity: 1,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowRadius: 4
    }, 
    img: {
      width: 300,
      height: 60,
      borderRadius: 25,
      resizeMode: 'cover',
    },
    event:{
      width: 300,
      height: 60,
      borderRadius: 15,
      borderWidth: 1,
      // borderColor: '#EFA9FD',
      // borderColor: '#78D7D9',
      borderColor: 'white',
      marginBottom: 20,
      padding: 10,
      color: 'white',
      fontSize: 20,
      zIndex: 999,
      backgroundColor: 'transparent'
    }, 
    inside: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 20,
      width: 300,
      height: 60,
      margin: 5,
      marginBottom: 10,
      padding: 15,
      borderRadius: 50,
    },
    timetable: {
      height: 300,
      marginBottom: 25,
      marginTop: 25,
    }, 
    input: {
      width: 50,
      height:50,
      borderWidth: 2,
      borderColor: '#EFA9FD',
      borderRadius: 10,
      margin: 5,
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: 10,
      color: 'white',
      fontSize: 25,
    },
    back_button: {
        fontSize: 50,
        color: '#EFA9FD',
        position: 'absolute',
        marginTop: 470,
        marginLeft: 30,
    },
    chartConfig: {
      // backgroundColor: "#e26a00",
      // backgroundGradientFrom: "#fb8c00",
      // backgroundGradientTo: "#ffa726",
      // decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(114, 159, 172, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(114, 159, 172, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    },
    result: {
      flexDirection: 'column',
      gap: 20,
    },
    result_row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 210,
    },
  });

export default Profile