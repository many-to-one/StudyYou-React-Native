import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import AllEvents from '../backend_pages/AllEvents'
import AuthButton from '../buttons/AuthButton'
import RegisterButton from '../buttons/RegisterButton'
import { AuthContext } from '../context/AuthContext'
import Menu from './Menu'
import { useNavigation } from '@react-navigation/native'
import { SelectList } from 'react-native-dropdown-select-list'
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LanguageContext } from '../context/LanguageContext'


const Login = () => {

  const navigation = useNavigation() 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, logged} = useContext(AuthContext);
  const [lng, setLng] = useState(false)
  const [selected_l, setSelected_l] = useState('')
  const [congregation, setCongregation] = useState('');
  const [forgotPassword_, setForgotPassword] = useState('')
  const [dhaccount_, setDhaccount] = useState('')
  const [registration_, setRegistration] = useState('')
  const [login_, setLogin] = useState('')
  const [click_, setClick] = useState('')
  const [enterEmail_, setEnterEmail] = useState('')
  const [enterPassword_, setEnterPassword] = useState('')
  const Data_c = [
    {key: 'Sława', value: 'Sława'}
  ]
  const Data_l = [
    {key: 'PL', value: 'PL'},
    {key: 'RU', value: 'RU'},
    {key: 'UA', value: 'UA'},
  ]
 
  const clearTextInput = () => {
    setEmail('') 
    setPassword('')
  }

  useEffect(() => {
    isLanguage()
  }, [])

  const isLanguage = async() => {
    const get = await AsyncStorage.getItem('language')
    if(get !== null){
      setLng(true)
      if (get === 'PL'){
        setForgotPassword('Nie Pamiętam hasła')
        setDhaccount('Załóż konto')
        setClick('Kliknij tutaj')
        setRegistration('Rejestracja')
        setLogin('Załogować się')
        setEnterEmail('Wprowadź email')
        setEnterPassword('Wprowadź hasło')
      }else if (get === 'RU'){
        setForgotPassword('Не помню пароль')
        setDhaccount('Ещё не зарегистрированы?')
        setClick('Нажмите здесь')
        setRegistration('Регистрация')
        setLogin('Войти')
        setEnterEmail('Адрес электронной почты')
        setEnterPassword('Пароль')
      }else if (get === 'UA'){
        setForgotPassword("Hе пам'ятаю пароль")
        setDhaccount('Ще не зареєстровані?')
        setClick('Натиснути тут')
        setRegistration('Реєстрація')
        setLogin('Увійти')
        setEnterEmail('Адреса електронної пошти')
        setEnterPassword('Пароль')
      }
    }else{
      setLng(false)
    }
  }

  const language = async(selected) => {
    await AsyncStorage.setItem('language', selected)
  }

  const LoginApi = async () => {
    
    // try {
      const resp = await login(email, password, congregation);
      if (resp === '200'){
        clearTextInput()
        navigation.navigate('Menu')
      }else{
        navigation.navigate('Login')
      }
      
    // } catch (error) {
    //   console.error('error', error);
    // }     
      
  }

    if(logged === true){
      return(
        <View>
          <Menu />
        </View>
      )
    }else if(lng === false){
      return(
          <View style={styles.container}>
            <View style={styles.login}>
              <TextInput 
                placeholder={enterEmail_}
                placeholderTextColor={'gray'}
                onChangeText={(text) => setEmail(text)}
                style={styles.input}
              />
              <TextInput 
                placeholder={enterPassword_}
                placeholderTextColor={'gray'}
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                style={styles.input}
              />
              <SelectList 
                onSelect={() => language(selected_l)}
                setSelected={setSelected_l}
                placeholder={<Icon name='earth' size={20} color={'white'} />}
                data={Data_l} 
                boxStyles={styles.event}
                inputStyles={styles.text}
                dropdownStyles={styles.selectlist}
                dropdownItemStyles={{color: 'white'}}
                dropdownTextStyles={{color: 'white'}}
                arrowicon={<Icon name="chevron-down" size={15} color={'white'} />} 
                searchicon={<Icon name="search" size={15} color={'white'} />} 
                search={true} 
              />
                <AuthButton 
                title={login_} 
                onPress={() =>  LoginApi()}
              />
            </View>

              <View style={styles.register}>
                <Text style={styles.text}>
                  {forgotPassword_}
                </Text>
                <RegisterButton 
                  title={click_} 
                  onPress={() =>  navigation.navigate('ForgotPassword', {email: email})}
                />
              </View>

              <View style={styles.register}>
                <Text style={styles.text}>
                  {registration_}
                </Text>
                <RegisterButton 
                  title={'Registration'} 
                  onPress={() =>  navigation.navigate('Registration')}
                />
              </View>

          </View> 
    
        )
    }else if(lng === true){

      return(
        <View style={styles.container}>
          <View style={styles.login}>
            <TextInput 
              placeholder={enterEmail_}
              placeholderTextColor={'gray'}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
            />
            <TextInput 
              placeholder={enterPassword_}
              placeholderTextColor={'gray'}
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
              style={styles.input}
            />
              <AuthButton 
              title={login_} 
              onPress={() =>  LoginApi()}
            />
          </View>

            <View style={styles.register}>
              <Text style={styles.text}>
                {forgotPassword_}
              </Text>
              <RegisterButton 
                style={styles.btn}
                title={click_} 
                onPress={() =>  navigation.navigate('ForgotPassword', {email: email})}
              />
            </View>

            <View style={styles.register}>
              <Text style={styles.text}>
               {dhaccount_}
              </Text>
              <RegisterButton 
                title={registration_} 
                onPress={() =>  navigation.navigate('Registration')}
              />
            </View>

        </View> 
  
      )

    }

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
  login: {
    gap: 25,
  },
  register: {
    gap: 15,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#F0007F',
  },
  input: {
    width: 250,
    margin: 12,
    borderWidth: 1,
    borderBottomColor: '#F0007F',
    padding: 10,
    color: 'white',
  },
  text: {
    color: 'white',
  },
  textL: {
    color: 'white',
    fontSize: 20,
  },
  event:{
    width: 250,
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#EFA9FD',
    margin: 12,
    padding: 10,
    color: 'white',
    fontSize: 20,
    zIndex: 999,
  },  
  btn: {
    width: 200,
    height: 50,
    backgroundColor: 'gray',
  },
})

export default Login
