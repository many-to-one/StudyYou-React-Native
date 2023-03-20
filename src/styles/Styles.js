import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 25,
    paddingTop: 25,
  },
  scroll: {
    backgroundColor: 'black',
    width: width,
    height: height,
    padding: 20,
  },
  text: {
    color: 'white',
    fontSize: 10,
  },
  event:{
    width: 270,
    margin: 2,
    padding: 1,
    color: 'white',
    fontSize: 20,
    zIndex: 999,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#19868a",
  },
  box:{
    width: 270,
    height: 50,
    margin: 2,
    padding: 1,
    color: 'white',
    fontSize: 20,
    zIndex: 999,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 20,
  },
  input:{
    color: 'white',
    fontSize: 15,

  },
  stand:{
    // width: 270,
    margin: 2,
    padding: 1,
    color: 'white',
    fontSize: 20,
    zIndex: 999,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#19868a",
  },
  user: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#19868a',
    borderRadius: 10,
    height: 50,
    borderRadius: 15,
    backgroundColor: "transparent",
    gap: 10,
    shadowColor: '#19868a',
      shadowOpacity: 1,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowRadius: 8
  },
  user_text: {
    fontSize: 15,
    color: 'white',
  },
  user_text_stand: {
    fontSize: 10,
    color: 'white',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    width: 320,
    height: 50,
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: '#78F5FA',
    margin: 5,
    padding: 10,
    backgroundColor: '#F9F9B5',
    zIndex: 999,
}, 
placeholder: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10,
},   
row: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10,
},   
});

export {styles}