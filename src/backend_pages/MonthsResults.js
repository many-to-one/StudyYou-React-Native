import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FlatList, ScrollView, StyleSheet, View, Animated, Image, Dimensions, RefreshControl } from 'react-native';
import BackButton from '../buttons/BackButton';
import MonthsResultsItem from './MonthsResultsItem';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

const MonthsResults = ({navigation}) => {
    
    const { width, height } = Dimensions.get('window');
    const {proxy} = useContext(AuthContext);
    const [ result, setResults ] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        getMonthsResults();
    }, [isFocused])

    const getMonthsResults = async() => {
        let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
        const resp = await fetch(`${proxy}/backend/get_months_results/${datas.id}/`)
        const data = await resp.json()
        setResults(data)
        console.log('getMonthsResults', data)
    };

    return (
         <View style={styles.container}>
            <Animated.Image 
                source={require("../../assets/history.png")}
                style={[
                  StyleSheet.absoluteFillObject,
                ]}
                blurRadius={5}
            />
            <LinearGradient
                colors={['rgba(0, 0, 0, 0)', '#4B0F30']}
                style={{
                height,
                width,
                position: 'absolute',
                bottom: -50,
                }}
            />
            <ScrollView>
            {result.map((res, index) => (
                <MonthsResultsItem key={index} res={res}/>
            ))}
            </ScrollView>
         </View>
      )

    }

    const styles = StyleSheet.create({
        container:{
            flex:1,

            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center',
        }
    })
    

export default MonthsResults
