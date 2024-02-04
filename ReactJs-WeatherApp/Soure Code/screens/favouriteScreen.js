import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, Pressable} from 'react-native';
import { removeData  } from '../util/asynStorage';


// Display Favourited Locations
export function Favourites(){
    const [fav,setFav] = useState([]);
    useEffect(() => {
        (async() => {
            // Retrieve all data in storage 
          await AsyncStorage.getAllKeys().then((keys)=>
           {
                console.log('data')
                if(keys !== null){
                    console.log(keys);
                    setFav(keys);
                }
            })
            .catch((error) => {
              console.log('failed to fetch data')
              console.log(error);
            })
            
        })();
      }, []);
    //   if there are favourited locations
    if (fav.length !== 0)
    {
        return(
            <View style = {styles.container}>
                {
                    fav.map((f,index)=>{
                        console.log(f)
                        return(
                            // display them
                            <View
                            key = {index}
                            style={styles.locContainer}>
                                <Text style = {styles.favLocation}> {f}</Text>
                                <Pressable style={styles.deleteBtn} onPress={()=>removeData(f)}>
                                    <Text style={styles.deleteText}>Delete</Text>
                                </Pressable>

                            </View>
                        )
                    })
                }
            </View>
        )
    }

    else{
        return(
            <View>
                <Text>HAVE SOME FAVOURITES </Text>
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    container:{
        borderWidth:2,
        flex:1,
        backgroundColor:"#bad0d4"
    },
    locContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection:'row',
      marginTop:10,
      borderWidth:1,
      backgroundColor:"#dfe7eb",
      borderRadius:6,
    },
    favLocation:{
        width:"60%",
        fontSize:16,
        fontWeight:'700',

    },
    deleteBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#911c13',
    },
    deleteText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    },
  });