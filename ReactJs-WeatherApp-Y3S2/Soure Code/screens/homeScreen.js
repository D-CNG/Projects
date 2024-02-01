import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect  } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { Screen } from '../templates/homeTemplate'
import { FavScreen } from '../templates/favouriteTemplate';
import Swiper from 'react-native-swiper'
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NavBar } from '../templates/nav';
 
// Displays Home screen and favourited locations
export default function HomeScreen() {
  const navigation = useNavigation();
  const [fav, setFav] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    (async() => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if (status != 'granted'){
        setErrorMsg("Permission denied");
        return;
      }
    
      setFav(await AsyncStorage.getAllKeys());
      setLocation(await Location.getCurrentPositionAsync({}));
        
    })();
  }, []);

  if (errorMsg !== null) {
    //there's been an error 
    return (
      <View style={styles.container}>
        <Text>Theres been an error: {errorMsg}</Text>
        <StatusBar style="auto" />
      </View>
    );

  }else if (location !== null) {
    console.log("location is")
    console.log(location);
    //success
    return (

      <Swiper style={styles.wrapper} showsButtons={false} loop={false}>

        <View style={styles.slide1}>
          <SafeAreaView >
            <NavBar/>
              < Screen 
              props = {location}/>
              {/* first screen will display weather of current location */}
          </SafeAreaView>
          
        </View>
        
        { 
          fav.length > 0 &&
          <View style={styles.slide1}>
            <SafeAreaView>
            <NavBar/>
                <FavScreen
                props = {fav[0]}/>
                {/* first screen will display weather of current location */}
            </SafeAreaView>
          </View>
          
        }
      
        {
          fav.length >1 &&
          <View style={styles.slide1}>
            <SafeAreaView>
            <NavBar/>
                <FavScreen
                props = {fav[1]}/>
                {/* first screen will display weather of current location */}
            </SafeAreaView>
          </View>
          
        }
        

      </Swiper>
    )
  }else {
    //waiting
    return (
      <View style={styles.container}>
        <Text>Waiting...</Text>
        <StatusBar style="auto" />
      </View>
    );

  }
}

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    paddingTop:15,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
})