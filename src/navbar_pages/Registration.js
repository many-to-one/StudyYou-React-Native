import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useState } from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
// import Icon from "react-native-vector-icons/MaterialIcons";
import AuthButton from '../buttons/AuthButton'
import { AuthContext } from '../context/AuthContext';
import { SelectList } from 'react-native-dropdown-select-list';
import Icon from "react-native-vector-icons/Ionicons";

const Registration = ({ navigation }) => {

  const { register } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [congregation, setCongregation] = useState('');
  const [language, setLanguage] = useState('');
  const [selected_l, setSelected_l] = useState('')
  const Data_c = [
    {key: 'Sława', value: 'Sława'},
    {key: 'Opole', value: 'Opole'},
  ]
  const Data_l = [
    {key: 'PL', value: 'PL'},
    {key: 'RU', value: 'RU'},
    {key: 'UA', value: 'UA'},
  ] 

  const clearTextInput = () => {
    setUsername('')
    setEmail('')
    setPassword('')
  };

  const lng = async(selected) => {
    await AsyncStorage.setItem('language', selected_l)
  }

  const RegisterApi = async() => {
    try {
        const resp = await register(username, email, password, congregation, language);
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
      <View>
      <SelectList 
          onSelect={() => setCongregation}
          setSelected={setCongregation}
          placeholder={<Icon name='filter-outline' size={30} color={'white'} />}
          data={Data_c} 
          boxStyles={styles.event}
          inputStyles={styles.text_c}
          dropdownStyles={styles.selectlist}
          dropdownItemStyles={{color: 'white'}}
          dropdownTextStyles={{color: 'white'}}
          arrowicon={<Icon name="chevron-down" size={20} color={'white'} />} 
          searchicon={<Icon name="search" size={20} color={'white'} />} 
          search={true} 
        />
         <SelectList 
            onSelect={() => lng(selected_l)}
            setSelected={setSelected_l} 
            data={Data_l}
            boxStyles={styles.event}
            inputStyles={styles.text_c}
            dropdownStyles={styles.event}
            dropdownItemStyles={{color: 'white'}}
            dropdownTextStyles={{color: 'white'}}
            arrowicon={<Icon name="chevron-down" size={20} color={'white'} />} 
            searchicon={<Icon name="search" size={20} color={'white'} />} 
            search={true} 
          /> 
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
  },
  text: {
    color: 'black'
  },
  text_c: {
    color: '#a1efff',
    fontSize: 15,
  },
  input: {
    width: 250,
    margin: 12,
    borderWidth: 1,
    borderBottomColor: '#F0007F',
    padding: 10,
    color: 'white',
  },
  event:{
    width: 250,
    height: 60,
    margin: 12,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: 20,
    padding: 10,
    color: 'white',
    fontSize: 20,
    zIndex: 999,
    backgroundColor: 'transparent'
  }, 
  selectlist:{
    width: 250,
    margin: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: 20,
    padding: 10,
    color: 'white',
    fontSize: 20,
    zIndex: 999,
    backgroundColor: 'transparent'
  },
}) 

export default Registration
