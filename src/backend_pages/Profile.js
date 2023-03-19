import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react'
import { Animated, Dimensions, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
    const {trans, setLanguage} = useContext(LanguageContext);
    const [profileData, setProfileData] = useState([]);
    const [selected, setSelected] = useState('')
    const [groupe, setGroupe] = useState('')
    const [groupePlsch, setGroupePlsch] = useState('')
    const [result, setResult] = useState({})
    const [visits, setVisits] = useState([])
    const [publications, setPublications] = useState([])
    const [films, setFilms] = useState([])
    const [studies, setStudies] = useState([])
    const [studiesData, setStudiesData] = useState([])
    const [months, setMonths] = useState([]);
    const [monthsHours, setMonthsHours] = useState([]);

    const dataLanguage = [
      {key: 'PL', value: 'PL'},
      {key: 'RU', value: 'RU'},
      {key: 'UA', value: 'UA'},
    ] 

    const dataGroupe = [
      {key: '1', value: '1'},
      {key: '2', value: '2'},
      {key: '3', value: '3'},
      {key: '4', value: '4'},
      {key: '5', value: '5'},
      {key: '6', value: '6'},
      {key: '7', value: '7'},
      {key: '8', value: '8'},
      {key: '9', value: '9'},
      {key: '10', value: '10'},
    ] 

    const progresData = [
      {
        // name: `(${trans.Hours})`,
        name: '',
        population: result.all_hours,
        color: '#3ea7ab',
        legendFontColor: 'white',
        legendFontSize: 15,
      },
      {
        // name: `(${trans.Rest})`,
        name: '',
        population: 600 - result.all_hours,
        color: '#a1efff',  //a1efff
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
      setGroupePlsch(data.data.groupe)
      console.log('pro', data.data)
      
      const resp2 = await fetch(`${proxy}/backend/get_months_results/${data.data.id}/`)
      const data2 = await resp2.json()
      if(data2.status === 200){
        setResult(data2)
        setMonths(data2.date)
        setMonthsHours(data2.hours)
        setVisits(data2.visits)
        setPublications(data2.publications)
        setFilms(data2.films)
        // setStudies(data2.studies.slice(-1)[0])
        setStudiesData(data2.studies)
        console.log('data2', data2)
      }
    }

    const monthsStatisticData = {
      labels: result.months,
      datasets: [
        {
          data: monthsHours
        }
      ]
    };

    const visitsStatisticData = {
      labels: result.months,
      datasets: [
        {
          data: visits
        }
      ]
    };

    const publicationsStatisticData = {
      labels: result.months,
      datasets: [
        {
          data: publications
        }
      ]
    };

    const filmsStatisticData = {
      labels: result.months,
      datasets: [
        {
          data: films
        }
      ]
    };

    const studiesStatisticData = {
      labels: result.months,
      datasets: [
        {
          data: studiesData
        }
      ]
    };

    const language = async(selected) => {
      await AsyncStorage.setItem('language', selected) 
      await setLanguage()
    }

    const setUserGroupe = async(groupe) => {
      let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
      const resp = await fetch(`${proxy}/users/set_user_groupe/${datas.id}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(groupe)
      })
      const data = await resp.json()
      if(data){
        setGroupePlsch(data.groupe) 
      }
    }

  return (

    <SafeAreaView style={styles.container}>
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
          placeholder={
            <Icon name='globe-outline' size={30} color={'white'} />
          }
          data={dataLanguage} 
          boxStyles={styles.event}
          inputStyles={styles.text}
          dropdownStyles={styles.selectlist}
          dropdownItemStyles={{color: 'white'}}
          dropdownTextStyles={{color: 'white'}} 
          arrowicon={<Icon name="chevron-down" size={20} color={'white'} />} 
          searchicon={<Icon name="search" size={20} color={'white'} />} 
          search={true} 
        />
      <Text style={styles.text}>
        {trans.Groupe} 
      </Text>
      <SelectList 
          onSelect={() => setUserGroupe(groupe)}
          setSelected={setGroupe}
          placeholder={groupePlsch}
          data={dataGroupe} 
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
          title={trans.Changepassword}
          onPress={() => navigation.navigate('RequestResetMail')}
        />

        <ScrollView style={styles.timetable}>
          <Timetable />
        </ScrollView>

        <Calendar />

        <Text style={styles.text}>
            {trans.PioneerStandard}
          </Text>
        <View style={styles.diagram}>
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
        </View>

        <Text style={styles.text}>
        {trans.Hours}
          </Text>
        <View style={styles.diagram}>
        <BarChart
          style={styles.chartConfig}
          data={monthsStatisticData}
          width={width / 1.2}
          height={220}
          yAxisLabel=""
          chartConfig={styles.chartConfig}
          verticalLabelRotation={0}
        />
        </View>

        <Text style={styles.text}>
        {trans.Visits}
        </Text>
        <View style={styles.diagram}>
        <BarChart
          style={styles.chartConfig}
          data={visitsStatisticData}
          width={width / 1.2}
          height={220}
          yAxisLabel=""
          chartConfig={styles.chartConfig}
          verticalLabelRotation={0}
        />
        </View>

        <Text style={styles.text}>
        {trans.Publications}
        </Text>
        <View style={styles.diagram}>
        <BarChart
          style={styles.chartConfig}
          data={publicationsStatisticData}
          width={width / 1.2}
          height={220}
          yAxisLabel=""
          chartConfig={styles.chartConfig}
          verticalLabelRotation={0}
        />
        </View>

        <Text style={styles.text}>
        {trans.Films}
        </Text>
        <View style={styles.diagram}>
        <BarChart
          style={styles.chartConfig}
          data={filmsStatisticData}
          width={width / 1.2}
          height={220}
          yAxisLabel=""
          chartConfig={styles.chartConfig}
          verticalLabelRotation={0}
        />
        </View>

        <Text style={styles.text}>
        {trans.BibleStudies}
          </Text>
        <View style={styles.diagram}>
        <BarChart
          style={styles.chartConfig}
          data={studiesStatisticData}
          width={width / 1.2}
          height={220}
          yAxisLabel=""
          chartConfig={styles.chartConfig}
          verticalLabelRotation={0}
        />
        </View>

        <Text style={styles.text}>
          {trans.OverallScore}
        </Text>
        <View style={styles.diagram}>
          <View style={styles.result}>

            <View style={styles.result_row}>
              <Text style={styles.text2}>
              {trans.Hours}:
              </Text>
              <Text style={styles.text2}>
                {result.all_hours}
              </Text>
            </View>

            <View style={styles.result_row}>
              <Text style={styles.text2}>
              {trans.Minutes}:
              </Text>
              <Text style={styles.text2}>
                {result.all_minutes}
              </Text>
            </View>

            <View style={styles.result_row}>
              <Text style={styles.text2}>
              {trans.Visits}:
              </Text>
              <Text style={styles.text2}>
                {result.all_visits}
              </Text>
            </View>

            <View style={styles.result_row}>
              <Text style={styles.text2}>
              {trans.Publications}:
              </Text>
              <Text style={styles.text2}>
                {result.all_publications}
              </Text>
            </View>

            <View style={styles.result_row}>
              <Text style={styles.text2}>
              {trans.Films}:
              </Text>
              <Text style={styles.text2}>
                {result.all_films}
              </Text>
            </View>

          </View>
        </View>

    </View> 
    </ScrollView>
    </SafeAreaView>
    

  )
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: width,
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
    text2: {
      color: '#f5fcfc', 
      fontSize: 15,
    },
    cont: {
      alignItems: 'center',
      gap: 10,
      width: width,
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
      opacity: 0.8,
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
      margin: 20,
    },
    result_row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    diagram:{
      width: width / 1.2,
      height: 220,
      marginTop: 15,
      color: 'white',
      fontSize: 20,
      zIndex: 999,
      backgroundColor: 'transparent',
      shadowColor: 'white',
      shadowOpacity: 1,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowRadius: 4,
      marginBottom: 20,
    },
    diagram_st:{
      width: width / 1.2,
      height: 260,
      marginTop: 15,
      color: 'white',
      fontSize: 20,
      zIndex: 999,
      backgroundColor: 'transparent',
      shadowColor: 'white',
      shadowOpacity: 1,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowRadius: 4,
      marginBottom: 20,
    },
  });

export default Profile