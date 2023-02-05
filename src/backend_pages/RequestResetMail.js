import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react'
import { Text, View } from 'react-native';
import AuthButton from '../buttons/AuthButton';
import { AuthContext } from '../context/AuthContext';

const RequestResetMail = ({navigation}) => {

    const {proxy, passwordResetService} = useContext(AuthContext)
    const [token, setToken] = useState('')
    const [uidb64, setUidb64] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        resetMail();
    }, [])

    const resetMail = async() => {
    
        let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
        let email = datas.email
        const resp = await fetch(`${proxy}/users/request-reset-email/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email
            })
        })
        const data = await resp.json()
        setToken(data.token)
        setUidb64(data.uidb64)
        if (resp.status === 200){
            setSuccess(true)
            console.log('resetEmail:', data)
          }else{
            alert('Something is wrong...')
          }
    }

    const passwordReset = async() => {

        try {
            const resp = await passwordResetService(uidb64, token);
            if (resp.status === 200){
                console.log('passwordReset:', resp)
                alert('Please check your email')
            }
             
          } catch (error) {
            console.error('error', error);
          }
      
    }

  return (
    <View>
        {success ? 
        
        <AuthButton 
            title={'Confirm'}
            onPress={passwordReset()}
        />
         :

        <Text>Loading...</Text>
    }
    </View>
  )
}

export default RequestResetMail
