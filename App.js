import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthProvider } from './src/context/AuthContext';
import BottomNavigator from './src/navbar_pages/BottomNavbar';
import { LanguageProvider } from './src/context/LanguageContext';

const Tab = createBottomTabNavigator();

const App = () => {

  return (

    <LanguageProvider>
      <AuthProvider>
        <NavigationContainer>
          <BottomNavigator/>
        </NavigationContainer>
      </AuthProvider>
    </LanguageProvider>
    
  );
}


export default App;