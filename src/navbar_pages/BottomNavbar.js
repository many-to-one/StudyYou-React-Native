import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Login from './Login';
import Icon from "react-native-vector-icons/AntDesign";
import { StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

function BottomNavigator() {

  const screenOptions = (route, color) => {
    let iconName;
  
    switch (route.name) {
      case 'Home':
        iconName = 'home';
        break;
      case 'Browse':
        iconName = 'appstore-o';
        break;
      case 'Library':
        iconName = 'folder1';
        break;
      default:
        break;
    }
  
    return <Icon name={iconName} color={color} size={24} />;
  };

  return (

      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color}) => screenOptions(route, color),
          tabBarStyle: {
            borderTopColor: '#404040',
            backgroundColor: '#4d4d4d',
            elevation: 0,
            display: 'flex',
            elevation: 0,
            ...styles.container,
          },
          // tabBarOptions: {
          //   'tabBarActiveTintColor': '#F0007F',
          //   'tabBarInactiveTintColor': 'gray',
          // },
          // tabBarStyle: [
          //     {
          //       "display": "flex"
          //     },
          //     null
          // ]

        })}
        tabBarOptions={{
          activeTintColor: 'white',
          inactiveTintColor: 'gray',
          backgroundColor: 'rgba(34,36,40,1)',
        }}
      >
        <Tab.Screen 
        name="Login" 
        component={Login} 
        options={{
          title: 'Login Form',
          headerTitleStyle: {
            color: 'white',
          },
          headerStyle: {
            backgroundColor: 'black',
          }
        }}
        />
        <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{
          title: 'Hi, user',
          headerTitleStyle: {
            color: 'white',
          },
          headerStyle: {
            backgroundColor: 'black',
          }
        }}
        />
      </Tab.Navigator>
  );
}


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 350,
    bottom: 25,
    marginLeft: 12,
    backgroundColor: '#4d4d4d',
    borderRadius: 15,
  }
})

export default BottomNavigator;