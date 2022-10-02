import React, { useState } from 'react';
import { Button, Text, View, TextInput, ActivityIndicator, StyleSheet, } from 'react-native';

//import firebase 
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat";

//Firebase authentication functions
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUpForm() {
    //Fields required to be filled in the Sign Up form with errormessages and errorhandling
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isCompleted, setCompleted] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    //Signup Button to use the handleSubmit async function below
    const SignButton = () => {
        return <Button onPress={() => handleSubmit()} title="Create User" />;
    }
    const handleSubmit = async () => {
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password).then((data) => {
            });
        } catch (error) {
            setErrorMessage(error.message)
        }
    }
    return (
        //Views and text fields of required textinputs in the signup form
        <View>
            <Text style={styles.header}>Sign up</Text>
            <TextInput
                placeholder="email"
                value={email}
                onChangeText={(email) => setEmail(email)}
                style={styles.inputField}
            />
            <TextInput
                placeholder="password"
                value={password}
                onChangeText={(password) => setPassword(password)}
                secureTextEntry
                style={styles.inputField}
            />
            {errorMessage && (
                <Text style={styles.error}>Error: {errorMessage}</Text>
            )}
            {SignButton()}
        </View>
    );
}

const styles = StyleSheet.create({
    error: {
        color: 'red',
    },
    inputField: {
        borderWidth: 1,
        margin: 10,
        padding: 10,
    },
    header: {
        fontSize: 40,
    },
});
