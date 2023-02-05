import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Text } from 'react-native';
import { View } from 'react-native-web';
import { AuthContext } from '../context/AuthContext'
import AuthButton from '../buttons/AuthButton';

const Profile = ({navigation}) => {
    const {profile} = useContext(AuthContext);
    const [profileData, setProfileData] = useState([]);

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
    <View>
        <Text>{profileData.username}</Text>
        <Text>{profileData.email}</Text>
        {profileData.is_superuser ? 
        
        <Text>Admin</Text> :
        <Text>Not Atmin</Text>
    }
        <AuthButton 
            title={'Change password'}
            onPress={() => navigation.navigate('RequestResetMail')}
        />
      
    </View>
  )
}

export default Profile

