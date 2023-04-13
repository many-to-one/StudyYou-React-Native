import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

const LoadingPage = ({navigation}) => {
    const isFocused = useIsFocused();

    useEffect(() => {
        setTimeout(Back, 2000)
    }, [isFocused])

    const Back = async() => {
        navigation.navigate('Profile')
    }

    return (
        <View style={[loading.container, loading.horizontal]}>
          <ActivityIndicator size="large" color="#a1efff" />
          <Text style={loading.text_load}>Ładuję...</Text>
        </View>
      )
}

const loading = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 25,
        paddingTop: 25,
      },
    horizontal: {
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 10,
      },
    text_load: {
      fontSize: 15,
      color: '#a1efff'
    },
})
export default LoadingPage
