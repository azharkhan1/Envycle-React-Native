import * as React from "react";
import Navigation from "./config/navigation";
import {GlobalStateProvider} from "./context/context.js";






function App() {
  return (

    <GlobalStateProvider><Navigation /></GlobalStateProvider>


  );
}





export default App;