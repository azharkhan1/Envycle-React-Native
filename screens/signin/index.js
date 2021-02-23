import React, { useRef, useState, createRef } from 'react';
import {

  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,

} from 'react-native';
import { Card } from "react-native-elements";
import axios from "axios";
import URL from "../../core";


// Importing React Router Native

import { Link } from "react-router-native";



export default function Signin() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  // const signupNow = () => {
  //   // console.log(email,password);
  //   axios({
  //     method: "post",
  //     url: `${URL}/auth/login`,
  //     data: {
  //       userEmail: email,
  //       userPassword: password
  //     }
  //   }).then((response) => {
  //     console.log('This is response=>', response.data);
  //   }).catch((err) => { throw err })
  // }

  return (

    <View style={styles.container}>
      <View style={styles.input_container}>
        <Card>
          <Card.Title>Login</Card.Title>
          <TextInput
            style={styles.input}
            type="email" placeholder={'Enter your email'}
            onChangeText={(e) => setEmail(e)}
          />
          <Card.Divider />
          <TextInput
            style={styles.input}
            placeholder={"Enter your password"}
            onChangeText={(e) => setPassword(e)}
          />
          <TouchableOpacity style={styles.button}
          

          >
            <Text style={styles.text}>Login</Text>
          </TouchableOpacity>
          <Link to="/signup">
            <Text styles={styles.createAccount}>
              Create an account
            </Text>
          </Link>

        </Card>
      </View>
    </View>

  );
}


const styles = StyleSheet.create({

  input: {
    width: 295,
    height: 40,
    borderWidth: 1,
    marginTop: 5,
    borderRadius: 3,
  },

  container: {
    display: "flex", justifyContent: "center", flex: 1, alignItems: "center",
    color: "white",
    backgroundColor: "#014732"
  },

  button: {
    width: 200,
    height: 50,
    backgroundColor: "#014732",
    color: "white",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 16,
    marginTop: 20,
    alignSelf: "center",
  },
  text: {
    color: "white",
    fontSize: 16,
  },


})


