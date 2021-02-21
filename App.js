/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

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

const App: () => React$Node = () => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.input_container}>
          <Card>
            <Card.Title>Login</Card.Title>
            <TextInput
              style={styles.input}
              type="email" placeholder={'Enter your email'}
            />
            <Card.Divider />
            <TextInput
              style={styles.input}
              placeholder={"Enter your password"}
            />
            <TouchableOpacity style={styles.button}>
              <Text style={styles.text}>Login</Text>
            </TouchableOpacity>
          </Card>
        </View>
      </View>

    </>
  );
};

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
    backgroundColor:"#014732"
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

export default App;
