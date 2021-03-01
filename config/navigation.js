import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


// Importing Screens
import Signin from "../screens/signin";
import Signup from "../screens/signup";
import UserDashboard from "../screens/user-dashboard/user-dashboard";

// importing react native navigations
import { NativeRouter, Route, Link } from "react-router-native";

import { useGlobalState } from "../context/context";


import {
  Text
} from "react-native";

export default function Navigation() {
  const globalState = useGlobalState();
  return (
    <NativeRouter>
      <Text>
        {JSON.stringify(globalState)}
      </Text>
      {globalState.loginStatus === false ?
        <>
          <Route exact path="/" component={Signin} />
          <Route path="/signup" component={Signup} />
        </>
        : null}
      {(globalState.loginStatus === true)
        ?
        <Route
          path='/'
          exact
          component={UserDashboard}
        >
        </Route>
        : null}
    </NativeRouter>
  )
}