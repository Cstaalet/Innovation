import * as React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import firebase from 'firebase/compat';
import {useEffect, useState} from "react";

const MentorList = ({navigation}) => {
    //Setting up the mentorlist by checking data in the firebase database
    const [mentors,setMentors] = useState()

    useEffect(() => {
        if(!mentors) {
            firebase
                .database()
                .ref('/Mentors')
                .on('value', snapshot => {
                    setMentors(snapshot.val())
                });
        }
    },[]);

    // If statement that if there is no mentors it will display this text
    if (!mentors) {
        return <Text>Loading...</Text>;
    }
    //function to search in the database's array of mentors and see if any match the ID that is sent
    const handleSelectMentor = id => {
        const mentor = Object.entries(mentors).find( mentor => mentor[0] === id)
        navigation.navigate('Mentor Details', { mentor });
    };

    // Convers the objects into arrays as Flatlist uses arrays of objects
    const mentorArray = Object.values(mentors);
    const mentorKeys = Object.keys(mentors);

    return (
        <FlatList
            data={mentorArray}
            // mentorKeys is used to find the ID and return it as a key. 
            keyExtractor={(item, index) => mentorKeys[index]}
            renderItem={({ item, index }) => {
                return(
                    <TouchableOpacity style={styles.container} onPress={() => handleSelectMentor(mentorKeys[index])}>
                        <Text>
                            {item.Name} {item.Age}
                        </Text>
                    </TouchableOpacity>
                )
            }}
        />
    );
}

export default MentorList;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        borderRadius:10,
        margin: 5,
        padding: 5,
        height: 50,
        justifyContent:'center'
    },
    label: { fontWeight: 'bold' },
});