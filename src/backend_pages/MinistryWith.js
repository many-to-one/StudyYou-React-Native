// import React, { useContext, useEffect, useState } from 'react'
// import { Button, StyleSheet, Text, View } from 'react-native'
// import { AuthContext } from '../context/AuthContext';
// import { MultipleSelectList  } from 'react-native-dropdown-select-list';
// import Icon from "react-native-vector-icons/Ionicons";
// import { useIsFocused } from '@react-navigation/native';
// import ScheduleBtn from '../buttons/ScheduleBtn';
// import { LanguageContext } from '../context/LanguageContext';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const MinistryWith = ({day, navigation}) => {

//     const {proxy, congr} = useContext(AuthContext);
//     const {ministryWith_} = useContext(LanguageContext);
//     const [selected, setSelected] = useState('')
//     const [choose, setChoose] = useState(true)
//     const [users, setUsers] = useState([])
//     const [dateMinistryWith, setDateMinistryWith] = useState([])
//     const USERS = {}
//     const isFocused = useIsFocused();

//     useEffect(() => {
//       getUsers()
//   }, [isFocused])

//   const getUsers = async() => {
//     let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
//     const resp = await fetch(`${proxy}/users/users/${datas.congregation}/`)
//       const data = await resp.json();
//       if(resp.status === 200){
//         setUsers(data)
//         getCalendarDatesByDate()
//       }
//   }

//   const getCalendarDatesByDate = async() => {
//     let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
//     const body = {'date': day, 'action': 'MinistryWith', 'congregation': datas.congregation} //'person': selected
//     const resp = await fetch(`${proxy}/backend/get_calendar_date/`, {
//       method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body:JSON.stringify(body),
//         });
//         const data = await resp.json();
//         if(data){
//           setDateMinistryWith(data)
//           setSelected([])
//           console.log('data+',data)
//         }  
//   }

//   for(let i=0; i<users.length; i++){
//     USERS[users[i].id] = users[i].username
//   }

//   const data = []

//   for (const [key, value] of Object.entries(USERS)) {
//     data.push(
//       {key:key, value:value},
//     )
//   }

//   const setMinistryWith = async(selected) => {
//     let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
//     await selected.map((e) => {
//       const resp = fetch(`${proxy}/backend/set_calendar_person/${datas.id}/`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             'date': `${day}`,
//             'action': 'MinistryWith',
//             'person': `${e}`,
//             'congregation': datas.congregation,
//           })
//         })
//       })
//         const body = {'date': day, 'action': 'MinistryWith', 'congregation': datas.congregation} //'person': selected
//         const resp = await fetch(`${proxy}/backend/get_calendar_date/`, {
//           method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json'
//               },
//               body:JSON.stringify(body),
//             });
//             const data = await resp.json();
//             if(data){
//               setDateMinistryWith(data)
//               console.log('data+',data)
//             }  
//         getCalendarDatesByDate()
//   }

//   const deleteMinistryWith = async(user) => {
//     const resp = await fetch(`${proxy}/backend/delete_calendar/${user.id}/`, {
//       method: 'DELETE',
//       headers: {
//           'Content-Type': 'application/json'
//       },
//     })
//     if(resp.status === 200){
//       console.log('deleted', user)
//       setSelected([])
//       setDateMinistryWith([])
//       getCalendarDatesByDate()
//     }
//   }

// console.log('dateMinistryWith:', dateMinistryWith, day)

// if(dateMinistryWith.length > 5){
//   return ( 
//     dateMinistryWith.map((e) => {
//         if(e.date === day && e.action === 'MinistryWith'){  
//             return  <View style={styles.user}>
//             <Icon name='briefcase-sharp' size={20} color={'#F9F9B5'} />
//             <Text style={styles.user_text}>{e.person}</Text>
//                 <Icon 
//                     name="close-circle-outline" 
//                     size={20} 
//                     color={'#F9F9B5'} 
//                     onPress={() => deleteMinistryWith(e)}     
//                     />
//             </View>  

//         }
//     }) 

//   )
//     }else if(dateMinistryWith.length === 0){
//         return (
//             <View >
//               <MultipleSelectList 
//                 setSelected={(val) => setSelected(val)} 
//                 data={data} 
//                 save="value" 
//                 placeholder={
//                   <View style={styles.placeholder}>
//                     <Icon name='briefcase-sharp' size={20} color={'white'} />
//                     <Text style={styles.text}>{ministryWith_}</Text>
//                   </View>
//                 }
//                 boxStyles={styles.event}
//                 inputStyles={styles.input}
//                 dropdownStyles={styles.box}
//                 dropdownItemStyles={{color: 'white'}}
//                 dropdownTextStyles={{color: 'white'}}
//                 arrowicon={<Icon name="chevron-down" size={20} color={'white'} />} 
//                 searchicon={<Icon name="search" size={20} color={'white'} />} 
//                 closeicon={<Icon name="close" size={20} color={'white'} />} 
//                 search={true}
//               />
//               <ScheduleBtn 
//                   style={{backgroundColor: '#F9F9B5',}}
//                   title={'Submit'}
//                   onPress={() => setMinistryWith(selected)}
//               />
//             </View>
//         )
//     }else if(dateMinistryWith.length >= 1 && dateMinistryWith.length <= 5){
//         return ( 
//             dateMinistryWith.map((e) => {
//               if(e.date === day && e.action === 'MinistryWith'){  
//                   return  <View>
//                     <View style={styles.user}>
//                     <Icon name='briefcase-sharp' size={20} color={'#F9F9B5'} />
//                       <Text style={styles.user_text}>{e.person}</Text>
//                           <Icon 
//                               name="close-circle-outline" 
//                               size={20} 
//                               color={'#F9F9B5'} 
//                               onPress={() => deleteMinistryWith(e)}     
//                               />
//                     </View>
//                     <MultipleSelectList 
//                     setSelected={(val) => setSelected(val)} 
//                     data={data} 
//                     save="value"
//                     placeholder={
//                       <View style={styles.placeholder}>
//                         <Icon name='briefcase-sharp' size={20} color={'white'} />
//                         <Text style={styles.text}>{ministryWith_}</Text>
//                       </View>
//                     }
//                     boxStyles={styles.event}
//                     inputStyles={styles.input}
//                     dropdownStyles={styles.box}
//                     dropdownItemStyles={{color: 'white'}}
//                     dropdownTextStyles={{color: 'white'}}
//                     arrowicon={<Icon name="chevron-down" size={20} color={'white'} />} 
//                     searchicon={<Icon name="search" size={20} color={'white'} />} 
//                     closeicon={<Icon name="close" size={20} color={'white'} />} 
//                     search={true}
//                     />
//                     <ScheduleBtn 
//                         style={{backgroundColor: '#F9F9B5',}}
//                         title={'Submit'}
//                         onPress={() => setMinistryWith(selected)}
//                     />
//                   </View>
                  
                                      
//               }
//           }) 
  
//           )
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//     flexDirection: 'column',
//     alignItems: 'center',
//     gap: 25,
//     paddingTop: 25,
//   },
//   text: {
//     color: 'white',
//     fontSize: 10,
//   },
//   event:{
//     width: 290,
//     margin: 2,
//     padding: 10,
//     color: 'white',
//     fontSize: 20,
//     zIndex: 999,
//     backgroundColor: "transparent"
//   },
//   input:{
//     width: 200,
//     height: 50,
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: '#333333',
//     margin: 5,
//     padding: 10,
//     color: 'white',
//     fontSize: 20,
//     zIndex: 999,
//   },
//   box:{
//     width: 290,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: '#4f4f4f',
//     margin: 2,
//     padding: 10,
//     color: 'white',
//     fontSize: 20,
//     zIndex: 999,
//     backgroundColor: "#a6a6a6"
//   },
//   user: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     marginBottom: 10,
//     height: 50,
//     borderRadius: 15,
//     backgroundColor: "#333333",
//     gap: 10,
//   },
//   user_text: {
//     fontSize: 15,
//     color: 'white',
//   },
//   button: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 10,
//     width: 320,
//     height: 50,
//     borderRadius: 10,
//     borderWidth: 2,
//     backgroundColor: '#78F5FA',
//     margin: 5,
//     padding: 10,
//     backgroundColor: '#F9F9B5',
//     zIndex: 999,
// },  
// placeholder: {
//   flexDirection: 'row',
//   alignItems: 'center',
//   gap: 10,
// },     
// })

// export default MinistryWith
