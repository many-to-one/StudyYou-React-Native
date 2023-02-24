import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Animated, Image, Dimensions } from 'react-native';
import BackButton from '../buttons/BackButton';
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SaveButton from '../buttons/SaveButton';
import { LinearGradient } from 'expo-linear-gradient';
import { useIsFocused } from '@react-navigation/native';

const Result = ({navigation}) => {

    const { width, height } = Dimensions.get('window');
    const {proxy, Hours, Minutes, Publications, Visits, Films,} = useContext(AuthContext);
    const [ result, setResult ] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        getResult()
    }, [isFocused])

    const getResult = async() => {
        let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
        const resp = await fetch(`${proxy}/backend/results/${datas.id}/`)
        const data = await resp.json()
        setResult(data)
        console.log('data', data)
        console.log('userId', datas.id)
    }
    console.log('result', result)

    const deleteAll = async(datas) => {
      const resp = await fetch(`${proxy}/backend/event/delete-all/${datas.id}/`, {
        method: 'DELETE',
        'Content-Type': 'application/json',
      });
      const data = await resp.json()
      if (data){
        // window.location.reload()
        navigation.navigate('MonthsResults')
      }
    };

    const saveMonthResult = async() => {
        let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
        const resp = await fetch(`${proxy}/backend/month/create/${datas.id}/`)
        const data = await resp.json()
        if (data.status === 200){
          deleteAll(datas)
          navigation.navigate('Menu')
        }
    };

    return (
        <View style={styles.container}>
          <Animated.Image 
          source={require("../../assets/result_i.png")}
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
        <BackButton style={styles.backbtn} onPress={() => navigation.navigate('Menu')}/>
          <View style={styles.row}>
            <View style={styles.left_row}>
              <Text style={styles.text}>
                {Hours}:
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
                {Minutes}:
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
                {Publications}:
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
                {Visits}:
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
                {Films}:
              </Text>
            </View>
            <View style={styles.input}>
              <Text style={styles.text}>
                {result.films}
              </Text>
            </View>
          </View>
    
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
        // borderWidth: 2,
        // borderColor: '#C4BF1E',
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
        // borderWidth: 1,
        // borderColor: '#C4BF1E',
        margin: 5,
        alignItems: 'center',
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
    });
    

export default Result
