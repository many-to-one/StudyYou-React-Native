import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Animated, Dimensions, TextInput, ActivityIndicator } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SaveButton from '../buttons/SaveButton';
import { useIsFocused } from '@react-navigation/native';
import { LanguageContext } from '../context/LanguageContext';

const Result = ({navigation}) => {

    const {proxy, userData} = useContext(AuthContext);
    const {trans} = useContext(LanguageContext);
    const [ month, setMonth ] = useState('');
    const [ result, setResult ] = useState([]);
    const [ hours, setHours ] = useState(null);
    const [ minutes, setMinutes ] = useState(null);
    const [ publications, setPublications ] = useState(null);
    const [ visits, setVisits ] = useState(null);
    const [ films, setFilms ] = useState(null);
    const [ studies, setStudies ] = useState(0);
    const [ live, setLive ] = useState(true);
    const isFocused = useIsFocused();

    useEffect(() => {
        getResult()
    }, [isFocused])

    const getResult = async() => {
        let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
        const resp = await fetch(`${proxy}/backend/results/${datas.id}/`)
        const data = await resp.json()
        setResult(data)
        setMonth('')
        setHours(data.hours)
        setMinutes(data.minutes)
        setPublications(data.publications)
        setVisits(data.visits)
        setFilms(data.films)
        console.log('data', data)
        console.log('userId', userData.id)
    }
    console.log('result', result)
    console.log('films', films)

    const deleteAll = async(datas) => {
      const resp = await fetch(`${proxy}/backend/event/delete-all/${datas.id}/`, {
        method: 'DELETE',
        'Content-Type': 'application/json',
      });
      const data = await resp.json()
      if (data){
        navigation.navigate('MonthsResults')
      }
    };

    const saveMonthResult = async() => {
        setLive(false)
        let lng = await AsyncStorage.getItem('language')
        let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
        const body = {'films': films}
        const resp = await fetch(`${proxy}/backend/month/create/${datas.id}/${lng}/${studies}/${month}/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(body),
        });
        const data = await resp.json()
        console.log('std', data)
        if (resp.status === 200){
          deleteAll(datas)  
          setLive(true)
          navigation.navigate('Menu')
        }
    };

if(live === true){

  return (
    <View style={styles.container}>
      <Animated.Image 
      source={require("../../assets/result_i.png")}
      style={[
        StyleSheet.absoluteFillObject,
      ]}
      blurRadius={5}
    />

    <ScrollView>

      <View style={styles.row}>
        <TextInput 
          placeholder={trans.month}
          placeholderTextColor="#D50000"
          value={month}
          onChangeText={(e) => {setMonth(e)}}
          style={styles.month}
        />
      </View>

      <View style={styles.row}>
        <View style={styles.left_row}>
          <Text style={styles.text}>
            {trans.Hours}:
          </Text>
        </View>
        <TextInput 
          value={hours}
          onChangeText={(e) => {setHours(e)}}
          style={styles.input}
        />
      </View>  

       <View style={styles.row}>
        <View style={styles.left_row}>
          <Text style={styles.text}>
            {trans.Minutes}:
          </Text>
        </View>
        <TextInput 
          value={minutes}
          onChangeText={(e) => {setMinutes(e)}}
          style={styles.input}
        />
      </View>  

      <View style={styles.row}>
        <View style={styles.left_row}>
          <Text style={styles.text}>
            {trans.Publications}:
          </Text>
        </View>
        <TextInput 
          value={publications}
          onChangeText={(e) => {setPublications(e)}}
          style={styles.input}
        />
      </View>

      <View style={styles.row}>
        <View style={styles.left_row}>
          <Text style={styles.text}>
            {trans.Visits}:
          </Text>
        </View>
        <TextInput 
          value={visits}
          onChangeText={(e) => {setVisits(e)}}
          style={styles.input}
        />
      </View> 


      <View style={styles.row}>
        <View style={styles.left_row}>
          <Text style={styles.text}>
            {trans.Films}:
          </Text>
        </View>
        <TextInput 
          value={films}
          onChangeText={(e) => {setFilms(e)}}
          style={styles.input}
        />
      </View>

      <View style={styles.row}>
        <View style={styles.left_row}>
          <Text style={styles.text}>
            {trans.BibleStudies}:
          </Text>
        </View>
        <TextInput 
          value={studies}
          onChangeText={(e) => {setStudies(e)}}
          style={styles.input}
        />
      </View>

      <SaveButton onPress={() => saveMonthResult()}/>
    </ScrollView>
    </View>
   )

}else{

  return(
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="#a1efff" />
      <Text style={styles.text_load}>Wysyłam...</Text>
    </View>
  )

}

    }
    
    const { width, height } = Dimensions.get('window');
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
        flexDirection: 'row',
      },
      text: {
        color: '#FAFAE6',
        fontSize: 20,
      },
      text_res: {
        color: '#FAFAE6',
        fontSize: 25,
      }, 
      month: {
        width: width * 0.8,
        height:50,
        borderRadius: 10,
        margin: 5,
        justifyContent: 'center',
        paddingLeft: 10,
        color: 'white',
        fontSize: 25,
        shadowColor: '#a1efff',
        shadowOpacity: 1,
        shadowOffset: {
        width: 0,
        height: 0,
        },
        shadowRadius: 6
      },
      left_row: {
        width: 250,
        height:50,
        borderRadius: 10,
        margin: 5,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: 10,
        shadowColor: '#a1efff',
        shadowOpacity: 1,
        shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowRadius: 6
      },
      input: {
        width: 50,
        height:50,
        borderRadius: 10,
        margin: 5,
        justifyContent: 'center',
        paddingLeft: 10,
        color: 'white',
        fontSize: 25,
        shadowColor: '#a1efff',
        shadowOpacity: 1,
        shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowRadius: 6
      },
      backbtn: {
        marginLeft: 100,
      },
      horizontal: {
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 10,
      },
      text_load: {
        fontSize: 15,
        color: '#a1efff'
      },
    });
    

export default Result
