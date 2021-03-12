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

import { useGlobalState, useGlobalStateUpdate } from "../../context/context";

export default function Signin() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [message, setMessage] = useState('Sign In');
  const globalStateUpdate = useGlobalStateUpdate();

  const signInNow = () => {
    console.log('function is running', email, password);
    axios({
      method: "post",
      url: `${URL}/auth/login`,
      data: {
        userEmail: email.toLowerCase(),
        userPassword: password
      }
    }).then((response) => {
      globalStateUpdate(prev => ({
        ...prev, loginStatus: true, user: {
          userEmail: response.data.user.userEmail,
          userName: response.data.user.userName,
          points: response.data.user.points,
        }, role: response.data.user.role,
      }));
      console.log('This is response=>', response.data);
      setMessage('Logged in');
    }).catch((err) => {
      setMessage('failed');
    })

  }

  return (

    <View style={styles.container}>
      <View style={styles.input_container}>
        <Card containerStyle={styles.card}>
          <Card.Title>{message}</Card.Title>
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
            onPress={() => signInNow()}
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
    backgroundColor: "#0f893b"
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
    borderRadius: 4,

  },
  text: {
    color: "white",
    fontSize: 16,
  },
  card: {
    borderRadius: 10,
    display: "flex",
    padding: 40,
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,
  }
})


