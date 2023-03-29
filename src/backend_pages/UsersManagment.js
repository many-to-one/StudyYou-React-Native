import React, { useContext, useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../context/AuthContext'
import { LanguageContext } from '../context/LanguageContext';
import { styles } from '../styles/Styles';
import User from './User';

const UsersManagment = ({navigation}) => {
    const {proxy, userData} = useContext(AuthContext)
    const {trans} = useContext(LanguageContext);
    const [users, setUsers] = useState([])
    // const users = []

    useEffect(() => {
        allUsers()
    },[])

    const allUsers = async() => {
        const resp = await fetch(`${proxy}/users/users/${userData.congregation}/`)
        const data = await resp.json()
        setUsers(data)
    }

    console.log('users', users)

  return (
    <View style={styles.container}>
        {users.map((user, index) => (
            <TouchableOpacity onPress={() => navigation.navigate('User', {user: user})}>
                <View style={styles.container}>
                    <View style={styles.user}>
                        <Text style={styles.user_text}>{user.username}</Text>
                    </View>
                </View>
            </TouchableOpacity>
    ))}
    </View>
  )
}

export default UsersManagment