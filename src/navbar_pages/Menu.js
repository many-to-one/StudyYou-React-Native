// import React from 'react'

// import { useNavigation } from "@react-navigation/native";
// import { StyleSheet, TouchableOpacity, View, Image } from 'react-native'
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Login from './Login';

// const Menu = () => {
//   const navigation = useNavigation();
//   const [profileToken, setProfileToken] = useState('')

//   useEffect(() => {
//     profile()
//   }, [])



//   // ##### GET TOKEN FROM LOGGED USER BY ID FROM STORAGE ##### //

//   const profile = async() => {
//     let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
//     if(datas === null){
//       navigation.navigate('Login')
//     }else{
//       const resp = await fetch(`${proxy}/users/user/${datas.id}/`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
//       const data = await resp.json()
//       if(data){
//         setProfileToken(data.token)
//         await setLanguage()
//       }
//     }
//   }

//   if(profileToken){

//     return (
//       <View style={styles.menuContainer}>
  
//         <TouchableOpacity
//         onPress={() => navigation.navigate('Home')}>
//           <Image
//               style={styles.iconStytle}
//               source={{
//                 uri: "https://img.icons8.com/stickers/90/000000/training.png",
//               }}
//           />
//         </TouchableOpacity>
  
//         <TouchableOpacity
//           style={styles.buttonStyle}
//           onPress={() => navigation.navigate("Login")}>
//           <Image
//             style={styles.iconStytle}
//             source={{
//               uri: "https://img.icons8.com/stickers/100/000000/conference.png",
//             }}
//           />
//         </TouchableOpacity>
  
//       </View>
//     )

//   } else {

//     return(
//       <Login />
//     )

//   }

// }

// const styles = StyleSheet.create({
//     menuContainer: {
//       flexDirection: "row",
//       justifyContent: "space-evenly",
//     },
//     textStyle: {
//       textTransform: "uppercase",
//     },
//     iconStytle: {
//       width: "100%",
//       height: 50,
//       aspectRatio: 1,
//     },
//   });

// export default Menu


