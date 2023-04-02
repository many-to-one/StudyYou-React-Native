import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";

export default function SaveButton({onPress}) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon name='send' style={styles.button}/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    button: {
        fontSize: 35,
        color: '#a1efff',
        position: 'absolute',
        marginTop: 220,
        marginLeft: 130,
    }
})