import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import AuthButton from '../buttons/AuthButton'
import { AuthContext, login } from '../context/AuthContext'

const Login = ({ navigation }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {userData, login} = useContext(AuthContext);

  const clearTextInput = () => {
    setEmail('')
    setPassword('')
  }

  const LoginApi = async () => {
    
    try {
      const resp = await login(email, password);
      if (resp === '200'){
        navigation.navigate('Home')
        clearTextInput()
        // alert('Hello..')
      }else{
        alert('Wrong data')
        navigation.navigate('Login')
      }
      
    } catch (error) {
      console.error('error', error);
    }     
      
  }
        return (
          <View style={styles.container}>
            <View>
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
                // onPress={() => LoginApi()}
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
  text: {
    color: 'white',
  }
})

export default Login
