import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext';

const Logout = ({ navigation }) => {
  const { logout } = useContext(AuthContext);

    useEffect(() => {
      logout()
    }, [])

}

export default Logout
