import React from 'react'
import { StyleSheet,View, Image, Text, Button, Pressable} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export function NavBar(){
    const navigation = useNavigation();
    
    return(
        <View >
            {/* <Button
            title='Menu'
            onPress={() => navigation.navigate("Menu")}/> */}
            <Pressable style={styles.menuBtn} onPress={() => navigation.navigate("Menu")}>
                <Text style={styles.menuText}>Menu</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    menuBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#2e2d2d',
        borderWidth:1,
        borderColor:"#4a4949"
    },
    menuText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#ebe8e8',
    },
  });