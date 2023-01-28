import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

export default function BackButton({onPress}) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon name='arrow-back' style={styles.button}/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    button: {
        fontSize: 30,
        color: '#F0007F',
        position: 'absolute',
        bottom: 50,
        marginLeft: 55,
    }
})