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
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from '../navbar_pages/Login';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';

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
    const {proxy} = useContext(AuthContext);
    const {setLanguage} = useContext(LanguageContext);
  

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
        title: 'PROFILE',
        bg: 'profile_m.png',
        img: 'profile_i.png',
        page: 'Profile',
      },
      {
        key: '112',
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'TIMER',
        bg: 'timer.png',
        img: 'timer_i.png',
        page: 'Timer',
      },
      {
        key: '113',
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'EVENTS',
        bg: 'events.png',
        img: 'events_i.png',
        page: 'Home'
      },
      {
        key: '114',
        id: '58694a0f-3da1-471f-bd96-145571e29d73',
        title: 'RESULT',
        bg: 'result.png',
        img: 'result_i.png',
        page: 'Result',
      },
      {
        key: '115',
        id: '58694a0f-3da1-471f-bd96-145571e29d74',
        title: 'HISTORY',
        bg: 'history.png',
        img: 'history_i.png',
        page: 'MonthsResults',
      },
      {key: 'spacer'},
    ];


    if(profileToken){

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
                // source={require("../../assets/bgbg.png")}
                style={[
                  StyleSheet.absoluteFillObject,
                  {
                    opacity
                  }
                ]}
                blurRadius={6}
              />
                )
            })}
            <LinearGradient
              colors={['rgba(128,0,128)', '#E9E8E8']}
              // colors={['rgba(0, 0, 0, 0)', '#4B0F30']}
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
                  <View >
                  <Text style={{
                    color: '#78F5FA',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 50,
                    fontSize: 30,
                    marginLeft: ITEM_SIZE / 2,
                    marginHorizontal: SPACING,
                    // padding: SPACING * 4,
                  }}>{item.title}
                  </Text>
                  </View>
                <TouchableOpacity onPress={() => navigation.navigate(item.page)}>
                {/* <Animation item={item}/> */}
                  <Animated.View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: EMPTY_ITEM_SIZE + 7,
                    marginHorizontal: SPACING,
                    padding: SPACING,
                    width: ITEM_SIZE - 15,
                    height: height/2,
                    borderRadius: 20,
                    bottom: 100,
                    // gap: 1,
                    // backgroundColor: 'red',
                    transform: [{translateY}],
                    shadowColor: 'white',
                    shadowOpacity: 1,
                    shadowOffset: {
                      width: 0,
                      height: 0,
                    },
                    shadowRadius: 4,
                  }}>
                    <Image
                      source={require(`../../assets/${item.img}`)}
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

  const { width, height } = Dimensions.get('window');
  const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
  const styles = StyleSheet.create({
    container:{
      position: 'relative',
      bottom: 100,
      width: 300,
      borderWidth: 'none',
    },
    title: {
      borderBottomColor: '#78F5FA',
      gap: 10,
      borderBottomWidth: 10,
      // marginLeft: 20,
      // marginHorizontal: 20
      // marginLeft: ITEM_SIZE / 2.2,
    },
    text:{
      color: '#78F5FA'
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
      width: ITEM_SIZE - 15,
      height:height/2,
      resizeMode: 'cover',
      borderRadius: 20,
    },
  })
  

export default NewMenu
