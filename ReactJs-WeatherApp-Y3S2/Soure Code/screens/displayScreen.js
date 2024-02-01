import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import * as Location from 'expo-location';
import { useRoute } from '@react-navigation/native';
import { FavScreen } from '../templates/favouriteTemplate';
import { storeData } from '../util/asynStorage';

// Displays Search Result
export function DisplayScreen(){
    const route = useRoute();
    const search = route.params.data;
    const [errorMsg, setErrorMsg] = useState(null);

      if (errorMsg !== null) {
        //there's been an error 
        return (
          <View style={styles.container}>
            <Text>Theres been an error: {errorMsg}</Text>
            <StatusBar style="auto" />
          </View>
        );
    
      }else if (search !== null) {
        //success
        return (
            <View>
                <Button
                title = "favourite"
                onPress={()=> storeData(search,search)}/>
              < FavScreen 
              props = {search} />
            </View>
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
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  })
