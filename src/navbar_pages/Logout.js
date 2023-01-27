import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Logout = async({ navigation }) => {
  const { allUserInfo, proxy } = useContext(AuthContext);
    // const resp = await logout();

    useEffect(() => {
      logout()
    }, [])

    const logout = async() => {

      const resp = await fetch(`${proxy}/users/logout/${allUserInfo.id}/`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },

      });
      const data = await resp.json();
      navigation.navigate('Login');
      return '205';
  };


}

export default Logout
