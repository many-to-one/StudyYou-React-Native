import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default function ChangePasswordBtn({onPress, title}) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 320,
        height: 50,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#78F5FA',
        margin: 5,
        padding: 10,
        backgroundColor: '#F9F9B5',
        // color: 'white',
        // fontSize: 20,
        zIndex: 999,
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'black',
    },
  });