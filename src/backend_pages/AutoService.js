import React from 'react'
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AutoCalendarService from './AutoCalendarService';

const AutoService = () => {
    const navigation = useNavigation();
  return (
    <View>
        <AutoCalendarService />
    </View>
  )
}

export default AutoService
