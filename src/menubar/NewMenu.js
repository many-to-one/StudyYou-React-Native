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
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const NewMenu = () => {

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
        key: '111',
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Profile',
        img: 'profile.png',
        page: 'Profile',
      },
      {
        key: '112',
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Result',
        img: 'timer.png',
        page: 'Timer',
      },
      {
        key: '113',
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Home',
        img: 'events.png',
        page: 'Home'
      },
      {
        key: '114',
        id: '58694a0f-3da1-471f-bd96-145571e29d73',
        title: 'Counter',
        img: 'result.png',
        page: 'Result',
      },
      {
        key: '115',
        id: '58694a0f-3da1-471f-bd96-145571e29d74',
        title: 'MonthsResults',
        img: 'history.png',
        page: 'MonthsResults',
      },
      {
        key: '116',
        id: '58694a0f-3da1-471f-bd96-145571e29d74',
        title: 'End',
        img: 'end.png',
        page: 'End',
      },
    ];


    return(
      <View style={{
        position: 'relative',
        backgroundColor: 'black',
        height: height,
        width: width,
      }}>
        <View 
          style={[
              StyleSheet.absoluteFillObject
            ]}
        >
          {DATA.map((item, index) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width
            ]
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0, 1, 0]
            })
            return(
              <Animated.Image 
            source={require(`../../assets/${item.img}`)}
            style={[
              StyleSheet.absoluteFillObject,
              {
                opacity
              }
            ]}
            blurRadius={10}
          />
            )
          })}
          <LinearGradient
            colors={['rgba(0, 0, 0, 0)', '#E9E8E8']}
            style={{
            height: BACKDROP_HEIGHT,
            width,
            position: 'absolute',
            bottom: 20,
            }}
          />
        </View>
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
              (index - 1) * ITEM_SIZE,  
              index * ITEM_SIZE,
              (index + 1) * ITEM_SIZE,
            ];
            const translateY = scrollX.interpolate({
              inputRange,
              outputRange: [0, -40, 0],
              extrapolate: 'clamp',
            })
            return(
              <TouchableOpacity onPress={() => navigation.navigate(item.page)}>
                <Animated.View style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: EMPTY_ITEM_SIZE,
                  marginHorizontal: SPACING,
                  padding: SPACING * 2,
                  gap: 2,
                  width: 250,
                  height: 350,
                  borderRadius: 20,
                  transform: [{translateY}],
                  // shadowColor: '#000',
                  // shadowOpacity: 1,
                  // shadowOffset: {
                  //   width: 0,
                  //   height: 0,
                  // },
                  // shadowRadius: 20,
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
      position: 'relative',
      bottom: 100,
      width: 300,
      borderWidth: 'none',
    },
    text:{
      color: 'green'
    },
    item:{
      justifyContent: 'center',
      alignItems: 'center',
      padding: 75,
      marginLeft: 50,
      width: 200,
      height: 200,
    },
    img:{
      width:250,
      height:350,
      resizeMode: 'cover',
      borderRadius: 20,
    },
  })
  

export default NewMenu
