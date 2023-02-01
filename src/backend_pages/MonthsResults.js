import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View } from 'react-native';
import BackButton from '../buttons/BackButton';
import MonthsResultsItem from './MonthsResultsItem';

const MonthsResults = ({navigation}) => {
    
    const {proxy} = useContext(AuthContext);
    const [ result, setResults ] = useState([]);

    useEffect(() => {
        getMonthsResults()
    }, [])

    const getMonthsResults = async() => {
        let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
        const resp = await fetch(`${proxy}/backend/get_months_results/${datas.id}/`)
        const data = await resp.json()
        setResults(data)
        console.log('getMonthsResults', data)
    };

    return (
         <View>
            {result.map((res, index) => (
                <MonthsResultsItem key={index} res={res}/>
            ))}
         </View>
      )
    }
    

export default MonthsResults
