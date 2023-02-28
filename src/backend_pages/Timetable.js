import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react'
import { Animated, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AuthContext } from '../context/AuthContext';
import Icon from "react-native-vector-icons/Ionicons";
import BackButton from '../buttons/BackButton';

const Timetable = ({navigation}) => {
    const {proxy} = useContext(AuthContext);
    const isFocused = useIsFocused();
    const [data, setData] = useState([])

    useEffect(() => {
        getCalendarDatesByUser()
    }, [isFocused])

    const getCalendarDatesByUser = async() => {
        let datas = JSON.parse(await AsyncStorage.getItem("asyncUserData"))
        const resp = await fetch(`${proxy}/backend/get_calendar_user/${datas.id}/`)
        const data = await resp.json()
        if(data){
            setData(data)
            console.log('data',data)
        }
    }

  return (
    data.map((e) => {
        if(e.action === 'Microphones'){
            return  <TouchableOpacity>
            <Animated.View style={styles.animated}>
              <ImageBackground
                source={require('../../assets/card.png')}
                style={styles.img}
              >
                <View style={styles.event}>
                  <Icon name="mic" size={20} color={'#F9F9B5'} />
                  <Text style={styles.text}>
                    {e.date}
                  </Text>
                  <Text style={styles.text}>
                    {e.action}
                  </Text>
                </View>
              </ImageBackground>
            </Animated.View>
          </TouchableOpacity>
        //     return <View style={styles.event}>
        //         <Icon 
        //             name="mic" 
        //             size={20} 
        //             color={'#F9F9B5'}      
        //         />
        //     <View style={styles.in_event}>
        //         <Text style={styles.text}>{e.date}</Text>
        //         <Text style={styles.text}>{e.action}</Text>
        //     </View>
        // </View>
        
        }else if(e.action === 'Music'){
            return  <TouchableOpacity>
            <Animated.View style={styles.animated}>
              <ImageBackground
                source={require('../../assets/card.png')}
                style={styles.img}
              >
                <View style={styles.event}>
                  <Icon name="md-headset" size={20} color={'#F9F9B5'} />
                  <Text style={styles.text}>
                    {e.date}
                  </Text>
                  <Text style={styles.text}>
                    {e.action}
                  </Text>
                </View>
              </ImageBackground>
            </Animated.View>
          </TouchableOpacity>
        
        }else if(e.action === 'Duty'){
            return  <TouchableOpacity>
            <Animated.View style={styles.animated}>
              <ImageBackground
                source={require('../../assets/card.png')}
                style={styles.img}
              >
                <View style={styles.event}>
                  <Icon name="man-sharp" size={20} color={'#F9F9B5'} />
                  <Text style={styles.text}>
                    {e.date}
                  </Text>
                  <Text style={styles.text}>
                    {e.action}
                  </Text>
                </View>
              </ImageBackground>
            </Animated.View>
          </TouchableOpacity>

        }else if(e.action === 'Ministry leader'){
            return  <TouchableOpacity>
            <Animated.View style={styles.animated}>
              <ImageBackground
                source={require('../../assets/card.png')}
                style={styles.img}
              >
                <View style={styles.event}>
                  <Icon name="people-circle-outline" size={20} color={'#F9F9B5'} />
                  <Text style={styles.text}>
                    {e.date}
                  </Text>
                  <Text style={styles.text}>
                    {e.action}
                  </Text>
                </View>
              </ImageBackground>
            </Animated.View>
          </TouchableOpacity> 

        }else if(e.action === 'Leader (week)'){
            return  <TouchableOpacity>
            <Animated.View style={styles.animated}>
              <ImageBackground
                source={require('../../assets/card.png')}
                style={styles.img}
              >
                <View style={styles.event}>
                  <Icon name="person-outline" size={20} color={'#F9F9B5'} />
                  <Text style={styles.text}>
                    {e.date}
                  </Text>
                  <Text style={styles.text}>
                    {e.action}
                  </Text>
                </View>
              </ImageBackground>
            </Animated.View>
          </TouchableOpacity> 

        }else if(e.action === 'Prayer 1 (week)'){
            return  <TouchableOpacity>
            <Animated.View style={styles.animated}>
              <ImageBackground
                source={require('../../assets/card.png')}
                style={styles.img}
              >
                <View style={styles.event}>
                  <Icon name="ios-layers" size={20} color={'#F9F9B5'} />
                  <Text style={styles.text}>
                    {e.date}
                  </Text>
                  <Text style={styles.text}>
                    {e.action}
                  </Text>
                </View>
              </ImageBackground>
            </Animated.View>
          </TouchableOpacity> 

        }else if(e.action === 'Treasures (week)'){
            return  <TouchableOpacity>
            <Animated.View style={styles.animated}>
              <ImageBackground
                source={require('../../assets/card.png')}
                style={styles.img}
              >
                <View style={styles.event}>
                  <Icon name="md-shield" size={20} color={'#F9F9B5'} />
                  <Text style={styles.text}>
                    {e.date}
                  </Text>
                  <Text style={styles.text}>
                    {e.action}
                  </Text>
                </View>
              </ImageBackground>
            </Animated.View>
          </TouchableOpacity> 

        }else if(e.action === 'Find treasures (week)'){
            return  <TouchableOpacity>
            <Animated.View style={styles.animated}>
              <ImageBackground
                source={require('../../assets/card.png')}
                style={styles.img}
              >
                <View style={styles.event}>
                  <Icon name="albums" size={20} color={'#F9F9B5'} />
                  <Text style={styles.text}>
                    {e.date}
                  </Text>
                  <Text style={styles.text}>
                    {e.action}
                  </Text>
                </View>
              </ImageBackground>
            </Animated.View>
          </TouchableOpacity> 

        }else if(e.action === 'Bible reading (week)'){
            return  <TouchableOpacity>
            <Animated.View style={styles.animated}>
              <ImageBackground
                source={require('../../assets/card.png')}
                style={styles.img}
              >
                <View style={styles.event}>
                  <Icon name="book" size={20} color={'#F9F9B5'} />
                  <Text style={styles.text}>
                    {e.date}
                  </Text>
                  <Text style={styles.text}>
                    {e.action}
                  </Text>
                </View>
              </ImageBackground>
            </Animated.View>
          </TouchableOpacity> 

        }else if(e.action === 'School leader (week)'){
            return  <TouchableOpacity>
            <Animated.View style={styles.animated}>
              <ImageBackground
                source={require('../../assets/card.png')}
                style={styles.img}
              >
                <View style={styles.event}>
                  <Icon name="school-sharp" size={20} color={'#F9F9B5'} />
                  <Text style={styles.text}>
                    {e.date}
                  </Text>
                  <Text style={styles.text}>
                    {e.action}
                  </Text>
                </View>
              </ImageBackground>
            </Animated.View>
          </TouchableOpacity> 

        }else if(e.action === 'School: Initial Call'){
            return  <TouchableOpacity>
            <Animated.View style={styles.animated}>
              <ImageBackground
                source={require('../../assets/card.png')}
                style={styles.img}
              >
                <View style={styles.event}>
                  <Icon name="people-outline" size={20} color={'#F9F9B5'} />
                  <Text style={styles.text}>
                    {e.date}
                  </Text>
                  <Text style={styles.text}>
                    {e.action}
                  </Text>
                </View>
              </ImageBackground>
            </Animated.View>
          </TouchableOpacity> 

        }else if(e.action === 'School: Return visit'){
            return  <TouchableOpacity>
            <Animated.View style={styles.animated}>
              <ImageBackground
                source={require('../../assets/card.png')}
                style={styles.img}
              >
                <View style={styles.event}>
                  <Icon name="people-outline" size={20} color={'#F9F9B5'} />
                  <Text style={styles.text}>
                    {e.date}
                  </Text>
                  <Text style={styles.text}>
                    {e.action}
                  </Text>
                </View>
              </ImageBackground>
            </Animated.View>
          </TouchableOpacity> 

        }else if(e.action === 'School: Study'){
            return  <TouchableOpacity>
            <Animated.View style={styles.animated}>
              <ImageBackground
                source={require('../../assets/card.png')}
                style={styles.img}
              >
                <View style={styles.event}>
                  <Icon name="people-sharp" size={20} color={'#F9F9B5'} />
                  <Text style={styles.text}>
                    {e.date}
                  </Text>
                  <Text style={styles.text}>
                    {e.action}
                  </Text>
                </View>
              </ImageBackground>
            </Animated.View>
          </TouchableOpacity> 

        }else if(e.action === 'School: Talk'){
            return  <TouchableOpacity>
            <Animated.View style={styles.animated}>
              <ImageBackground
                source={require('../../assets/card.png')}
                style={styles.img}
              >
                <View style={styles.event}>
                  <Icon name="md-man-outline" size={20} color={'#F9F9B5'} />
                  <Text style={styles.text}>
                    {e.date}
                  </Text>
                  <Text style={styles.text}>
                    {e.action}
                  </Text>
                </View>
              </ImageBackground>
            </Animated.View>
          </TouchableOpacity> 

        }else if(e.action === 'Discussion (week)'){
            return  <TouchableOpacity>
            <Animated.View style={styles.animated}>
              <ImageBackground
                source={require('../../assets/card.png')}
                style={styles.img}
              >
                <View style={styles.event}>
                  <Icon name="md-film-outline" size={20} color={'#F9F9B5'} />
                  <Text style={styles.text}>
                    {e.date}
                  </Text>
                  <Text style={styles.text}>
                    {e.action}
                  </Text>
                </View>
              </ImageBackground>
            </Animated.View>
          </TouchableOpacity> 

        }else if(e.action === 'Local Needs'){
            return  <TouchableOpacity>
            <Animated.View style={styles.animated}>
              <ImageBackground
                source={require('../../assets/card.png')}
                style={styles.img}
              >
                <View style={styles.event}>
                  <Icon name="md-file-tray-full" size={20} color={'#F9F9B5'} />
                  <Text style={styles.text}>
                    {e.date}
                  </Text>
                  <Text style={styles.text}>
                    {e.action}
                  </Text>
                </View>
              </ImageBackground>
            </Animated.View>
          </TouchableOpacity> 

        }else if(e.action === 'Bible Study Leader'){
            return  <TouchableOpacity>
            <Animated.View style={styles.animated}>
              <ImageBackground
                source={require('../../assets/card.png')}
                style={styles.img}
              >
                <View style={styles.event}>
                  <Icon name="md-library" size={20} color={'#F9F9B5'} />
                  <Text style={styles.text}>
                    {e.date}
                  </Text>
                  <Text style={styles.text}>
                    {e.action}
                  </Text>
                </View>
              </ImageBackground>
            </Animated.View>
          </TouchableOpacity> 

        }else if(e.action === 'Bible Study Lector'){
            return  <TouchableOpacity>
            <Animated.View style={styles.animated}>
              <ImageBackground
                source={require('../../assets/card.png')}
                style={styles.img}
              >
                <View style={styles.event}>
                  <Icon name="md-reader" size={20} color={'#F9F9B5'} />
                  <Text style={styles.text}>
                    {e.date}
                  </Text>
                  <Text style={styles.text}>
                    {e.action}
                  </Text>
                </View>
              </ImageBackground>
            </Animated.View>
          </TouchableOpacity> 

        }else if(e.action === 'Prayer 2 (week)'){
            return  <TouchableOpacity>
            <Animated.View style={styles.animated}>
              <ImageBackground
                source={require('../../assets/card.png')}
                style={styles.img}
              >
                <View style={styles.event}>
                  <Icon name="ios-layers" size={20} color={'#F9F9B5'} />
                  <Text style={styles.text}>
                    {e.date}
                  </Text>
                  <Text style={styles.text}>
                    {e.action}
                  </Text>
                </View>
              </ImageBackground>
            </Animated.View>
        </TouchableOpacity> 

        }else if(e.action === 'Weekend Leader'){
            return  <TouchableOpacity>
            <Animated.View style={styles.animated}>
              <ImageBackground
                source={require('../../assets/card.png')}
                style={styles.img}
              >
                <View style={styles.event}>
                  <Icon name="person-outline" size={20} color={'#F9F9B5'} />
                  <Text style={styles.text}>
                    {e.date}
                  </Text>
                  <Text style={styles.text}>
                    {e.action}
                  </Text>
                </View>
              </ImageBackground>
            </Animated.View>
          </TouchableOpacity> 

        }else if(e.action === 'Weekend Speach'){
            return  <TouchableOpacity>
            <Animated.View style={styles.animated}>
              <ImageBackground
                source={require('../../assets/card.png')}
                style={styles.img}
              >
                <View style={styles.event}>
                  <Icon name="md-man-outline" size={20} color={'#F9F9B5'} />
                  <Text style={styles.text}>
                    {e.date}
                  </Text>
                  <Text style={styles.text}>
                    {e.action}
                  </Text>
                </View>
              </ImageBackground>
            </Animated.View>
          </TouchableOpacity> 

        }else if(e.action === 'Watch Tower Leader'){
            return  <TouchableOpacity>
            <Animated.View style={styles.animated}>
              <ImageBackground
                source={require('../../assets/card.png')}
                style={styles.img}
              >
                <View style={styles.event}>
                  <Icon name="person-sharp" size={20} color={'#F9F9B5'} />
                  <Text style={styles.text}>
                    {e.date}
                  </Text>
                  <Text style={styles.text}>
                    {e.action}
                  </Text>
                </View>
              </ImageBackground>
            </Animated.View>
          </TouchableOpacity> 

        }else if(e.action === 'Watch Tower Lector'){
            return  <TouchableOpacity>
            <Animated.View style={styles.animated}>
              <ImageBackground
                source={require('../../assets/card.png')}
                style={styles.img}
              >
                <View style={styles.event}>
                  <Icon name="md-reader" size={20} color={'#F9F9B5'} />
                  <Text style={styles.text}>
                    {e.date}
                  </Text>
                  <Text style={styles.text}>
                    {e.action}
                  </Text>
                </View>
              </ImageBackground>
            </Animated.View>
          </TouchableOpacity> 
        }
    })
  )
}

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontSize: 15,
      },
      event:{
        flexDirection: 'row',
        alignItems: 'center',
        width: 300,
        // borderRadius: 15,
        // borderWidth: 1,
        // borderColor: 'white',
        // borderColor: '#78D7D9',
        margin: 5,
        padding: 10,
        gap: 20,
        // color: 'white',
        fontSize: 20,
        zIndex: 999,
        // backgroundColor: '#333333'
        backgroundColor: 'transparent'
      }, 
      in_event:{
        flexDirection: 'column',
      },
      animated: {
        borderRadius: 15,
        shadowColor: 'white',
        shadowOpacity: 1,
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowRadius: 4,
        margin: 5
      }, 
      img: {
        width: 300,
        height: 60,
        resizeMode: 'cover',
      },
})

export default Timetable
