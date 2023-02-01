import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import BackButton from '../buttons/BackButton';

const MonthsResultsItem = ({res}) => {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>{res.date}</Text>
        <ScrollView>
          
          <View style={styles.row}>
            <View style={styles.left_row}>
              <Text style={styles.text}>
                Hours:
              </Text>
            </View>
            <View style={styles.input}>
              <Text style={styles.text}>
                {res.hours}
              </Text>
            </View>
           </View>  

          <View style={styles.row}>
            <View style={styles.left_row}>
              <Text style={styles.text}>
                Minutes:
              </Text>
            </View>
            <View style={styles.input}>
              <Text style={styles.text}>
                {res.minutes}
              </Text>
            </View>
          </View>   

          <View style={styles.row}>
            <View style={styles.left_row}>
              <Text style={styles.text}>
                Publications:
              </Text>
            </View>
            <View style={styles.input}>
              <Text style={styles.text}>
                {res.publications}
              </Text>
            </View>
          </View>  

          <View style={styles.row}>
            <View style={styles.left_row}>
              <Text style={styles.text}>
                Visits:
              </Text>
            </View>
            <View style={styles.input}>
              <Text style={styles.text}>
                {res.visits}
              </Text>
            </View>
          </View>  

          <View style={styles.row}>
            <View style={styles.left_row}>
              <Text style={styles.text}>
                Films:
              </Text>
            </View>
            <View style={styles.input}>
              <Text style={styles.text}>
                {res.films}
              </Text>
            </View>
          </View>
    
          <BackButton style={styles.backbtn} onPress={() => navigation.navigate('Home')}/>
        </ScrollView>
        </View>

  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 25,
      paddingTop: 25,
    },
    row: {
      flex: 1,
      flexDirection: 'row',
    },
    text: {
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      fontSize: 20,
    },
    text_res: {
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      fontSize: 20,
      padding: 20,
    }, 
    left_row: {
      backgroundColor: '#282c34',
      width: 250,
      height:50,
      borderRadius: 10,
      margin: 5,
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingLeft: 10,
    },
    right_row: {
      backgroundColor: '#282c34',
      width: 50,
      height:50,
      borderRadius: 10,
      margin: 5,
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingLeft: 10,
    },
    input: {
      backgroundColor: '#282c34',
      width: 50,
      height:50,
      borderRadius: 10,
      margin: 5,
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: 10,
      color: 'white',
      fontSize: 25,
    },
    backbtn: {
      marginLeft: 100,
    }
});

export default MonthsResultsItem
