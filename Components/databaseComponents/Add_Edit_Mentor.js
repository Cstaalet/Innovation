import * as React from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, ScrollView, SafeAreaView, } from 'react-native';
import firebase from 'firebase/compat';
import { useEffect, useState } from "react";


const Add_Edit_Mentor = ({ navigation, route }) => {
    //Set variables for the object (Mentor)
    const initialState = {
        Name: '',
        Age: '',
        Sex: '',
        Education: ''
    }
    //override the mentor data with setnewmentor's usestate
    const [newMentor, setNewMentor] = useState(initialState);

    const isEditMentor = route.name === "Edit Mentor";

    useEffect(() => {
        if (isEditMentor) {
            const mentor = route.params.mentor[1];
            setNewMentor(mentor)
        }
        // delete data when we go away from the screen
        return () => {
            setNewMentor(initialState)
        };
    }, []);
    const changeTextInput = (name, event) => {
        setNewMentor({ ...newMentor, [name]: event });
    }
    //Save new data function
    const handleSave = () => {

        const { Name, Age, Sex, Education } = newMentor;
        //Error handling if fields aren't filled out
        if (Name.length === 0 || Age.length === 0 || Sex.length === 0 || Education.length === 0) {
            return Alert.alert('Et af felterne er tomme!');
        }
        if (isEditMentor) {
            const id = route.params.mentor[0];
            try {
                firebase
                    .database()
                    .ref(`/Mentors/${id}`)
                    // update data with the reference
                    .update({ Name, Age, Sex, Education });
                Alert.alert("Din info er nu opdateret");
                const mentor = [id, newMentor]
                navigation.navigate("Mentor Details", { mentor });
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }

        } else {

            try {
                firebase
                    .database()
                    .ref('/Mentors/')
                    .push({ Name, Age, Sex, Education });
                Alert.alert(`Saved`);
                setNewMentor(initialState)
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }
        }

    }; return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {
                    Object.keys(initialState).map((key, index) => {
                        return (
                            <View style={styles.row} key={index}>
                                <Text style={styles.label}>{key}</Text>
                                <TextInput
                                    value={newMentor[key]}
                                    onChangeText={(event) => changeTextInput(key, event)}
                                    style={styles.input}
                                />
                            </View>
                        )
                    })
                }
                {/*If route is edit mentor then show save changes instead of add mentor*/}
                <Button title={isEditMentor ? "Save changes" : "Add mentor"} onPress={() => handleSave()} />
            </ScrollView>
        </SafeAreaView>
    );
}

export default Add_Edit_Mentor

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
    },
    label: {
        fontWeight: 'bold',
        width: 100
    },
    input: {
        borderWidth: 1,
        padding: 5,
        flex: 1
    },
});
