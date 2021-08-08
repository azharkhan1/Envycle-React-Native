import React, { useState, } from 'react';

import {

    View,
    Text,
    Alert,
    Pressable,
    Image,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Spinner, Item, Input, Label, } from 'native-base';
import styles from '../../assets/global-styles/globalStyles';
import URL from '../../core/index';
import axios from "axios";
import Button from '../../components/Button';

export default function ForgotPassword({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [email, setForgotEmail] = useState();
    const [forgot, setForgot] = useState(false);

    const forgotEmail = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
    });

    const setPassword = Yup.object().shape({
        password: Yup.string()
            .min(3, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        otp: Yup.string().required()
    });

    function forgot_password({ email }) {
        axios({
            method: 'post',
            url: `${URL}/auth/forget-password`,
            data: {
                userEmail: email,

            },
        }).then((response) => {
            Alert.alert('Notification', 'Check your email')
            setForgotEmail(email);
            setForgot(true);
        }, (error) => {
            setForgot(false);
            Alert.alert('Notification', 'Error or email does not exist')
        })
    }
    function resetPassword({ otp, password }) {

        console.log('forgot email=>', email);
        axios({
            method: 'post',
            url: URL + "/auth/forget-password-step-2",
            data: {
                userEmail: email,
                otp: otp,
                newPassword: password,
            },
        }).then((response) => {
            Alert.alert('Notification', 'Password changed successfully!');
            navigation.navigate('Login')

        }, (error) => {
            Alert.alert('Notification', "Wrong OTP or error");
        })
    }


    return (
        <View style={styles.wholeScreen}>
            <View style={{ flex: 3, alignSelf: 'center' }}>
                <Image style={{ width: 300, height: 250 }} source={require('../../assets/images/envycle-demo.png')}
                >
                </Image>
            </View>
            <View style={{ flex: 6 }}>
                <View style={styles.modalCard}>
                    {forgot ?
                        <Formik
                            validationSchema={setPassword}
                            initialValues={{ otp: '', password: ' ' }}
                            onSubmit={values => resetPassword(values)}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
                                <View>

                                    {errors.otp &&
                                        <Label style={{ fontSize: 10, color: 'red' }}>{errors.otp}</Label>
                                    }
                                    <Item stackedLabel last>
                                        <Input
                                            onChangeText={handleChange('otp')}
                                            onBlur={handleBlur('otp')}
                                            value={values.otp}
                                            placeholder={'Enter otp code'}
                                        />
                                    </Item>

                                    {errors.password &&
                                        <Label style={{ fontSize: 10, color: 'red' }}>{errors.password}</Label>
                                    }
                                    <Item stackedLabel last>
                                        <Input
                                            onChangeText={handleChange('password')}
                                            onBlur={handleBlur('password')}
                                            value={values.password}
                                            placeholder={'Enter New Password'}
                                            secureTextEntry={true}
                                        />
                                    </Item>
                                    {loading ? <Spinner />
                                        :
                                        <Button
                                            title={'Proceed'}
                                            onPress={handleSubmit}
                                        >

                                        </Button>

                                    }



                                </View>
                            )}
                        </Formik>
                        :
                        <Formik
                            validationSchema={forgotEmail}
                            initialValues={{ email }}
                            onSubmit={values => forgot_password(values)}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
                                <View>

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
                                    {loading ? <Spinner />
                                        :
                                        <Button
                                            title={'Proceed'}
                                            onPress={handleSubmit}
                                        />



                                    }



                                </View>
                            )}

                        </Formik>

                    }

                </View>
            </View>
        </View>
    );
}


