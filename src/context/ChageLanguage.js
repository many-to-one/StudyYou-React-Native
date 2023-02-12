import React, { useContext, useEffect } from 'react'
import { AuthContext } from './AuthContext';
import { useIsFocused } from '@react-navigation/native';

const ChageLanguage = () => {
    const {setLanguage} = useContext(AuthContext);

    useEffect(() => {
        changeL()
    }, [])

    const changeL = async() => {
        await setLanguage()
    }
}

export default ChageLanguage

