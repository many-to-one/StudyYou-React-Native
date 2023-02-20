import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useRef, useState } from 'react';
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
import Animation from './Animation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from '../navbar_pages/Login';
import { AuthContext } from '../context/AuthContext';

const NewMenu = () => {

    const { width, height } = Dimensions.get('window');
    const navigation = useNavigation();
    const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
    const WIDTH = width * 0.72
    const HEIGHT = height
    const SPACING = 10;
    const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
    const BACKDROP_HEIGHT = height * 0.65;
    const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2;
    const scrollX = useRef(new Animated.Value(0)).current;
    const [profileToken, setProfileToken] = useState('')
    const {proxy, setLanguage} = useContext(AuthContext);
  

    useEffect(() => {
      profile()
    }, [])
  
  
  
    // ##### GET TOKEN FROM LOGGED USER BY ID FROM STORAGE ##### //
  
    const profile = async() => {
      let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
      if(datas === null){
        navigation.navigate('Login')
      }else{
        const resp = await fetch(`${proxy}/users/user/${datas.id}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await resp.json()
        if(data){
          setProfileToken(data.token)
          await setLanguage()
        }
      }
    }
  
    const DATA = [
      {key: 'spacer'},
      {
        key: '111',
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Profile',
        img: 'profile.png',
        // img: 'main.png',
        page: 'Profile',
      },
      {
        key: '112',
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Result',
        img: 'timer.png',
        // img: 'main.png',
        page: 'Timer',
      },
      {
        key: '113',
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Home',
        img: 'events.png',
        // img: 'main.png',
        page: 'Home'
      },
      {
        key: '114',
        id: '58694a0f-3da1-471f-bd96-145571e29d73',
        title: 'Counter',
        img: 'result.png',
        // img: 'main.png',
        page: 'Result',
      },
      {
        key: '115',
        id: '58694a0f-3da1-471f-bd96-145571e29d74',
        title: 'MonthsResults',
        img: 'history.png',
        // img: 'main.png',
        page: 'MonthsResults',
      },
      {key: 'spacer'},
      // {
      //   key: '116',
      //   id: '58694a0f-3da1-471f-bd96-145571e29d74',
      //   title: 'End',
      //   img: 'end.png',
      //   page: 'End',
      // },
    ];

    const PAG = [...DATA,]
    console.log('PAG', PAG)


    if(profileToken){

      return(
        <View style={{
          position: 'relative',
          // backgroundColor: 'black',
          height: height,
          width: width,
        }}>
          <View 
            style={[
                StyleSheet.absoluteFillObject
              ]}
          >
            {PAG.map((item, index) => {
              if(!item.img){
                return <View style={{width: SPACER_ITEM_SIZE - 20, height: 350}}/>
              }
              const inputRange = [
                (index - 2) * ITEM_SIZE,
                (index - 1) * ITEM_SIZE,
                index * ITEM_SIZE,
              ]
              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0, 1, 0]
              })
                return(
                  <Animated.Image 
                source={require(`../../assets/${item.img}`)}
                // source={require("../../assets/6.jpg")}
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
            {/* <LinearGradient
              // colors={['rgba(128,0,128)', '#E9E8E8']}
              colors={['rgba(0, 0, 0, 0)', '#4B0F30']}
              style={{
              height: BACKDROP_HEIGHT,
              width,
              position: 'absolute',
              bottom: 20,
              }}
            /> */}
          </View>
          <Animated.FlatList 
            data={PAG}
            keyExtractor={(item) => item.key} // key
            pagingEnabled
            decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
            renderToHardwareTextureAndroid
            showsHorizontalScrollIndicator={false}
            horizontal
            contentContainerStyle={{ alignItems: 'center' }}
            snapToInterval={ITEM_SIZE}
            bounces={false}
            snapToAlignment='start'
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: {x:scrollX} } }],
              {useNativeDriver: false}
            )}
            scrollEventThrottle={16}
            renderItem={({item, index}) => {
              if(!item.img){
                return <View style={{width: SPACER_ITEM_SIZE, height: 350}}></View>
              }
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
                <View style={{width: ITEM_SIZE}}>
                <TouchableOpacity onPress={() => navigation.navigate(item.page)}>
                <Animation item={item}/>
                  <Animated.View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    // marginLeft: -10,
                    // marginLeft: EMPTY_ITEM_SIZE,
                    // marginHorizontal: SPACING,
                    padding: SPACING * 4,
                    // gap: 2,
                    // width: 250,
                    height: 620,
                    width: ITEM_SIZE + 90,
                    borderRadius: 20,
                    bottom: 350,
                    // backgroundColor: 'red',
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
                      // source={require(`../../assets/${item.img}`)}
                      source={require("../../assets/pro_i.png")}
                      style={styles.img}
                    />
                  </Animated.View>
                </TouchableOpacity>
                </View>
              )
            }}
          />
    
        </View>
      )

    }else{

      return(
        <Login />
      )

    }
      
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
      // resizeMode: 'cover',
      borderRadius: 20,
    },
  })
  

export default NewMenu
