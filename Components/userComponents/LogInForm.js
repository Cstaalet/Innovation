import React, { useState } from 'react';
import { Button, Text, View, TextInput, ActivityIndicator, StyleSheet, } from 'react-native';

//import firebase
import firebase from "firebase/compat";

export default function LogInForm() {
    //Required variable in the logig form with errorhandling and errormessages
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isCompleted, setCompleted] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    //Asynchronous function in order to authenticate and check if login information is in the database
    const handleSubmit = async () => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password).then((data) => {
            });

        } catch (error) {
            setErrorMessage(error.message)
        }
    }
    //Login button using the handleSubmit async function
    const LogButton = () => {
        return <Button onPress={() => handleSubmit()} title="Login" />;
    };
    return (
        //View on the app with fields, text, inputfields and set functions
        <View>
            <Text style={styles.header}>Login</Text>
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
            {LogButton()}
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