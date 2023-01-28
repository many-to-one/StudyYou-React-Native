import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function AddEventButton({onPress}) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon name='plus-circle' style={styles.button}/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    button: {
        fontSize: 70,
        color: '#F0007F',
        position: 'absolute',
        bottom: 50,
        marginLeft: 55,
    }
})