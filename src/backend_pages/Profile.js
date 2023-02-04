import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react'
import { Text } from 'react-native';
import { View } from 'react-native-web';
import { AuthContext } from '../context/AuthContext'

const Profile = () => {
    const {proxy} = useContext(AuthContext);
    const [profile, setProfile] = useState([]);

    useEffect(() => {
        getProfile()
    }, [])

    const getProfile = async() => {
        const datas = JSON.parse(await AsyncStorage.getItem('asyncUserData'))
        const resp = await fetch(`${proxy}/users/user/${datas.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await resp.json()
        setProfile(data.data)
        console.log('profile:', data)
    }

  return (
    <View>
        <Text>{profile.username}</Text>
        <Text>{profile.email}</Text>
        {profile.is_superuser ? 
        
        <Text>Admin</Text> :
        <Text>Not Atmin</Text>
    }
      
    </View>
  )
}

export default Profile

