import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet, TextInput } from 'react-native'
import AuthButton from '../buttons/AuthButton'
import { AuthContext } from '../context/AuthContext'
import Test from './Test'

const Login = ({ navigation }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const LoginApi = async () => {
    const resp = await fetch("/users/login/", {
      method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          email: email,
          password: password,
      })
    })
      
  }
        return (
          <View style={styles.container}>
            <View>
              <TextInput 
                onChangeText={(text) => setEmail(text)}
                style={styles.input}
              />
              <TextInput 
                onChangeText={(text) => setPassword(text)}
                style={styles.input}
              />
              <AuthButton 
              title={'Login'} 
              onPress={() => LoginApi()}
              // navigation.navigate('Home')
              />
            </View>
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
})

export default Login
