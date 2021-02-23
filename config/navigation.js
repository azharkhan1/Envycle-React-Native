import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


// Importing Screens
import Signin from "../screens/signin";
import Signup from "../screens/signup";


// importing react native navigations
import { NativeRouter, Route, Link } from "react-router-native";



export default function Navigation() {
  return (
    <NativeRouter>
      <Route exact path="/" component={Signin} />
      <Route path="/signup" component={Signup} />
    </NativeRouter>
  )
}