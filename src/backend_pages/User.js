import React, { useContext, useEffect, useState } from 'react'
import { Text, View, CheckBox, ScrollView, SafeAreaView, TouchableOpacity, Animated} from 'react-native';
import { LanguageContext } from '../context/LanguageContext';
import { styles } from '../styles/Styles';
import { AuthContext } from '../context/AuthContext';
import { useIsFocused } from '@react-navigation/native';

const User = ({route, navigation}) => {
    const {user} = route.params;
    const {proxy} = useContext(AuthContext)
    const {trans} = useContext(LanguageContext)
    const [results, setResults] = useState([]);
    const [admin, setAdmin] = useState(null);
    const [leader, setLeader] = useState(null);
    const [helper, setHelper] = useState(null);
    const [ministryEvent, setMinistryEvent] = useState(null);
    const [service, setService] = useState(null);
    const [editor, setEditor] = useState(null);
    const isFocused = useIsFocused();

    useEffect(() => {
      console.log(user)
      setAdmin(user.admin)
      setLeader(user.leader)
      setHelper(user.helper)
      setMinistryEvent(user.ministry_event)
      setService(user.service)
      setEditor(user.editor)
      getMonthsResults()
    },[isFocused])

    const getMonthsResults = async() => {
      const resp = await fetch(`${proxy}/backend/get_months_results/${user.id}/`)
      const data = await resp.json()
      setResults(data.data)
      console.log('getMonthsResults', data.data)
  };

    const editAdmin = async() => {

      if(admin === false){
        const body = {'admin': true}
        const resp = await fetch(`${proxy}/users/user/${user.id}/`, {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(body),
        });

      }else{
        const body = {'admin': false}
        const resp = await fetch(`${proxy}/users/user/${user.id}/`, {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(body),
        });
      }   
    }

    const editLeader = async() => {

      if(leader === false){
        const body = {'leader': true}
        const resp = await fetch(`${proxy}/users/user/${user.id}/`, {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(body),
        });

      }else{
        const body = {'leader': false}
        const resp = await fetch(`${proxy}/users/user/${user.id}/`, {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(body),
        });
      }   
    }

    const editHelper = async() => {

      if(helper === false){
        const body = {'helper': true}
        const resp = await fetch(`${proxy}/users/user/${user.id}/`, {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(body),
        });

      }else{
        const body = {'helper': false}
        const resp = await fetch(`${proxy}/users/user/${user.id}/`, {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(body),
        });
      }   
    }

    const editMinistryEvent = async() => {

      if(ministryEvent === false){
        const body = {'ministry_event': true}
        const resp = await fetch(`${proxy}/users/user/${user.id}/`, {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(body),
        });

      }else{
        const body = {'ministry_event': false}
        const resp = await fetch(`${proxy}/users/user/${user.id}/`, {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(body),
        });
      }   
    }

    const editService = async() => {

      if(service === false){
        const body = {'service': true}
        const resp = await fetch(`${proxy}/users/user/${user.id}/`, {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(body),
        });

      }else{
        const body = {'service': false}
        const resp = await fetch(`${proxy}/users/user/${user.id}/`, {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(body),
        });
      }   
    }

    const editEditor = async() => {

      if(editor === false){
        const body = {'editor': true}
        const resp = await fetch(`${proxy}/users/user/${user.id}/`, {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(body),
        });

      }else{
        const body = {'editor': false}
        const resp = await fetch(`${proxy}/users/user/${user.id}/`, {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(body),
        });
      }   
    }
    

  return (
        <SafeAreaView style={styles.container}>

            <ScrollView>

                <View style={styles._user}>
                    <Text style={styles.user_text}>{user.username}</Text>
                </View>

                <View style={styles._user}>
                    <Text style={styles.user_text}>{user.congregation}</Text>
                </View>

                <View style={styles._user}>
                    <Text style={styles.user_text}>{user.groupe}</Text>
                </View>

                <View style={styles._user}>
                    <Text style={styles.user_text}>{user.email}</Text>
                </View>

                <View style={styles._user}>
                    <Text style={styles.user_text}>{user.created_at.slice(0, 10)}</Text>
                </View>

                <View style={styles._user}>
                    <Text style={styles.user_text}>{user.last_login.slice(0, 10)}</Text>
                    <Text style={styles.user_text}>{user.last_login.slice(11, 19)}</Text>
                </View>

                <TouchableOpacity onPress={() => editAdmin()}>
                  <View style={styles._user}>
                      <CheckBox
                        value={admin}
                        onValueChange={setAdmin}
                        style={styles.checkbox}
                      />
                      <Text style={styles.user_text}>Admin</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => editLeader()}>
                  <View style={styles._user}>
                      <CheckBox
                        value={leader}
                        onValueChange={setLeader}
                        style={styles.checkbox}
                      />
                      <Text style={styles.user_text}>Leader</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => editHelper()}>
                  <View style={styles._user}>
                      <CheckBox
                        value={helper}
                        onValueChange={setHelper}
                        style={styles.checkbox}
                      />
                      <Text style={styles.user_text}>Helper</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => editMinistryEvent()}>
                  <View style={styles._user}>
                      <CheckBox
                        value={ministryEvent}
                        onValueChange={setMinistryEvent}
                        style={styles.checkbox}
                      />
                      <Text style={styles.user_text}>Ministry Event</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => editService()}>
                  <View style={styles._user}>
                      <CheckBox
                        value={service}
                        onValueChange={setService}
                        style={styles.checkbox}
                      />
                      <Text style={styles.user_text}>Service</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => editEditor()}>
                  <View style={styles._user}>
                      <CheckBox
                        value={editor}
                        onValueChange={setEditor}
                        style={styles.checkbox}
                      />
                      <Text style={styles.user_text}>Editor</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('ShowResultsForLeader', {results: results})}>
                  <View style={styles._user}>
                      <Text style={styles.user_text}>getMonthsResults</Text>
                  </View>
                </TouchableOpacity>

            </ScrollView>

        </SafeAreaView>
  )
}

export default User
