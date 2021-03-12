import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View } from 'react-native'

// Importing Screens
import Signin from "../screens/signin";
import Signup from "../screens/signup";
import UserDashboard from "../screens/user-dashboard/user-dashboard";
import AppFooter from "../components/footer";
import MyProfile from '../screens/myProfile';

// importing react native navigations
import { NativeRouter, Route, Link } from "react-router-native";
import { useGlobalState } from "../context/context";


import {
  Text
} from "react-native";
import Restaurants from '../screens/restaurants';

export default function Navigation() {
  const globalState = useGlobalState();
  return (
    <NativeRouter>
      {/* <Text>
        {JSON.stringify(globalState)}
      </Text> */}
      {globalState.loginStatus === false ?
        <>
          <Route exact path="/" component={Signin} />
          <Route path="/signup" component={Signup} />
        </>
        : null}
      {(globalState.loginStatus === true && globalState.user.role === 'user')
        ?
        <>
          <Route
            path='/'
            exact
            component={UserDashboard}
          >
          </Route>
          <Route
            path='/my-profile'
            component={MyProfile}
          >
          </Route>
          <Route
            path='/restaurants'
            component={Restaurants}
          >
          </Route>
          <AppFooter />
        </>

        : null}
    </NativeRouter>
  )
}