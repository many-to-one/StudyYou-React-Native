import React, { useEffect, useRef } from 'react'
import { Animated, Easing, StyleSheet, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/FontAwesome';

const Animation = () => {

  const spinValue = useRef(new Animated.Value(0)).current

  const spin = () => {
    spinValue.setValue(0);
    Animated.loop(
        Animated.timing(spinValue, {
            toValue: 1,
            duration: 3000,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start(() => spin())
    )
  }

  useEffect(() => {
    spin()
  })

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })
  return (
    <View style={styles.container}>
        <Animated.View style={{transform: [{rotate: rotate}]}}>
            <AntDesign name={'eercast'} color={'#E0E0F8'} size={100}/>
        </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Animation
