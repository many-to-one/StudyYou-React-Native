import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Dimensions, Animated } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";

const screen = Dimensions.get('window');
const { width, height } = Dimensions.get('window');

const getRemaining = (time) => {
    const hr = Math.floor(time / 60 / 60)
    const min = Math.floor(time / 60)
    const sec = Math.floor(time - min * 60)
    return { hr:formatNumber(hr), min: formatNumber(min), sec: formatNumber(sec) };
}

const formatNumber = number => `0${number}`.slice(-2);

export default function Timer() {

    const [remainingSecs, setRemainingSecs] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const { hr, min, sec } = getRemaining(remainingSecs);

    const toggle = () => {
        setIsActive(true);
    }

    const pause = () => {
        setIsActive(false);
    }

    const reset = () => {
        setIsActive(false);
        setRemainingSecs(0);
    }

    useEffect(() => {
        let interval = null;
        if(isActive){
            interval = setInterval(() => {
                setRemainingSecs(remainingSecs => remainingSecs + 1);
            }, 1000);
        } else if (!isActive && remainingSecs !== 0){
            clearInterval(interval);
        }
        return () => clearInterval(interval)
    }, [isActive, remainingSecs]);

  return (
    <View style={styles.container}>
      <Animated.Image 
                source={require("../../assets/timer_i.png")}
                style={[
                  StyleSheet.absoluteFillObject,
                ]}
                blurRadius={5}
            />
            {/* <LinearGradient
                colors={['rgba(0, 0, 0, 0)', '#000000']}
                style={{
                height,
                width,
                position: 'absolute',
                bottom: -50,
                }}
            /> */}
      <StatusBar barStyle="light-content" />
        <Text style={styles.timerText}>{`${hr}:${min}:${sec}`}</Text>
      <View style={styles.buttons_cont}>
        <TouchableOpacity onPress={() => toggle()} style={styles.buttons}>
          <Icon name='play' size={30} color={'white'}/>
            <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pause()} style={styles.buttons}>
          <Icon name='pause' size={30} color={'white'}/>
            <Text style={styles.buttonText}>Pause</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => reset()} style={styles.buttons}>
          <Icon name='stop' size={30} color={'white'}/>
            <Text style={[styles.buttonText, styles.buttonTextReset]}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#07121B',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    buttons_cont: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center', 
    },
    buttons: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center', 
      padding: 30,
      gap: 10,
    //   marginLeft: 20, 
    },
    buttonText: {
        fontSize: 15,
        color: 'white'
    },
    timerText: {
        color: 'white',
        fontSize: 60,
        marginBottom: 20
    },
  });
