import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import { Text } from 'react-native-web';

export default function SaveButton({onPress}) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon name='save' style={styles.button}/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    button: {
        fontSize: 50,
        color: '#a1efff',
        position: 'absolute',
        marginTop: 220,
        marginLeft: 130,
    }
})