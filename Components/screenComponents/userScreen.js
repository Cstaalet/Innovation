import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Card } from 'react-native-paper';

//import firebase from
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat";

//Components
import SignUpForm from '../userComponents/SignUpForm';
import LogInForm from '../userComponents/LogInForm';

//Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBtEhMBhtkPfhE1AWrISGM2J09vqmyK_WM",
    authDomain: "opgave1-fb124.firebaseapp.com",
    projectId: "opgave1-fb124",
    storageBucket: "opgave1-fb124.appspot.com",
    messagingSenderId: "369259900197",
    appId: "1:369259900197:web:971660e3ed215fbb797ecc"
  };


  function ProfileScreen () {

    //Firebase predefined handleLogout function in order to log an active user out through an async function
    const handleLogOut = async () => {
        await firebase.auth().signOut();
    };

    //Errormessage if a user was not found
    if (!firebase.auth().currentUser) {
        return <View><Text>This user could not be found</Text></View>;
    }

    //method to return the email of an active user 
    return (
        <View style={styles.container} >
            <Text>Current user: {firebase.auth().currentUser.email}</Text>
            <Button onPress={() => handleLogOut()} title="Log out" />
        </View>
    );

}

export default function UserScreen({navigation}) {
    //usestate variable is used to create a user object 
  const [user, setUser] = useState({ loggedIn: false });

  //Make sure only one instance of the firebase runs
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

//onAuthstatechanged predefined method to observe the users status if it is logged in or out. The status has a callback setUser method in order to handle the status
  function onAuthStateChange(callback) {
    return firebase.auth().onAuthStateChanged(user => {
      if (user) {
        callback({loggedIn: true, user: user});
      } else {
        callback({loggedIn: false});
      }
    });
  }

  //Listener to dynamically check if the user is active or not
  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);

//Guest page if a user is not logged in so you can register or login
  const GuestPage = () => {
    return(
        <View style={styles.container}>
          <Text style={styles.paragraph}>
            Login or sign in
          </Text>

          <Card style={{padding:20}}>
            <SignUpForm />
          </Card>

          <Card style={{padding:20}}>
            <LogInForm />
          </Card>

        </View>
    )
  }

  return user.loggedIn ? <ProfileScreen /> : <GuestPage/> ;

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: '5%',
      backgroundColor: 'transparent',
      padding: 20,
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });