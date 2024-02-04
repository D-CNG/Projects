import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Button, TextInput, Pressable, Text } from 'react-native';
import { useNavigation} from '@react-navigation/native';

//Displays Options Menu
export function MenuScreen() {
  const navigation = useNavigation();
                   
  const [text, setText] = useState('')
  
  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style ={styles.searchBar}>
      <TextInput
      style={styles.searchInput}
      placeholder="Street Country eg. Baker Street London "
      onChangeText={newText => setText(newText)}
      defaultValue={text}
    />
      <Pressable style={styles.searchBtn} onPress={() => navigation.navigate("Search-Result",{ data: text,})}>
        <Text style={styles.searchText}>Search</Text>
      </Pressable>
      </View>
      
    {/* Button to navigate to list of favourites */}
      <Pressable style={styles.favBtn} onPress={() => navigation.navigate("Favourites")}>
        <Text style={styles.favText}>Manage Favourites</Text>
      </Pressable>

    </View>
  );

  
}

const styles = StyleSheet.create({
  container: {
    borderWidth:1,
    flex: 1,
    backgroundColor: '#bad0d4',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 30,
  },
  searchBar:{
    flexDirection:'row', 
    borderWidth:1, 
    borderColor:"#8a9ca1"
  },
  searchInput:{
    height: 40, 
    backgroundColor:"#c5dade", 
    paddingHorizontal:10
  },
  favBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: "95%",
    marginVertical:10,
    paddingVertical: 12,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#366ead',
  },
  favText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  searchBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#3a7ac2',
  },
  searchText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },

});