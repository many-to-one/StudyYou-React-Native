import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native';
import AuthButton from '../buttons/AuthButton';
import RegisterButton from '../buttons/RegisterButton';
import { AuthContext } from '../context/AuthContext';

const ForgotPassword = ({navigation}) => {

    const {proxy} = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [text, setText] = useState('')
    const [success, setSuccess] = useState(false)
    const [click_, setClick] = useState('')
    const [enterEmail_, setEnterEmail] = useState('')
    const [title, setTitle] = useState('')

    // useEffect(() => {
    //     resetMail();
    //     console.log('email2', email)
    // }, []) 

    useEffect(() => {
      translate()
    }, [])

    const translate = async() => {
      const get = await AsyncStorage.getItem('language')
        if (get === 'PL'){
          setClick('Kliknij tutaj')
          setEnterEmail('Wprowadź email')
          setTitle('Witamy na stronie zmiany hasła.')
        }else if (get === 'RU'){
          setClick('Нажмите здесь')
          setEnterEmail('Адрес электронной почты')
          setTitle('Добро пожаловать на страницу смены пароля.')
        }else if (get === 'UA'){
          setClick('Натиснути тут')
          setEnterEmail('Адреса електронної пошти')
          setTitle('Ласкаво просимо на сторінку зміни пароля.')
        }
      }

    const resetMail = async() => {
      // let email = JSON.parse(await AsyncStorage.getItem("f_email"))
        const resp = await fetch(`${proxy}/users/request-reset-email/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: email
            })
        })
        const data = await resp.json()
        if (resp.status === 200){
            setSuccess(true)
            setText(data.success)
            alert('Check your email')
            navigation.navigate('Login')
          }else{
            alert('Something is wrong...')
          }
    }


    return(
      <View style={styles.container}>
        <View style={styles.email}>
          <Text style={styles.text}>{title}</Text>
          <TextInput
            placeholder={enterEmail_}
            placeholderTextColor={'gray'}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
        </View>
        <RegisterButton 
          title={click_}
          onPress={() => resetMail()}
        />
      </View>

    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 25,
  },
  email: {
    gap: 25,
  },
  text: {
    color: 'white'
  },
  input: {
    width: 250,
    margin: 12,
    borderWidth: 1,
    borderBottomColor: '#F0007F',
    padding: 10,
    color: 'white',
  },
})

export default ForgotPassword
