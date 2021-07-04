import React from "react";
import AuthNavigator from "./AuthNavigator";
import { NavigationContainer} from '@react-navigation/native'
import AppNavigator from "./AppNavigator";
import { useGlobalState } from "../context/context";


function MainNavigation() {
    const globalState = useGlobalState();
  return (
   
      <NavigationContainer>
      {globalState.loginStatus === false ? <AuthNavigator/> : <AppNavigator />}  
      </NavigationContainer>
 
  );
}





export default MainNavigation;