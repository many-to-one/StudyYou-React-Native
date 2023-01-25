import React from 'react'

import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native'

const Menu = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.menuContainer}>

      <TouchableOpacity
      onPress={() => navigation.navigate('Home')}>
        <Image
            style={styles.iconStytle}
            source={{
              uri: "https://img.icons8.com/stickers/90/000000/training.png",
            }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => navigation.navigate("Login")}>
        <Image
          style={styles.iconStytle}
          source={{
            uri: "https://img.icons8.com/stickers/100/000000/conference.png",
          }}
        />
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
    menuContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
    textStyle: {
      textTransform: "uppercase",
    },
    iconStytle: {
      width: "100%",
      height: 50,
      aspectRatio: 1,
    },
  });

export default Menu


