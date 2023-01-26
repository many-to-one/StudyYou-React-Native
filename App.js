import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthProvider } from './src/context/AuthContext';
import BottomNavigator from './src/navbar_pages/BottomNavbar';

const Tab = createBottomTabNavigator();

function App() {

  return (

    <AuthProvider>
      <NavigationContainer>
        <BottomNavigator/>
      </NavigationContainer>
    </AuthProvider>
  );
}


export default App;