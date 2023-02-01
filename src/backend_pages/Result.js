import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Animated, Image, Dimensions } from 'react-native';
import BackButton from '../buttons/BackButton';
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SaveButton from '../buttons/SaveButton';
import { LinearGradient } from 'expo-linear-gradient';

const Result = ({navigation}) => {

    const { width, height } = Dimensions.get('window');
    const {proxy} = useContext(AuthContext);
    const [ result, setResult ] = useState([]);

    useEffect(() => {
        getResult()
    }, [])

    const getResult = async() => {
        let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
        const resp = await fetch(`${proxy}/backend/results/${datas.id}/`)
        const data = await resp.json()
        setResult(data)
        console.log('data', data)
        console.log('userId', datas.id)
    }
    console.log('result', result)

    const saveMonthResult = async() => {
        let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
        const resp = await fetch(`${proxy}/backend/month/create/${datas.id}/`)
        if (resp){
            navigation.navigate('MonthsResults')
            window.location.reload()
        }

    }

    return (
        <View style={styles.container}>
          <Animated.Image 
          source={require("../../assets/result.png")}
          style={[
            StyleSheet.absoluteFillObject,
          ]}
          blurRadius={5}
        />
        <LinearGradient
            colors={['rgba(0, 0, 0, 0)', '#3F0053']}
            style={{
            height,
            width,
            position: 'absolute',
            bottom: -50,
            }}
          />
        <Text style={styles.text}>{result.date}</Text>
        <ScrollView>
          
          <View style={styles.row}>
            <View style={styles.left_row}>
              <Text style={styles.text}>
                Hours:
              </Text>
            </View>
            <View style={styles.input}>
              <Text style={styles.text}>
                {result.hours}
              </Text>
            </View>
           </View>  

          <View style={styles.row}>
            <View style={styles.left_row}>
              <Text style={styles.text}>
                Minutes:
              </Text>
            </View>
            <View style={styles.input}>
              <Text style={styles.text}>
                {result.minutes}
              </Text>
            </View>
          </View>   

          <View style={styles.row}>
            <View style={styles.left_row}>
              <Text style={styles.text}>
                Publications:
              </Text>
            </View>
            <View style={styles.input}>
              <Text style={styles.text}>
                {result.publications}
              </Text>
            </View>
          </View>  

          <View style={styles.row}>
            <View style={styles.left_row}>
              <Text style={styles.text}>
                Visits:
              </Text>
            </View>
            <View style={styles.input}>
              <Text style={styles.text}>
                {result.visits}
              </Text>
            </View>
          </View>  

          <View style={styles.row}>
            <View style={styles.left_row}>
              <Text style={styles.text}>
                Films:
              </Text>
            </View>
            <View style={styles.input}>
              <Text style={styles.text}>
                {result.films}
              </Text>
            </View>
          </View>
    
          <BackButton style={styles.backbtn} onPress={() => navigation.navigate('Home')}/>
          <SaveButton onPress={() => saveMonthResult()}/>
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
        flexDirection: 'row',
      },
      text: {
        justifyContent: 'center',
        alignItems: 'center',
        color: '#FAFAE6',
        fontSize: 20,
      },
      text_res: {
        justifyContent: 'center',
        alignItems: 'center',
        color: '#FAFAE6',
        fontSize: 20,
        padding: 20,
      }, 
      left_row: {
        // backgroundColor: '#282c34',
        width: 250,
        height:50,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#C4BF1E',
        margin: 5,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: 10,
      },
      input: {
        width: 50,
        height:50,
        borderRadius: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#C4BF1E',
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10,
        color: 'white',
        fontSize: 25,
      },
      backbtn: {
        marginLeft: 100,
      },
    });
    

export default Result
