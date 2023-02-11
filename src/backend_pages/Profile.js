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
import { SelectList } from 'react-native-dropdown-select-list';
import Icon from "react-native-vector-icons/Ionicons";

const Profile = ({navigation}) => {
    const { width, height } = Dimensions.get('window');
    const {profile} = useContext(AuthContext);
    const [profileData, setProfileData] = useState([]);
    const [selected, setSelected] = useState('')
    const Data = ['1', '2'] 

    useEffect(() => {
        getProfile()
    }, [])

    const getProfile = async() => {

        const resp = await profile()
        const data = resp
        setProfileData(data.data)
        console.log('profile:', data)
    }

  return (

    <View style={styles.container}>
      <Animated.Image 
          source={require("../../assets/events.png")}
          style={[
            StyleSheet.absoluteFillObject,
          ]}
          blurRadius={5}
        />
        <LinearGradient
            colors={['rgba(0, 0, 0, 0)', '#3F0053']}
            style={{
            height,
            width,
            position: 'absolute',
            bottom: -50,
            }}
          />
    <ScrollView>
    <SelectList 
        onSelect={() => alert(selected)}
        setSelected={setSelected} 
        // fontFamily='lato'
        data={Data} 
        boxStyles={styles.event}
        inputStyles={styles.text}
        dropdownStyles={styles.event}
        dropdownItemStyles={{color: 'white'}}
        dropdownTextStyles={{color: 'white'}}
        // arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />} 
        searchicon={<Icon name="search" size={20} color={'white'} />} 
        search={true} 
        // boxStyles={{borderRadius:5}} //override default styles
        // defaultOption={{ key:'1', value:'Jammu & Kashmir' }}
      />
    <BackButton onPress={() => navigation.navigate('Home')}/>

    <View>
        <Text style={styles.text}>{profileData.username}</Text>
        <Text style={styles.text}>{profileData.email}</Text>
        {profileData.is_superuser ? 
        
        <Text style={styles.text}>Admin</Text> :
        <Text style={styles.text}>Not Atmin</Text>
    }
        <AuthButton 
            title={'Change password'}
            onPress={() => navigation.navigate('RequestResetMail')}
        />
      
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
      // height: 50,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: '#EFA9FD',
      margin: 5,
      padding: 10,
      color: 'white',
      fontSize: 20,
      zIndex: 999,
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
    }
  });

export default Profile