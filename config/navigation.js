import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


// Importing Screens
import Signin from "../screens/signin";
import Signup from "../screens/signup";


const Stack = createStackNavigator();


export default function Navigation(){
    return(
        <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Signin" component={Signin} />
        </Stack.Navigator>
      </NavigationContainer>
    )
}