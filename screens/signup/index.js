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
import styles from '../../assets/global-styles/globalStyles';
import URL from '../../core/index';
import axios from "axios";


export default function Signup() {

    const [loading, setLoading] = useState(false);

    const SignupSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        password: Yup.string()
            .min(3, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
    });

    const getStarted = ({ email, name, password }) => {
        setLoading(true);
        axios({
            method: 'post',
            url: URL + "/auth/signup",
            data: {
                userName: name,
                userEmail: email.toLowerCase(),
                userPassword: password,
            },
        }).then((response) => {
            alert(response.data.message)
            console.log("response", response);
            setLoading(false);
        }, (error) => {
            console.log('error is=>', error);
            setLoading(false);
            alert(error.response.data.message)

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
                                    secureTextEntry={true}
                                    placeholder={'Set your password'}

                                />
                            </Item>
                            {loading ? <Spinner />
                                :
                                <Pressable

                                    style={[styles.button, styles.buttonClose, { marginTop: 20 }]}
                                    onPress={handleSubmit}
                                >
                                    <Text style={styles.textStyle}>Signup </Text>
                                </Pressable>

                            }

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


