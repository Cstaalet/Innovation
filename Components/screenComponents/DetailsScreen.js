import {Button, Text, View} from "react-native";
import * as React from "react";

//Navigation controller function to navigate with routing
const navController = (navigation, route) =>{
  navigation.navigate(route)
}

// DetailsScreen function with text and navigation. Intended to use standard stack navigation if there were a StackOne and StackTwo component
export default function DetailsScreen({navigation}) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button
          title="Go to StackOne"
          onPress={() => navController(navigation, 'StackOne')}
        />
        <Button
          title="Go to StackTwo"
          onPress={() => navController(navigation, 'StackTwo')}
        />
      </View>
    );
  }
 