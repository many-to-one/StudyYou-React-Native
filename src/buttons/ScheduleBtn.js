import React, { useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { LanguageContext } from '../context/LanguageContext';

export default function ScheduleBtn({onPress}) {
  const {trans} = useContext(LanguageContext);

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{trans.Submit}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 290,
        height: 40,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#78F5FA',
        margin: 5,
        padding: 10,
        backgroundColor: '#78F5FA',
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