import React, { useRef, useState, createRef, } from 'react';

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { NativeRouter, Route, Link } from "react-router-native";


import { Card } from "react-native-elements";

import URL from '../../core/index';

import axios from "axios";


export default function Signup() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [message, setMessage] = useState('Signup');

    const handleEmail = (e) => {
        setEmail(e);

    }
    const handleName = (e) => {
        setName(e);
    }
    const handlePassword = (e) => {
        setPassword(e);
    }

    const getStarted = () => {
        console.log({ email, name, URL });
        axios({
            method: 'post',
            url: URL + "/auth/signup",
            data: {
                userName: name,
                userEmail: email.toLowerCase(),
                userPassword: password,
                gender: "male",
            },
        }).then((response) => {
            console.log("response", response);
            setMessage('Signed up successfully');
        }, (error) => {
            console.log('error is=>', error);
            setMessage(error.response.data.message)
        })
    }


    return (

        <View style={styles.container}>
            <View style={styles.input_container}>
                <Card>
                    <Link
                        to="/"
                        underlayColor="#f0f4f7"
                        style={styles.navItem}
                    >
                        <Text>Signin</Text>
                    </Link>
                    <Card.Title>{message}</Card.Title>
                    <TextInput
                        style={styles.input}
                        placeholder={'Enter your Name'}
                        onChangeText={(e) => handleName(e)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder={'Enter your email'}
                        onChangeText={(e) => handleEmail(e)}
                    />
                    <Card.Divider />
                    <TextInput
                        style={styles.input}
                        placeholder={"Enter your password"}
                        onChangeText={(e) => handlePassword(e)}
                    />
                    <Card.Divider />
                    <TouchableOpacity style={styles.button}
                        onPress={() => getStarted()}
                    >
                        <Text style={styles.text}>Signup</Text>
                    </TouchableOpacity>
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


