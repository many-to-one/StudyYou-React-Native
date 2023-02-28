import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

export default function ChangePasswordBtn({onPress, title}) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>
        {title}
      </Text>
      <Icon 
        name="key-sharp" 
        size={30} 
        color={'#78D7D9'}      
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
        height: 60,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#a1efff',
        marginBottom: 10,
        marginTop: 5,
        padding: 10,
        gap: 25,
        backgroundColor: 'transparent',
        zIndex: 999,
        shadowColor: 'white',
        shadowOpacity: 1,
        shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowRadius: 4
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
  });