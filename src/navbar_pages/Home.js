import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, SafeAreaView, ScrollView, View, Animated, Image, Dimensions } from 'react-native'
import AllEvents from '../backend_pages/AllEvents'
import { AuthContext } from '../context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './Login';
import AddEventButton from '../buttons/AddEventButton';
import { LinearGradient } from 'expo-linear-gradient';
import { useIsFocused } from '@react-navigation/native';
import BackButton from '../buttons/BackButton';

const Home = ({navigation}) => {

  const { width, height } = Dimensions.get('window');
  const BACKDROP_HEIGHT = height * 0.65;
  const { proxy, token } = useContext(AuthContext);
  const [profileToken, setProfileToken] = useState('')
  const isFocused = useIsFocused();
  let datas;

  useEffect(() => {
    profile()
  }, [isFocused])



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
      }
    }

  // ################# END OF THE FUNCTION ################# //

  }

  // if(profileToken){

    return (
  
        <SafeAreaView style={styles.container_1}>
          <Animated.Image 
            source={require("../../assets/events_ibg.png")}
            style={[
              StyleSheet.absoluteFillObject,
            ]}
            blurRadius={5}
            />
        <AllEvents/>
        <AddEventButton 
          onPress={() => {
            navigation.navigate('AddEvent');
          }}
        />
        </SafeAreaView>
  
    )

  // } 
  // else {
  //   return(
  //     <Login />
  //   )
  // }

}


const styles = StyleSheet.create({

  main_container:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    gap: '5rem',
    padding: 20,
  },
  container_1: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    gap: '1rem',
    padding: 20,
    height: '10rem',
  },
  container_2: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'black',
    gap: '1rem',
    padding: 20,
  },  
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
  },
  lineStyle: {
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: "grey",
  },
})

export default Home