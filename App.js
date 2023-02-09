import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthProvider } from './src/context/AuthContext';
import BottomNavigator from './src/navbar_pages/BottomNavbar';
import { SafeAreaView } from 'react-native';

const Tab = createBottomTabNavigator();

const App = () => {

  return (

      <AuthProvider>
        {/* <SafeAreaView> */}
          <NavigationContainer>
            <BottomNavigator/>
          </NavigationContainer>
        {/* </SafeAreaView> */}
      </AuthProvider>
    
  );
}


export default App;