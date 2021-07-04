import * as React from "react";
import { GlobalStateProvider } from "./context/context.js";
import MainNavigation from "./config/MainNavigation.js";
import MyProfile from "./screens/myProfile/index.js";
function App() {

  return (
    <GlobalStateProvider>
    
        <MainNavigation />
      
    </GlobalStateProvider>
  );
}





export default App;