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
    // backgroundColor: '#283747', 
    backgroundColor: 'black',
    width: width,
    height: height,
    padding: 20,
  },
  cont: {
    width: width,
    height: height,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
    paddingTop: 25,
    padding: 20,
  
  },
  cub:{
    justifyContent: 'center',
    alignItems: 'center',
    width: 140,
    height: 140,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#19868a',
    margin: 5,
    backgroundColor: '#18909C80',
    shadowColor: '#19868a',
      shadowOpacity: 1,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowRadius: 8
  },
  text: {
    color: 'white',
    fontSize: 10,
  },
  text_: {
    color: 'white',
    fontSize: 20,
  },
  topic:{
    width: width / 1.4,
    marginBottom: 5,
    marginTop: 5,
    padding: 5,
    color: 'white',
    fontSize: 15,
    backgroundColor: "transparent",
    borderBottomWidth: 2,
    borderColor: "#19868a",
  },
  event:{
    width: width / 1.4,
    marginBottom: 5,
    marginTop: 5,
    padding: 1,
    color: 'white',
    fontSize: 20,
    backgroundColor: '#18909C80',
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#19868a",
  },
    event_:{
    width: 320,
    margin: 5,
    padding: 10,
    color: 'white',
    fontSize: 20,
    zIndex: 999,
    backgroundColor: "transparent",
    },
  box:{
    flex: 1,
    flexDirection: 'column',
    width: width / 1.25,
    height: 50,
    padding: 10,
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
    width: width / 1.25,
  },
  dropdown: {
    width: width / 1.4,
    borderColor: "#19868a",
    borderWidth: 2,
    backgroundColor: "#18909C80",
  },
  stand:{
    width: width / 1.25,
    marginBottom: 5,
    marginTop: 5,
    padding: 1,
    color: 'white',
    fontSize: 20,
    zIndex: 999,
    backgroundColor: '#18909C80',
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#19868a",
  },
  user: {
    width: width / 1.25,
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
    backgroundColor: '#18909C80',
    gap: 10,
    shadowColor: '#19868a',
      shadowOpacity: 1,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowRadius: 8
  },
  _user: {
    width: width / 1.25,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#19868a',
    borderRadius: 10,
    height: 50,
    borderRadius: 15,
    backgroundColor: "#18909C80",
    gap: 20,
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
animated: {
  borderRadius: 25,
  shadowColor: 'white',
  shadowOpacity: 1,
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowRadius: 4
},  
checkbox: {
  alignSelf: 'center',
  borderWidth: 2,
  borderColor: '#19868a',
},
delete: {
  color: '#F9F9B5',
  fontSize: 30,
},
});

export {styles}