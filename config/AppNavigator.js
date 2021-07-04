import React from "react";
import { createBottomTabNavigator, navigate } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../components/home';
import MyProfile from "../screens/myProfile";
import Materials from '../components/materials'
import PlaceRequestButton from "../components/PlaceRequestButton";
import HomeNavigator from './HomeNavigator'

const Tab = createBottomTabNavigator();


const AppNavigator = () => {

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="PlaceRequest"
        component={Materials}
        options={({ navigation }) => ({
          tabBarButton: () => (
            <PlaceRequestButton
              onPress={() => navigation.navigate('PlaceRequest')}
            />
          ),
          tabBarLabel: 'Place Request'

        })}
      />

      <Tab.Screen
        name="MyProfile"
        component={MyProfile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />


    </Tab.Navigator>
  )
};

export default AppNavigator;