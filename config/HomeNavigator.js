import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import myRequests from '../components/my-requests';
import Restaurants from '../screens/restaurants';
import Materials from '../components/materials';
import Home from '../components/home';
import MyProfile from '../screens/myProfile';

const Stack = createStackNavigator();



export default function HomeNavigator() {
    return (
        <Stack.Navigator
       screenOptions={{
           headerShown:false
       }}
        >
            <Stack.Screen name='Home' component={Home}
            />
            <Stack.Screen name='Restaurants' component={Restaurants} />
            <Stack.Screen name='PlaceRequest' component={Materials} />
            <Stack.Screen name='MyRequests' component={myRequests} />
        </Stack.Navigator>
    )
}


