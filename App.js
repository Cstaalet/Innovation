import { StyleSheet } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

//import firebase from
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat";

//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//StackNavigation
import { createStackNavigator } from '@react-navigation/stack';

//Components
import HomeScreen from './Components/screenComponents/HomeScreen.js';
import SettingsScreen from './Components/screenComponents/SettingsScreen.js'
import UserScreen from './Components/screenComponents/userScreen';

//Database components 
import MentorList from "./Components/databaseComponents/Mentorlist"
import MentorDetails from "./Components/databaseComponents/MentorDetails"
import Add_Edit_Mentor from "./Components/databaseComponents/Add_Edit_Mentor"

//App
export default function App() {

  //Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBtEhMBhtkPfhE1AWrISGM2J09vqmyK_WM",
    authDomain: "opgave1-fb124.firebaseapp.com",
    databaseURL: "https://opgave1-fb124-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "opgave1-fb124",
    storageBucket: "opgave1-fb124.appspot.com",
    messagingSenderId: "369259900197",
    appId: "1:369259900197:web:971660e3ed215fbb797ecc"
  };
  

  // Check if only 1 instance of the firebase app is running

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  //Tab navigation
  const Tab = createBottomTabNavigator();

  //Initiate stack navigator
  const Stack = createStackNavigator();
  const TheStack = () => {

    return (
      //Stack navigator with screens
      <Stack.Navigator>
        <Stack.Screen name={'Mentor List'} component={MentorList} />
        <Stack.Screen name={'Mentor Details'} component={MentorDetails} />
        <Stack.Screen name={'Edit Mentor'} component={Add_Edit_Mentor} />
      </Stack.Navigator>
    )
  }
  return (
    //Tab navigator with screens a Ionicons
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
      })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: () => (<Ionicons name="home" size={20} />)}} />
        <Tab.Screen name="Settings" component={SettingsScreen} options={{ tabBarIcon: () => (<Ionicons name="md-settings-outline" size={20} />) }} />
        <Tab.Screen name="User Screen" component={UserScreen} options={{ tabBarIcon: () => (<Ionicons name="md-list-outline" size={20} />) }} />
        <Tab.Screen name="Mentor Screen" component={TheStack} options={{ tabBarIcon: () => (<Ionicons name="home" size={20} />), headerShown: null  }} />
        <Tab.Screen name="Add" component={Add_Edit_Mentor} options={{ tabBarIcon: () => (<Ionicons name="add" size={20} />) }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/
