import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import Signin from "../screens/signin";
import Signup from "../screens/signup";
import ForgotPassword from '../screens/forgot-password';


const Stack = createStackNavigator();



export default function AuthNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Welcome' component={WelcomeScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen name='Login' component={Signin} />
            <Stack.Screen name='Signup' component={Signup} />
            <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
        </Stack.Navigator>
    )
}


