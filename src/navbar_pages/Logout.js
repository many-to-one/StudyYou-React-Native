import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext';

const Logout = async({ navigation }) => {
  const { logout } = useContext(AuthContext);
    // try {
    //     await logout();
    //     if(data.resp === 500){
    //       alert('You need to loging up before logout')
    //       navigation.navigate('Login')
    //     }
    //   } catch (error) {
    //     console.error('error', error);
    //     alert('You need to loging up before logout')
    //     navigation.navigate('Login')
    //   }

    const resp = await logout();
      // if(resp === '205'){
      //   alert('You are lorged out')
      //   navigation.navigate('Login')
      // } else {
      //   alert('You need to loging up before logout')
      //   navigation.navigate('Login')
      // }  

}

export default Logout
