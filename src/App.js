import Register from "./components/Register";
import ipConfig from "./ipConfig.json";
import Login from "./components/Login";
import Products from "./components/Products";
import Checkout from "./components/Checkout"
import theme from "./theme";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {Route,Link,Switch} from "react-router-dom"

export const config = {
  endpoint: `http://${ipConfig.workspaceIp}:8082/api/v1`,
};

function App() {
  return (
    <div className="App">
      {/* TODO: CRIO_TASK_MODULE_LOGIN - To add configure routes and their mapping */}
      <ThemeProvider theme={theme}>
        <Switch>
          <Route  exact path="/" component={Products}/>
          <Route  path="/login" component={Login}/>
          <Route  path="/register" component={Register}/>
          <Route  path="/checkout" component={Checkout}/>
        </Switch>
      </ThemeProvider>
          
    </div>
  );
}

export default App;
