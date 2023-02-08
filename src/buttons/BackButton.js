import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/Entypo";

export default function BackButton({onPress}) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon style={styles.button} name='chevron-left'/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    button: {
        fontSize: 30,
        color: 'white',
        alignSelf: 'flex-start'
        // position: 'absolute',
        // bottom: 235,
        // marginLeft: 55,
    }
})