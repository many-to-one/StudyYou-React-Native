import React, { useContext, useState } from 'react'
import { Text, View, CheckBox, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native';
import TalkBtn from '../buttons/TalkBtn';
import { LanguageContext } from '../context/LanguageContext';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from '../styles/Styles';
import { AuthContext } from '../context/AuthContext';

const User = ({route, navigation}) => {
    const {user} = route.params;
    const {proxy, userData} = useContext(AuthContext)
    const {trans} = useContext(LanguageContext)
    const [selected, setSelected] = useState(false);
    const [edit, setEdit] = useState(false);

    const editAdmin = async() => {
        console.log('sel', selected, userData)
        const body = {'admin': selected}
        // let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
        const resp = await fetch(`${proxy}/users/user/${userData.id}/`, {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(body),
        });
        const data = await resp.json();
        if(data){
          console.log('editAdmin', data)
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
                    <Text style={styles.user_text}>{user.created_at}</Text>
                </View>

                <View style={styles._user}>
                    <Text style={styles.user_text}>{user.last_login}</Text>
                </View>

                <TouchableOpacity onPress={() => editAdmin()}>
                  <View style={styles._user}>
                      <CheckBox
                        value={selected}
                        onValueChange={setSelected}
                        style={styles.checkbox}
                      />
                      <Text style={styles.user_text}>Admin</Text>
                  </View>
                </TouchableOpacity>

                <View style={styles._user}>
                    <CheckBox
                    //   value={selected}
                    //   onValueChange={setSelected}
                      style={styles.checkbox}
                    />
                    <Text style={styles.user_text}>Leader</Text>
                </View>

                <View style={styles._user}>
                    <CheckBox
                    //   value={selected}
                    //   onValueChange={setSelected}
                      style={styles.checkbox}
                    />
                    <Text style={styles.user_text}>Helper</Text>
                </View>

                <View style={styles._user}>
                    <CheckBox
                    //   value={selected}
                    //   onValueChange={setSelected}
                      style={styles.checkbox}
                    />
                    <Text style={styles.user_text}>Ministry Event</Text>
                </View>

                <View style={styles._user}>
                    <CheckBox
                    //   value={selected}
                    //   onValueChange={setSelected}
                      style={styles.checkbox}
                    />
                    <Text style={styles.user_text}>Service</Text>
                </View>

                <View style={styles._user}>
                    <CheckBox
                    //   value={selected}
                    //   onValueChange={setSelected}
                      style={styles.checkbox}
                    />
                    <Text style={styles.user_text}>Verified</Text>
                </View>

            </ScrollView>

        </SafeAreaView>
  )
}

export default User
