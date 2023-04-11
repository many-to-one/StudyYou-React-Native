import React from 'react'
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AutoCalendarMinistry from './AutoCalendarMinistry';

const AutoMinistry = () => {
    const navigation = useNavigation();
  return (
    <View>
        <AutoCalendarMinistry />
    </View>
  )
}

export default AutoMinistry
