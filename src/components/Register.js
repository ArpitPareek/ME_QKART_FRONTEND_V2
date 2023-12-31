import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";
import { useHistory, Link , useRouteMatch} from "react-router-dom";


const Register = () => {
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar();
  const[formData,setFormData] = useState({username:"",password:"",confirmPassword:""});
  const[loading,setLoading] = useState(false)
   

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  const register = async(e) => {
    console.log(formData);
    let result  = validateInput(formData);
    const{username,password} = formData
    
      console.log(window.localStorage.getItem(username))
    
    if(result){
      setLoading(true)
      await axios.post(`${config.endpoint}/auth/register`, {username,password})
      .then(function (response) {

        console.log(response);
        setLoading(false)
        if(response.data.success){
          console.log(response.data)
          enqueueSnackbar("Registered successfully",{variant:'success'});
          history.push("/login")
        }
      })
      .catch(function (error) {
        console.log(error.response)
        setLoading(false)
         if(error.message === "Network Error!"){
          enqueueSnackbar("Something went wrong. Check that the backend is running, reachable and returns valid JSON.",{variant:"error"});
         }else{
          enqueueSnackbar(error.response.data.message,{variant:"error"});
         }
        
        
      })
    }
    }

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (data) => {
    const {username,password,confirmPassword} = data;
    if(username.length===0){
      
      enqueueSnackbar("Username is a required field",{variant:"error"});
      return false;
    }
    if(username.length < 6){
      
      enqueueSnackbar("Username must be at least 6 characters",{variant:"error"});
      return false;
    }if(password.length===0){
      
      enqueueSnackbar("Password is a required field",{variant:"error"});
      return false;
    }
    if(password.length < 6){
      
      enqueueSnackbar("Password must be at least 6 characters",{variant:"error"});
      return false;
    }
    if(password!==confirmPassword){
      enqueueSnackbar("Passwords do not match",{variant:"error"});
      return false;
    }
    return true
  };
  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons={true} />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
            onChange={handleChange}
          />
          <p></p>
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
            onChange={handleChange}
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            onChange={handleChange}
          />
           <Box>
           {loading ? <CircularProgress /> :
           <Button className="button" variant="contained" onClick={register}>
            Register Now
           </Button>}
           </Box>
          <p className="secondary-action">
            Already have an account?{" "}
            <Link to="/login" className="Link">Login</Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
