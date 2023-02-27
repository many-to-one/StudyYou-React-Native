import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

export default function AddEventButton({onPress}) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon name='md-add-circle-outline' style={styles.button}/>
    </TouchableOpacity>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    button: {
      fontSize: 70,
      color: '#F9F9B5', 
      position: 'absolute',
      bottom: 25,
      marginLeft: width / 7,
    }
})