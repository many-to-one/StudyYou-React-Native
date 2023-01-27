import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Logout = ({ navigation }) => {
  const { userData, proxy } = useContext(AuthContext);
    // const resp = await logout();

    useEffect(() => {
      logout()
    }, [])

    const logout = async() => {

      let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))

      const resp = await fetch(`${proxy}/users/logout/${datas.id}/`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },

      });
      const data = await resp.json();
      await AsyncStorage.removeItem("asyncUserData")
      window.location.reload()
      navigation.navigate('Login');
      return '205';
  };


}

export default Logout
