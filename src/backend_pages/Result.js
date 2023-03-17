import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Animated, Dimensions, TextInput } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SaveButton from '../buttons/SaveButton';
import { LinearGradient } from 'expo-linear-gradient';
import { useIsFocused } from '@react-navigation/native';
import { LanguageContext } from '../context/LanguageContext';

const Result = ({navigation}) => {

    const { width, height } = Dimensions.get('window');
    const {proxy} = useContext(AuthContext);
    const {trans} = useContext(LanguageContext);
    const [ result, setResult ] = useState([]);
    const [ studies, setStudies ] = useState(0);
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
        navigation.navigate('MonthsResults')
      }
    };

    const saveMonthResult = async() => {
        let lng = await AsyncStorage.getItem('language')
        let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
        const resp = await fetch(`${proxy}/backend/month/create/${datas.id}/${lng}/${studies}/`)
        const data = await resp.json()
        console.log('std', data)
        if (resp.status === 200){
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
          <View style={styles.row}>
            <View style={styles.left_row}>
              <Text style={styles.text}>
                {trans.Hours}:
              </Text>
            </View>
            <View style={styles.input}>
              <Text style={styles.text_res}>
                {result.hours}
              </Text>
            </View>
           </View>  

          <View style={styles.row}>
            <View style={styles.left_row}>
              <Text style={styles.text}>
                {trans.Minutes}:
              </Text>
            </View>
            <View style={styles.input}>
              <Text style={styles.text_res}>
                {result.minutes}
              </Text>
            </View>
          </View>   

          <View style={styles.row}>
            <View style={styles.left_row}>
              <Text style={styles.text}>
                {trans.Publications}:
              </Text>
            </View>
            <View style={styles.input}>
              <Text style={styles.text_res}>
                {result.publications}
              </Text>
            </View>
          </View>  

          <View style={styles.row}>
            <View style={styles.left_row}>
              <Text style={styles.text}>
                {trans.Visits}:
              </Text>
            </View>
            <View style={styles.input}>
              <Text style={styles.text_res}>
                {result.visits}
              </Text>
            </View>
          </View>  

          <View style={styles.row}>
            <View style={styles.left_row}>
              <Text style={styles.text}>
                {trans.Films}:
              </Text>
            </View>
            <View style={styles.input}>
              <Text style={styles.text_res}>
                {result.films}
              </Text>
            </View>
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
        // justifyContent: 'center',
        // alignItems: 'center',
        color: '#FAFAE6',
        fontSize: 20,
      },
      text_res: {
        // justifyContent: 'center',
        // alignItems: 'center',
        color: '#FAFAE6',
        fontSize: 25,
        // padding: 20,
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
        // alignItems: 'center',
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
