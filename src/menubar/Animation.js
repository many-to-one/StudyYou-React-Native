import React, { useEffect, useRef } from 'react'
import { Animated, Easing, StyleSheet, View } from 'react-native'

const Animation = ({item}) => {

  const spinValue = useRef(new Animated.Value(0)).current

  const spin = () => {
    spinValue.setValue(0);
    Animated.loop(
        Animated.timing(spinValue, {
            toValue: 1,
            duration: 6000,
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
        {/* <Animated.View style={{transform: [{rotate: rotate}]}}>
            <AntDesign name={'eercast'} color={'#E0E0F8'} size={100}/>
        </Animated.View> */}
        <Animated.Image
          style={{
            width: 300,
            height: 500,
            bottom: -50,
            opacity: 0.3,
            transform: [{rotate: rotate}]
            }}
          blurRadius={5}
          source={
            require(`../../assets/${item.img}`)
          }
        />
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
