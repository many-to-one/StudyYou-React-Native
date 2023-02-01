import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";

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
        color: '#F0007F',
        position: 'absolute',
        marginTop: 230,
        marginLeft: 130,
    }
})