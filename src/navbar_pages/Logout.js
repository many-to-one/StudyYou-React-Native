import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';

const Logout = async() => {
  const { logout } = useContext(AuthContext);
    try {
        await logout();
      } catch (error) {
        console.error('error', error);
      }

}

export default Logout
