import React from 'react'
import AutoCalendar from './AutoCalendar';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AutoStand = () => {
    const navigation = useNavigation();
  return (
    <View>
        <AutoCalendar />
    </View>
  )
}

export default AutoStand
