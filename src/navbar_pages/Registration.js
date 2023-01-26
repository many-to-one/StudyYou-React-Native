import React, { useContext, useState } from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import Icon from "react-native-vector-icons/MaterialIcons";
import AuthButton from '../buttons/AuthButton'
import { AuthContext } from '../context/AuthContext';

const Registration = ({ navigation }) => {

  const { register } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const clearTextInput = () => {
    setUsername('')
    setEmail('')
    setPassword('')
  };

  const RegisterApi = async() => {
    try {
        const resp = await register(username, email, password);
        if (resp === '201'){
          navigation.navigate('Login')
          clearTextInput()
        }else{
          alert('Wrong data')
          navigation.navigate('Register')
        }
        
      } catch (error) {
        console.error('error', error);
      }   
}

  return (
    <View style={styles.container}>
    <Icon 
      name='arrow-back-ios' 
      onPress={() => navigation.navigate('Login')} 
      style={styles.back}  
      ></Icon>
      <View>
        <TextInput 
          placeholder='username'
          placeholderTextColor={'gray'}
          onChangeText={(text) => setUsername(text)}
          style={styles.input}
        />
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
          title={'Register'} 
          onPress={() =>  RegisterApi()}
          />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  back: {
    position: 'absolute',
    top: 25,
    marginLeft: -300,
    color: 'white',
    fontSize: 50,
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // gap/=: 25,
  },
  text: {
    color: 'black'
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

export default Registration
