import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Login from './Login';
import Logout from './Logout';
import Icon from "react-native-vector-icons/MaterialIcons";
import { StyleSheet } from 'react-native';
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
import Timer from '../backend_pages/Timer';
import CreateCalendarEvent from '../backend_pages/CreateCalendarEvent';
import Microphones from '../backend_pages/Microphones';
import Music from '../backend_pages/Music';
import Duty from '../backend_pages/Duty';
import Timetable from '../backend_pages/Timetable';
import Service from '../backend_pages/Service';
import Ministries from '../backend_pages/Ministries';
import MiddleOfTheWeek from '../backend_pages/MiddleOfTheWeek';
import WeekendMeetings from '../backend_pages/WeekendMeetings';
import { LanguageContext } from '../context/LanguageContext';

const Tab = createBottomTabNavigator();

function BottomNavigator() {

  const {
    Menu_,
    Profile_,
    Timer_,
    Result_,
    History_,
    Events_,
    AddEvent_,
    UpdateEvent_,
    AllEvents_,
    Logout_,
  }  = React.useContext(LanguageContext);  

  const screenOptions = (route, color) => {
    let iconName;
  
    switch (route.name) {
      case 'Home':
        iconName = 'event-note';
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
            backgroundColor:'black',
            borderTopColor: '#404040',
            // backgroundColor: '#4d4d4d',
            // elevation: 0,
            // display: 'flex',
            // elevation: 0,
            // ...styles.container,
          },
        })}
        tabBarOptions={{
          activeTintColor: 'white',
          inactiveTintColor: 'gray',
          backgroundColor: 'rgba(34,36,40,1)',
        }}
      >
        <Tab.Screen 
        name='Menu'
        component={NewMenu} 
        options={{
          title: `${Menu_}`,
          headerTitleStyle: {
            color: 'white',
            marginLeft: '6rem',
          },
          headerStyle: {
            backgroundColor: 'black',
          },
        }}
        />
        <Tab.Screen 
        name="Home"
        component={Home} 
        options={({ navigation }) => ({
          title: `${Events_}`,
          headerTitleStyle: {
            color: 'white',
            marginLeft: '6rem',
          },
          headerStyle: {
            backgroundColor: 'black',
          },
          headerLeft: () => (
            <BackButton onPress={() => navigation.navigate('Menu')} />
          ),
        })}
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
        options={({ navigation }) => ({
          title: 'Registration',
          headerTitleStyle: {
            color: 'white',
            marginLeft: '6rem',
          },
          headerStyle: {
            backgroundColor: 'black',
          },
          tabBarVisible: false, // hide the button
          tabBarButton: (props) => null, // hide the button
          headerLeft: () => (
            <BackButton onPress={() => navigation.navigate('Login')} />
          ),
        })}
        />
        <Tab.Screen 
        name='Logout'
        component={Logout} 
        options={{
          title: `${Logout_}`,
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
        name='Profile'
        component={Profile} 
        options={({ navigation }) => ({
          title: `${Profile_}`,
          headerTitleStyle: {
            color: 'white',
            marginLeft: '6rem',
          },
          headerStyle: {
            backgroundColor: 'black',
          },
          tabBarVisible: false, // hide the button
          tabBarButton: (props) => null, // hide the button
          headerLeft: () => (
            <BackButton onPress={() => navigation.navigate('Menu')} />
          ),
        })}
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
        name="Timer" 
        component={Timer} 
        options={({ navigation }) => ({
          title: `${Timer_}`,
          headerTitleStyle: {
            color: 'white',
            marginLeft: '6rem',
          },
          headerStyle: {
            backgroundColor: 'black',
          },
          tabBarVisible: false, // hide the button
          tabBarButton: (props) => null, // hide the button
          headerLeft: () => (
            <BackButton onPress={() => navigation.navigate('Menu')} />
          ),
        })}
        />
        <Tab.Screen 
        name="AllEvents" 
        component={AllEvents} 
        options={({ navigation }) => ({
          title: `${AllEvents_}`,
          headerTitleStyle: {
            color: 'white',
            marginLeft: '8rem',
          },
          headerStyle: {
            backgroundColor: 'black',
          },
          tabBarVisible: false, // hide the button
          tabBarButton: (props) => null, // hide the button
          headerLeft: () => (
            <BackButton onPress={() => navigation.navigate('Menu')} />
          ),
        })}
        />
        <Tab.Screen 
        name="AddEvent" 
        component={AddEvent} 
        options={({ navigation }) => ({
          title: `${AddEvent_}`,
          headerTitleStyle: {
            color: 'white',
            marginLeft: '6rem',
          },
          headerStyle: {
            backgroundColor: 'black',
          },
          tabBarVisible: false, // hide the button
          tabBarButton: (props) => null, // hide the button
          headerLeft: () => (
            <BackButton onPress={() => navigation.navigate('Home')} />
          ),
        })}
        />
        <Tab.Screen 
        name="UpdateEvent" 
        component={UpdateEvent} 
        options={({ navigation }) => ({
          title: `${UpdateEvent_}`,
          headerTitleStyle: {
            color: 'white',
            marginLeft: '6rem',
          },
          headerStyle: {
            backgroundColor: 'black',
          },
          tabBarVisible: false, // hide the button
          tabBarButton: (props) => null, // hide the button
          headerLeft: () => (
            <BackButton onPress={() => navigation.navigate('Home')} />
          ),
        })}
        />
        <Tab.Screen 
        name="Result" 
        component={Result} 
        options={({ navigation }) => ({
          title: `${Result_}`,
          headerTitleStyle: {
            color: 'white',
            marginLeft: '6rem',
          },
          headerStyle: {
            backgroundColor: 'black',
          },
          tabBarVisible: false, // hide the button
          tabBarButton: (props) => null, // hide the button
          headerLeft: () => (
            <BackButton onPress={() => navigation.navigate('Menu')} />
          ),
        })}
        />
        <Tab.Screen 
        name="MonthsResults" 
        component={MonthsResults} 
        options={({ navigation }) => ({
          title: `${History_}`,
          headerTitleStyle: {
            color: 'white',
            marginLeft: '6rem',
          },
          headerStyle: {
            backgroundColor: 'black',
          },
          tabBarVisible: false, // hide the button
          tabBarButton: (props) => null, // hide the button
          headerLeft: () => (
            <BackButton onPress={() => navigation.navigate('Menu')} />
          ),
        })}
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
        <Tab.Screen 
        name="CreateCalendarEvent" 
        component={CreateCalendarEvent} 
        options={({ navigation }) => ({
          title: 'CreateCalendarEvent',
          headerTitleStyle: {
            color: 'white',
            marginLeft: '6rem',
          },
          headerStyle: {
            backgroundColor: 'black',
          },
          tabBarVisible: false, // hide the button
          tabBarButton: (props) => null, // hide the button
          headerLeft: () => (
            <BackButton onPress={() => navigation.navigate('Profile')} />
          ),
        })}
        />
        <Tab.Screen 
        name="Service" 
        component={Service} 
        options={({ navigation }) => ({
          title: 'Service',
          headerTitleStyle: {
            color: 'white',
            marginLeft: '6rem',
          },
          headerStyle: {
            backgroundColor: 'black',
          },
          tabBarVisible: false, // hide the button
          tabBarButton: (props) => null, // hide the button
          headerLeft: () => (
            <BackButton onPress={() => navigation.navigate('Profile')} />
          ),
        })}
        />
        <Tab.Screen 
        name="Ministries" 
        component={Ministries} 
        options={({ navigation }) => ({
          title: 'Ministries',
          headerTtleStyle: {
            color: 'white',
            marginLeft: '6rem',
          },
          headerStyle: {
            backgroundColor: 'black',
          },
          tabBarVisible: false, // hide the button
          tabBarButton: (props) => null, // hide the button
          headerLeft: () => (
            <BackButton onPress={() => navigation.navigate('Profile')} />
          ),
        })}
        />
        <Tab.Screen 
        name="MiddleOfTheWeek" 
        component={MiddleOfTheWeek} 
        options={({ navigation }) => ({
          title: 'MiddleOfTheWeek',
          headerTtleStyle: {
            color: 'white',
            marginLeft: '6rem',
          },
          headerStyle: {
            backgroundColor: 'black',
          },
          tabBarVisible: false, // hide the button
          tabBarButton: (props) => null, // hide the button
          headerLeft: () => (
            <BackButton onPress={() => navigation.navigate('Profile')} />
          ),
        })}
        />
        <Tab.Screen 
        name="Microphones" 
        component={Microphones} 
        options={{
          title: 'Microphones',
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
        <Tab.Screen 
        name="Music" 
        component={Music} 
        options={{
          title: 'Music',
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
        <Tab.Screen 
        name="Duty" 
        component={Duty} 
        options={{
          title: 'Duty',
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
        <Tab.Screen 
        name="WeekendMeetings" 
        component={WeekendMeetings} 
        options={({ navigation }) => ({
          title: 'WeekendMeetings',
          headerTtleStyle: {
            color: 'white',
            marginLeft: '6rem',
          },
          headerStyle: {
            backgroundColor: 'black',
          },
          tabBarVisible: false, // hide the button
          tabBarButton: (props) => null, // hide the button
          headerLeft: () => (
            <BackButton onPress={() => navigation.navigate('Profile')} />
          ),
        })}
        />
        <Tab.Screen 
        name="Timetable" 
        component={Timetable} 
        options={{
          title: 'Timetable',
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