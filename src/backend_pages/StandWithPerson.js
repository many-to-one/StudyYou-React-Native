import React, { useContext, useEffect, useState } from 'react'
import { Text, TextInput, View } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { AuthContext } from '../context/AuthContext';
import { styles } from '../styles/Styles';
import { LanguageContext } from '../context/LanguageContext';
import { useNavigation } from '@react-navigation/native';

const StandWithPerson = ({person, day, users}) => {
    const navigation = useNavigation();
    const {proxy, userData, stuff} = useContext(AuthContext);
    const {trans} = useContext(LanguageContext);
    const [live, setLive] = useState(true)
    const [pers, setPers] = useState('')
    const [isModalVisible, setIsModalVisible] = useState(false)

    useEffect(() => {
      setIsModalVisible(false)
    },[])

    const showModal = () => {
      setIsModalVisible(true)
    }

    const updateUser = async(id) => {
      const resp = await fetch(`${proxy}/backend/update_calendar_stand/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'user': `${pers}`,
          'person': `${pers}`,
        })
      })
      setIsModalVisible(false)
      navigation.navigate('Profile')
    }

    const deleteMinistryWith = async(user) => {
        const resp = await fetch(`${proxy}/backend/delete_calendar/${user.id}/`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          },
        })
        if(resp.status === 200){
          console.log('deleted', user)
          setLive(false)
        }
      }

    if(live === true && person.date === day && stuff === true && isModalVisible === false){  
        return  <View>
          <View style={styles.user}>
            <Icon name='business' size={20} color={'#F9F9B5'} />
            <Text style={styles.user_text_stand}>{person.place}</Text>
            <Text style={styles.user_text_stand}>{person.person}</Text>
            <Text style={styles.user_text_stand}>{person.time.slice(11, 16)}</Text>
            <Icon 
              name='create-outline'
              onPress={() => showModal()}
              style={styles.delete}
            />
            <Icon 
              name="close-circle-outline" 
              size={20} 
              color={'#F9F9B5'} 
              onPress={() => deleteMinistryWith(person)}     
            />
          </View>
      </View>
    }else if(live === true && person.date === day && stuff === false && isModalVisible === false){
        return  <View>
          <View style={styles.user}>
            <Icon name='business' size={20} color={'#F9F9B5'} />
            <Text style={styles.user_text_stand}>{person.place}</Text>
            <Text style={styles.user_text_stand}>{person.person}</Text>
            <Text style={styles.user_text_stand}>{person.time.slice(11, 16)}</Text>
          </View>
        </View> 
    }else if(live === false && isModalVisible === false){
      return  <View></View> 
  }else if(live === true && person.date === day && stuff === true && isModalVisible === true){  
    return  <View>
    {/* <TouchableOpacity onPress={() => showModal()}> */}
      <View style={styles.user}>
        <Icon name='business' size={20} color={'#F9F9B5'} />
        <TextInput style={styles.user_text_stand_edit}
          onChangeText={(e) => setPers(e)}
        />
        <Icon 
          name="checkmark-done-outline" 
          size={20} 
          color={'#F9F9B5'} 
          onPress={() => updateUser(person.id)}     
        />
      </View>
    {/* </TouchableOpacity>  */}
  </View>
}

}

export default StandWithPerson