import React, { useContext, useState } from 'react'
import { Text, View, CheckBox, ScrollView, SafeAreaView} from 'react-native';
import TalkBtn from '../buttons/TalkBtn';
import { LanguageContext } from '../context/LanguageContext';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from '../styles/Styles';

const User = ({route, navigation}) => {
    const {user} = route.params;
    const {proxy, userData} = useContext(LanguageContext)
    const {trans} = useContext(LanguageContext)
    const [selected, setSelected] = useState(false);
    const [edit, setEdit] = useState(false);

    const editAdmin = async(selected) => {
        console.log('sel', selected)
        const body = {'admin': selected}
        const resp = await fetch(`${proxy}/users/users/${userData.id}`, {
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

                <View style={styles.user}>
                    <CheckBox
                      value={selected}
                      onValueChange={setSelected}
                      style={styles.checkbox}
                    />
                    <Text style={styles.user_text}>Admin</Text>
                    <View style={styles.row}>
                        <TalkBtn onPress={() => editAdmin(selected)}/>
                        <Icon 
                          name='delete-forever' 
                          onPress={() => deleteEvent()} 
                          style={styles.delete}  
                        />
                    </View>
                </View>

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
