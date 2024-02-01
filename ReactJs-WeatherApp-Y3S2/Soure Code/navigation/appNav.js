import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/homeScreen';
import { MenuScreen } from '../screens/menuScreen';
import { DisplayScreen } from '../screens/displayScreen';
import { LogBox, Text, View } from 'react-native';
import { Favourites } from '../screens/favouriteScreen';

const Stack = createStackNavigator();

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
// Navigation between pages
export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
        <Stack.Screen name="Menu" options={{headerShown: false}} component={MenuScreen} />
        <Stack.Screen name="Search-Result" options={{headerShown: false}} component={DisplayScreen} />
        <Stack.Screen name="Favourites" options={{headerShown: false}} component = {Favourites} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
