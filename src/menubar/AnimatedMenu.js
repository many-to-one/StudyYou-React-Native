import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Animated,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import AllEvents from '../backend_pages/AllEvents';
import Logout from '../navbar_pages/Logout'
import Login from '../navbar_pages/Login';
import { useNavigation } from '@react-navigation/native';

const Menu = () => {

  const navigation = useNavigation();

  // const DATA = [
  //   <Login />,
  //   <Logout />,
  //   <AllEvents />,
  // ]

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Profile',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Result',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'History',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Counter',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Calendar',
    },
  ];

  const Item = ({title}) => {
    return(
      <View>
        <Text style={styles.text}>{title}</Text>
      </View>
    )
  }

  const handleSubmit = ({item}) => {
    if(item.title === 'Third Item'){
      navigation.navigate('Login')
    }
  }

  return(
    <View style={styles.container}>
      <FlatList 
        data={DATA}
        keyExtractor={(item) => item.key}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({item, index}) => {
          return(
            <TouchableOpacity onPress={() => handleSubmit({item})}>
              <View style={styles.item}>
                <Image
                  source={require('../../assets/profile.png')}
                  style={styles.img}
                />
                {/* <Text style={styles.text}>
                  {item.title}
                </Text> */}
              </View>
            </TouchableOpacity>
          )
        }}
      />

    </View>
  )
    
}

const styles = StyleSheet.create({
  container:{
    position: 'relative',
    bottom: 100,
    width: 300,
    borderWidth: 'none',
  },
  text:{
    color: 'green'
  },
  item:{
    justifyContent: 'center',
    alignItems: 'center',
    padding: 75,
    marginLeft: 50,
    width: 200,
    height: 200,
    // borderWidth: 2,
    // borderRadius: 500,
    // borderColor: 'blue',
  },
  img:{
    width:400,
    height:400,
    resizeMode: 'cover',
    borderRadius: 500,
  },
})

export default Menu