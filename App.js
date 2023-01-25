import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/navbar_pages/Home';
import Login from './src/navbar_pages/Login';
import { AuthProvider } from './src/context/AuthContext';
import Icon from "react-native-vector-icons/AntDesign";
import { StyleSheet } from 'react-native';

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App() {

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

    <AuthProvider>
      <NavigationContainer>
      <Tab.Navigator
        
        screenOptions={({route}) => ({
          tabBarIcon: ({color}) => screenOptions(route, color),
        })}
        tabBarOptions={{
          activeTintColor: '#F0007F',
          inactiveTintColor: 'gray',
          backgroundColor: 'rgba(34,36,40,1)',
          style: { backgroundColor: '#ffff' }
          // tabBarStyle: {
          //   borderTopColor: '#404040',
          //   backgroundColor: 'rgba(34,36,40,1)',
          //   elevation: 0,
          // },
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
      </NavigationContainer>
    </AuthProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 25,
    backgroundColor: 'blue',
    borderRadius: 15,
  }
})

export default App;