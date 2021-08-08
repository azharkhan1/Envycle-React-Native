import React, { useState, } from 'react';

import {

    View,
    Image,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Spinner, Item, Input, Label, } from 'native-base';
import styles from '../../assets/global-styles/globalStyles';
import URL from '../../core/index';
import axios from "axios";
import Button from '../../components/Button';
import { KeyboardAvoidingView } from 'react-native';


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
        <KeyboardAvoidingView
            behavior='position'
            keyboardVerticalOffset={-80}
        >
            <View style={styles.wholeScreen}>
                <View style={{ flex: 1, alignSelf: 'center' }}>
                    <Image style={{ width: 300, height: 250 }} source={require('../../assets/images/envycle-demo.png')}
                    >
                    </Image>
                </View>
                <View style={{ flex: 6 }}>
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
                                        <Button
                                            style={{ backgroundColor: '#00868B', }}
                                            title={'Register'}
                                            onPress={handleSubmit}
                                        />


                                    }



                                </View>
                            )}

                        </Formik>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}


