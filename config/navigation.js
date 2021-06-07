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
import ForgotPassword from '../screens/forgot-password';

// importing react native navigations
import { NativeRouter, Route, BackButton,Switch } from "react-router-native";
import { useGlobalState } from "../context/context";


import {
  Text
} from "react-native";
import Restaurants from '../screens/restaurants';
import AdminDashboard from '../screens/admin-dashboard';
import myRequests from '../components/my-requests';
import Materials from '../components/materials';

export default function Navigation() {
  const globalState = useGlobalState();
  return (
    <NativeRouter>
      <BackButton>

      {/* <Text>
        {JSON.stringify(globalState)}
      </Text> */}
      {globalState.loginStatus === false ?
        <>
          <Route exact path="/" component={Signin} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
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
            />
            
      
          <Route
            path='/restaurants'
            component={Restaurants}
            />
                <Route
            path='/my-requests'
            component={myRequests}
            />
          <Route
            path='/place-request'
            component={Materials}
            />
        <AppFooter />
        
        </>

: null}
      {(globalState.loginStatus === true && globalState.user.role === 'admin')
        ?
        <>
          <Route
            path='/'
            exact
            component={AdminDashboard}
            >
          </Route>
          <Route
            path='/my-profile'
            component={MyProfile}
            />
            
         <AppFooter />
        </>

: null}
</BackButton>
    </NativeRouter>
  )
}