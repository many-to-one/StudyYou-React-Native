import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ScrollView, StyleSheet, View, Animated, Image, Dimensions, RefreshControl } from 'react-native';
import MonthsResultsItem from './MonthsResultsItem';
import { useIsFocused } from '@react-navigation/native';

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
        const reverse_data = data.data
        reverse_data.sort()
        reverse_data.reverse()
        setResults(reverse_data)
        await AsyncStorage.setItem("monthsResult", JSON.stringify(data.data));
        console.log('getMonthsResults', data)
        let i = 0
        data.data.map((e) => {
            i += 1
            if(i == 14){
                deleteAllMonthResults()
                console.log('deleted number:', i)
            }
        })
    };

    const deleteAllMonthResults = async() => {
        let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
        const resp = await fetch(`${proxy}/backend/delete_all_months_results/${datas.id}/`, {
            method: 'DELETE'
        })
        const data = await resp.json()
        console.log('deleted data', data)
    }

    return (
         <View style={styles.container}>
            <Animated.Image 
                source={require("../../assets/history_i.png")}
                style={[
                  StyleSheet.absoluteFillObject,
                ]}
                blurRadius={5}
            />
            <ScrollView>
            {result.map((res, index) => (
                <MonthsResultsItem key={res.id} res={res}/>
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
