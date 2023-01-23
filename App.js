import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/navbar_pages/Home';
import Login from './src/navbar_pages/Login';
import { AuthProvider } from './src/context/AuthContext';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
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
        <Stack.Screen 
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
      </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;