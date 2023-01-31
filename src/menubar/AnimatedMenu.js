import { StatusBar } from 'expo-status-bar';
import React, { useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Animated,
  FlatList,
  TouchableOpacity,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Menu = () => {

  const { width, height } = Dimensions.get('window');
  const navigation = useNavigation();
  const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
  const WIDTH = width * 0.72
  const HEIGHT = height
  const SPACING = 10;
  const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
  const BACKDROP_HEIGHT = height * 0.65;
  const scrollX = useRef(new Animated.Value(0)).current;

  const DATA = [
    {
      id: '1',
      title: 'Profile',
      img: 'profile.png'
    },
    {
      id: '2',
      title: 'Result',
      img: 'profile.png'
    },
    {
      id: '3',
      title: 'History',
      img: 'profile.png'
    },
    {
      id: '4',
      title: 'Counter',
      img: 'profile.png'
    },
    {
      id: '5',
      title: 'Calendar',
      img: 'profile.png'
    },
  ];

  const Item = ({title}) => {
    return(
      <View>
        <Text style={styles.text}>{title}</Text>
      </View>
    )
  }

  const handleSubmit = ({item}) => {
    if(item.title === 'Third Item'){
      navigation.navigate('Login')
    }
  }

  return(
    <View style={{
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'black',
      height: height,
      width: width,
    }}>
      <Animated.FlatList 
        data={DATA}
        keyExtractor={(item) => item.key} // key
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={{ alignItems: 'center' }}
        snapToInterval={ITEM_SIZE}
        decelerationRate={0}
        bounces={false}
        snapToAlignment='start'
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: {x:scrollX} } }],
          {useNativeDriver: false}
        )}
        scrollEventThrottle={16}
        renderItem={({item, index}) => {
          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
          ];
          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [100, 50, 100],
            extrapolate: 'clamp',
          })
          return(
            <TouchableOpacity onPress={() => handleSubmit({item})}>
              <Animated.View style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: SPACING,
                padding: SPACING * 2,
                width: ITEM_SIZE,
                height: ITEM_SIZE,
                transform: [{translateY}],
              }}>
                <Image
                  source={require(`../../assets/${item.img}`)}
                  style={styles.img}
                />
              </Animated.View>
            </TouchableOpacity>
          )
        }}
      />

    </View>
  )
    
}

const styles = StyleSheet.create({
  container:{
    position: 'absolute',
    // height: {height},
  },
  text:{
    color: 'green'
  },
  item:{
    justifyContent: 'center',
    alignItems: 'center',
    padding: 75,
    marginLeft: 200,
    marginRight: 200,
    width: 200,
    height: 200,
    // transform: translateY,
    // borderWidth: 2,
    // borderRadius: 500,
    // borderColor: 'blue',
  },
  img:{
    width:400,
    height:400,
    resizeMode: 'cover',
    borderRadius: 500,
  },
})

export default Menu