import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import AllEvents from '../backend_pages/AllEvents'
import AuthButton from '../buttons/AuthButton'
import RegisterButton from '../buttons/RegisterButton'
import { AuthContext } from '../context/AuthContext'
import Home from './Home'
import { useNavigation } from '@react-navigation/native'


const Login = () => {

  const navigation = useNavigation() 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {userData, login,token, profileToken, logged} = useContext(AuthContext);

  // console.log('profileToken:', profileToken)

  const clearTextInput = () => {
    setEmail('')
    setPassword('')
  }

  const LoginApi = async () => {
    
    // try {
      const resp = await login(email, password);
      if (resp === '200'){
        clearTextInput()
        navigation.navigate('Home')
        window.location.reload()
      }else{
        navigation.navigate('Login')
      }
      
    // } catch (error) {
    //   console.error('error', error);
    // }     
      
  }

  const Register = () => {
    navigation.navigate('Registration')
  }

    if(logged === true){
      return(
        <View>
          <Home />
        </View>
      )
    }else{
      return(
          <View style={styles.container}>
            <View style={styles.login}>
              <Text style={styles.text}>Hi {userData.username} </Text>
              <TextInput 
                placeholder="Enter email"
                placeholderTextColor={'gray'}
                onChangeText={(text) => setEmail(text)}
                style={styles.input}
              />
              <TextInput 
                placeholder="Enter password"
                placeholderTextColor={'gray'}
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                style={styles.input}
              />
                <AuthButton 
                title={'Login'} 
                onPress={() =>  LoginApi()}
              />
            </View>

              <View style={styles.register}>
                <Text style={styles.text}>
                  Forgot your password?
                </Text>
                <RegisterButton 
                  title={'Click here'} 
                  onPress={() =>  navigation.navigate('RequestResetMail')}
                />
              </View>

              <View style={styles.register}>
                <Text style={styles.text}>
                  Don't have an account?
                </Text>
                <RegisterButton 
                  title={'Registration'} 
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
  }
})

export default Login
