import React, { useRef, useState, createRef, } from 'react';

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Alert, Pressable,
} from 'react-native';
import { NativeRouter, Route, Link } from "react-router-native";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Container, Spinner, Thumbnail, Form, Item, Input, Label, Textarea, Content } from 'native-base';

import URL from '../../core/index';

import axios from "axios";


export default function Signup() {



    const SignupSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
    });

    const getStarted = ({ email, name, password }) => {
        axios({
            method: 'post',
            url: URL + "/auth/signup",
            data: {
                userName: name,
                userEmail: email.toLowerCase(),
                userPassword: password,
            },
        }).then((response) => {
            console.log("response", response);
        }, (error) => {
            console.log('error is=>', error);

        })
    }


    return (

        <View style={styles.wholeScreen}>
            <View style={styles.modalCard}>
                <Formik
                    validationSchema={SignupSchema}
                    initialValues={{ name: '', email: '', password: '' }}
                    onSubmit={values => getStarted(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
                        <View>
                            {errors.name &&
                                <Label style={{ fontSize: 10, color: 'red' }}>{errors.name}</Label>
                            }
                            <Item stackedLabel>
                                <Input
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    value={values.name}
                                    placeholder={'Enter your full name'}
                                />
                            </Item>
                            {errors.email &&
                                <Label style={{ fontSize: 10, color: 'red' }}>{errors.email}</Label>
                            }
                            <Item stackedLabel last>
                                <Input
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    placeholder={'Enter your email'}
                                />
                            </Item>
                            <Item stackedLabel last
                            >
                                {errors.password &&
                                    <Label style={{ fontSize: 10, color: 'red' }}>{errors.password}</Label>
                                }
                                <Input
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    placeholder={'Enter your password'}

                                />
                            </Item>
                            <Pressable

                                style={[styles.button, styles.buttonClose, { marginTop: 20 }]}
                                onPress={handleSubmit}
                            >
                                <Text style={styles.textStyle}>Signup </Text>
                            </Pressable>
                            <View style={{ marginTop: 20 }}>
                                <Link to="/">
                                    <Text>
                                        Already member? Signin
                            </Text></Link>
                            </View>

                        </View>
                    )}

                </Formik>
            </View>
        </View>
    );
}


const styles = new StyleSheet.create({

    cardContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        flex: 1,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,


    },

    closeBtn: {
        width: 20,
        height: 20,
        backgroundColor: 'black',
        position: 'absolute',
        right: -30,
        top: -30,
    },
    wholeScreen: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
    },
    modalCard: {
        display: 'flex',
        backgroundColor: 'white',
        padding: 20,
        padding: 40,
        shadowOpacity: 0.48,
        shadowRadius: 11.95,
        elevation: 18,
        width: '99%',
        borderTopColor: 'blue',
        borderWidth: 1,
        borderRadius: 25,
    },

    myButton: {
        width: 55,
        height: 30,
        backgroundColor: "#014732",
        color: "white",
        textAlign: "center",
        fontSize: 16,
        marginTop: 40,
        borderRadius: 0,
        position: 'relative',
        bottom: 10,
        marginLeft: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },



    centeredView: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        flexDirection: 'column',

    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
})