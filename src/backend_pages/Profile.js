import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react'
import { Animated, Button, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
// import { View } from 'react-native-web';
import { AuthContext } from '../context/AuthContext'
import AuthButton from '../buttons/AuthButton';
import DoneButton from '../buttons/DoneButton'
import { useIsFocused } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import BackButton from '../buttons/BackButton';
import ChangePasswordBtn from '../buttons/ChangePasswordBtn';
import { SelectList } from 'react-native-dropdown-select-list';
import Icon from "react-native-vector-icons/Ionicons";
import { ChageLanguage } from '../context/ChageLanguage';
import Calendar from './Calendar';
import DatePickerCalendar from './DatePickerCalendar';
import CalendarII from './CalendarII';

const Profile = ({navigation}) => {
    const { width, height } = Dimensions.get('window');
    const {profile, setLanguage, marked, Changepassword_} = useContext(AuthContext);
    const [profileData, setProfileData] = useState([]);
    const [selected, setSelected] = useState('')
    const Data = [
      {key: 'PL', value: 'PL'},
      {key: 'RU', value: 'RU'},
      {key: 'UA', value: 'UA'},
    ] 

    useEffect(() => {
        getProfile()
    }, [])

    const getProfile = async() => {

        const resp = await profile()
        const data = resp
        setProfileData(data.data)
    }

    const language = async(selected) => {
      await AsyncStorage.setItem('language', selected)
      changeL()
    }

    const changeL = async() => {
      await setLanguage()
  }

  const plsHolder = () => {
    return <Icon name='md-language' size={20} color={'white'} />
  }

  return (

    <View style={styles.container}>
      <Animated.Image 
          source={require("../../assets/profile_i.png")}
          style={[
            StyleSheet.absoluteFillObject,
          ]}
          blurRadius={5}
        />
        <LinearGradient
            colors={['rgba(0, 0, 0, 0)', '#393939']}
            style={{
            height,
            width,
            position: 'absolute',
            bottom: -50,
            }}
          />
    <ScrollView>
    
    <BackButton onPress={() => navigation.navigate('Home')}/>

    <View>
      <SelectList 
          onSelect={() => language(selected)}
          setSelected={setSelected}
          placeholder={plsHolder()}
          // fontFamily='lato'
          data={Data} 
          boxStyles={styles.event}
          inputStyles={styles.text}
          dropdownStyles={styles.event}
          dropdownItemStyles={{color: 'white'}}
          dropdownTextStyles={{color: 'white'}}
          arrowicon={<Icon name="chevron-down" size={20} color={'white'} />} 
          searchicon={<Icon name="search" size={20} color={'white'} />} 
          search={true} 
          // defaultOption={{key: 'RU', value: language.RU}}
          // defaultOption={{ key:'1', value:'Jammu & Kashmir' }}
        />
        <View style={styles.event}>
          <Text style={styles.text}>
            {profileData.username}
          </Text>
        </View>
        <View style={styles.event}>
          <Text style={styles.text}>
            {profileData.email}
          </Text>
        </View>
        {profileData.is_superuser ? 

        <View style={styles.event}>
          <Text style={styles.text}>
            {profileData.email}
          </Text>
        </View>
         :
         <View />
    }
        <ChangePasswordBtn 
            title={Changepassword_}
            onPress={() => navigation.navigate('RequestResetMail')}
        />
        <Calendar />
          {/* <DatePickerCalendar/> */}

        <View style={styles.event}>
          
        </View>
      
    </View> 
    </ScrollView>
    </View>
    

  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 25,
      paddingTop: 25,
    },
    row: {
      flex: 1,
      flexDirection: 'row'
    },
    text: {
      color: 'white',
      fontSize: 20,
    },
    event:{
      width: 320,
      // height: 250,
      borderRadius: 10,
      borderWidth: 2,
      // borderColor: '#EFA9FD',
      borderColor: '#78D7D9',
      margin: 5,
      padding: 10,
      color: 'white',
      fontSize: 20,
      zIndex: 999,
      backgroundColor: 'transparent'
    },  
    left_row: {
      width: 250,
      height:50,
      borderWidth: 2,
      borderColor: '#EFA9FD',
      borderRadius: 10,
      margin: 5,
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingLeft: 10,
    },
    input: {
      width: 50,
      height:50,
      borderWidth: 2,
      borderColor: '#EFA9FD',
      borderRadius: 10,
      margin: 5,
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: 10,
      color: 'white',
      fontSize: 25,
    },
    back_button: {
        fontSize: 50,
        color: '#EFA9FD',
        position: 'absolute',
        marginTop: 470,
        marginLeft: 30,
    },
  });

export default Profile