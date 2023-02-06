import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Login from './Login';
import Logout from './Logout';
import Icon from "react-native-vector-icons/MaterialIcons";
import { Button, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import Registration from './Registration';
import AllEvents from '../backend_pages/AllEvents';
import AddEvent from '../backend_pages/AddEvent';
import UpdateEvent from '../backend_pages/UpdateEvent';
import NewMenu from '../menubar/NewMenu';
import Result from '../backend_pages/Result';
import MonthsResults from '../backend_pages/MonthsResults';
import Profile from '../backend_pages/Profile';
import MonthsResultsItem from '../backend_pages/MonthsResultsItem';
import HeaderBackButton from '../buttons/HeaderBackButton';
import RequestResetMail from '../backend_pages/RequestResetMail';
import BackButton from '../buttons/BackButton';

const Tab = createBottomTabNavigator();

function BottomNavigator() {

  const {userData}  = React.useContext(AuthContext);  

  const screenOptions = (route, color) => {
    let iconName;
  
    switch (route.name) {
      case 'Home':
        iconName = 'home';
        break;
      case 'Login':
        iconName = 'login';
        break;
      case 'Signup':
        iconName = 'app-registration';
        break;  
      case 'Logout':
        iconName = 'logout';
        break;
      case 'Menu':
        iconName = 'menu-open';
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
        })}
        tabBarOptions={{
          activeTintColor: 'white',
          inactiveTintColor: 'gray',
          backgroundColor: 'rgba(34,36,40,1)',
        }}
      >
        <Tab.Screen 
        name="Home"
        component={Home} 
        options={{
          title: 'Home',
          headerTitleStyle: {
            color: 'white',
            marginLeft: '8rem',
          },
          headerStyle: {
            backgroundColor: 'black',
          },
        }}
        />
        <Tab.Screen 
        name="Menu" 
        component={NewMenu} 
        options={{
          title: 'Menu',
          headerTitleStyle: {
            color: 'white',
            marginLeft: '8rem',
          },
          headerStyle: {
            backgroundColor: 'black',
            justifyContent: 'center'
          },
        }}
        />
        <Tab.Screen 
        name="Login" 
        component={Login} 
        options={{
          title: 'Login',
          headerTitleStyle: {
            color: 'white',
            marginLeft: '8rem',
          },
          headerStyle: {
            backgroundColor: 'black',
          },
          tabBarVisible: false, // hide the button
          tabBarButton: (props) => null, // hide the button
        }}
        />
        <Tab.Screen 
        name="Registration" 
        component={Registration} 
        options={{
          title: 'Registration',
          headerTitleStyle: {
            color: 'white',
            marginLeft: '8rem',
          },
          headerStyle: {
            backgroundColor: 'black',
          },
          headerLeft: () => (
            <BackButton onPress={() => navigation.navigate('Login')} />
          ),
          tabBarVisible: false, // hide the button
          tabBarButton: (props) => null, // hide the button
        }}
        />
        <Tab.Screen 
        name="Logout" 
        component={Logout} 
        options={{
          headerTitleStyle: {
            color: 'white',
            marginLeft: '8rem',
          },
          headerStyle: {
            backgroundColor: 'black',
          }
        }}
        />
        <Tab.Screen 
        name="Profile" 
        component={Profile} 
        options={{
          title: 'Profile',
          headerTitleStyle: {
            color: 'white',
            marginLeft: '8rem',
          },
          headerStyle: {
            backgroundColor: 'black',
          },
          tabBarVisible: false, // hide the button
          tabBarButton: (props) => null, // hide the button
        }}
        />
        <Tab.Screen 
        name="RequestResetMail" 
        component={RequestResetMail} 
        options={{
          title: 'RequestResetMail',
          headerTitleStyle: {
            color: 'white',
            marginLeft: '8rem',
          },
          headerStyle: {
            backgroundColor: 'black',
          },
          tabBarVisible: false, // hide the button
          tabBarButton: (props) => null, // hide the button
        }}
        />
        <Tab.Screen 
        name="AllEvents" 
        component={AllEvents} 
        options={{
          title: 'AllEvents',
          headerTitleStyle: {
            color: 'white',
            marginLeft: '8rem',
          },
          headerStyle: {
            backgroundColor: 'black',
          },
          tabBarVisible: false, // hide the button
          tabBarButton: (props) => null, // hide the button
        }}
        />
        <Tab.Screen 
        name="AddEvent" 
        component={AddEvent} 
        options={{
          title: 'AddEvent',
          headerTitleStyle: {
            color: 'white',
            marginLeft: '8rem'
          },
          headerStyle: {
            backgroundColor: 'black',
          },
          headerLeft: () => (
            <HeaderBackButton onPress={() => navigation.navigate('AllEvents')} />
          ),
          tabBarVisible: false, // hide the button
          tabBarButton: (props) => null, // hide the button
        }}
        />
        <Tab.Screen 
        name="UpdateEvent" 
        component={UpdateEvent} 
        options={{
          title: 'UpdateEvent',
          headerTitleStyle: {
            color: 'white',
            marginLeft: '8rem',
          },
          headerStyle: {
            backgroundColor: 'black',
          },
          headerLeft: () => (
            <HeaderBackButton onPress={() => navigation.navigate('AllEvents')} />
          ),
          tabBarVisible: false, // hide the button
          tabBarButton: (props) => null, // hide the button
        }}
        />
        <Tab.Screen 
        name="Result" 
        component={Result} 
        options={{
          title: 'Result',
          headerTitleStyle: {
            color: 'white',
            marginLeft: '8rem',
          },
          headerStyle: {
            backgroundColor: 'black',
          },
          headerLeft: () => (
            <HeaderBackButton onPress={() => navigation.navigate('Menu')} />
          ),
          tabBarVisible: false, // hide the button
          tabBarButton: (props) => null, // hide the button
        }}
        />
        <Tab.Screen 
        name="MonthsResults" 
        component={MonthsResults} 
        options={{
          title: 'MonthsResults',
          headerTitleStyle: {
            color: 'white',
            marginLeft: '8rem',
          },
          headerStyle: {
            backgroundColor: 'black',
          },
          headerLeft: () => (
            <HeaderBackButton onPress={() => navigation.navigate('Menu')} />
          ),
          tabBarVisible: false, // hide the button
          tabBarButton: (props) => null, // hide the button
        }}
        />
        <Tab.Screen 
        name="MonthsResultsItem" 
        component={MonthsResultsItem} 
        options={{
          title: 'MonthsResultsItem',
          headerTitleStyle: {
            color: 'white',
          },
          headerStyle: {
            backgroundColor: 'black',
          },
          tabBarVisible: false, // hide the button
          tabBarButton: (props) => null, // hide the button
        }}
        />
      </Tab.Navigator>
  );
}


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignContent: 'center',
    bottom: 25,
    elevation: 10,
    backgroundColor: '#4d4d4d',
    borderRadius: 15,
  }
})

export default BottomNavigator;