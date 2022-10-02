import * as React from 'react';
import { View, Text, Platform, FlatList, StyleSheet, Button, Alert } from 'react-native';
import firebase from 'firebase/compat';
import {useEffect, useState} from "react";

const MentorDetails = ({route,navigation}) => {

    const [mentor,setMentor] = useState({});

    useEffect(() => {
        //Gather car values and set them
        setMentor(route.params.mentor[1]);

        //Set to empty object when we leave the screen
        return () => {
            setMentor({})
        }
    });

    const handleEdit = () => {
        // Navigation the the mentor screen with the specific mentor's values
        const mentor = route.params.mentor
        navigation.navigate('Edit Mentor', { mentor });
    };

    // Confirm deletion from the user
    const confirmDelete = () => {
        // Mobile compatibility
        if(Platform.OS ==='ios' || Platform.OS ==='android'){
            Alert.alert('Are you sure?', 'Do you want to delete the mentor?', [
                { text: 'Cancel', style: 'cancel' },
                // onpress eventhandler on the button in order to delete
                { text: 'Delete', style: 'destructive', onPress: () => handleDelete() },
            ]);
        }
    };

    // Delete the specifik mentor
    const  handleDelete = () => {
        const id = route.params.mentor[0];
        try {
            firebase
                .database()
                //Get mentor with ID
                .ref(`/Mentors/${id}`)
                // Delete the mentor due to the reference
                .remove();
            // navigate goBack
            navigation.goBack();
        } catch (error) {
            Alert.alert(error.message);
        }
    };


    if (!mentor) {
        return <Text>No data</Text>;
    }

    //all content
    return (
        <View style={styles.container}>
            <Button title="Edit" onPress={ () => handleEdit()} />
            <Button title="Delete" onPress={() => confirmDelete()} />
            {
                Object.entries(mentor).map((item,index)=>{
                    return(
                        <View style={styles.row} key={index}>
                            {/*Vores car keys navn*/}
                            <Text style={styles.label}>{item[0]} </Text>
                            {/*Vores car values navne */}
                            <Text style={styles.value}>{item[1]}</Text>
                        </View>
                    )
                })
            }
        </View>
    );
}

export default MentorDetails;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-start' },
    row: {
        margin: 5,
        padding: 5,
        flexDirection: 'row',
    },
    label: { width: 100, fontWeight: 'bold' },
    value: { flex: 1 },
});