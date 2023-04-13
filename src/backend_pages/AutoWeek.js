import React from 'react'
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AutoCalendarWeek from './AutoCalendarWeek';

const AutoWeek = ({navigation}) => {
  return (
    <View>
        <AutoCalendarWeek />
    </View>
  )
}

export default AutoWeek
