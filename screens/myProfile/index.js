import React, { useEffect, useState } from 'react';
import { Spinner, Container, Header, Content, Card, CardItem, Text, Body, Button, Item, Label, Input } from 'native-base';
import { useGlobalState, useGlobalStateUpdate } from '../../context/context';
import { View } from 'react-native';
import axios from 'axios';
import url from '../../core/index';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Cookie from 'react-native-cookie'
import { useHistory } from 'react-router-native';

export default function MyProfile() {
    const globalState = useGlobalState();
    const globalStateUpdate = useGlobalStateUpdate();
    const [password, setPassword] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const history = useHistory();
    const changePassword = Yup.object().shape({
        newPassword: Yup.string()
            .min(3, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        oldPassword: Yup.string()
            .required('Required'),
    });

    const updatePassword = ({ oldPassword, newPassword }) => {
        setSpinner(true);
        axios({
            method: 'post',
            url: `${url}/update-password`,
            data: {
                newPassword: newPassword,
                oldPassword: oldPassword,
            },
        }).then((response) => {
            alert(response.data.message)
            setPassword(!password);
            setSpinner(false);
        }).catch((err) => {
            alert(err.response.data.message);
            setSpinner(false);
        })
    }

    function logout() {
        axios({
            method: 'post',
            url: `${url}/logout`
        }).then((response) => {
            Cookie.clear();
            globalStateUpdate((prevValue) => ({ ...prevValue, loginStatus: false, user: null, role: null }));
            history.push('/');
        }, (error) => {
            console.log("error=>", error);
        })
    }
    return (
        <Container style={{ backgroundColor: '#00868B', }}>
            {/* <Header /> */}
            <Content padder>
                <Card>
                    <CardItem header bordered>
                        <Text>Welcome , {globalState.user.userName}</Text>
                    </CardItem>
                    <CardItem bordered>
                        <Body>
                            <Text>
                                Points: {globalState.user.points}
                            </Text>
                            <Text>
                                Email: {globalState.user.userEmail}
                            </Text>
                            {password ? <Text></Text> : <Button style={{ marginTop: 20 }} onPress={() => setPassword(!password)} primary><Text> Update Password </Text></Button>}
                            {password ? <Formik
                                validationSchema={changePassword}
                                initialValues={{ newPassword: '', oldPassword: '' }}
                                onSubmit={values => updatePassword(values)}
                            >
                                {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
                                    <View>
                                        <Item stackedLabel>
                                            {errors.oldPassword &&
                                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.oldPassword}</Text>
                                            }
                                            <Input
                                                onChangeText={handleChange('oldPassword')}
                                                onBlur={handleBlur('oldPassword')}
                                                value={values.oldPassword}
                                                placeholder={'Enter your old password'}
                                                secureTextEntry={true}
                                            />
                                        </Item>
                                        <Item stackedLabel>
                                            {errors.newPassword &&
                                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.newPassword}</Text>
                                            }
                                            <Input
                                                onChangeText={handleChange('newPassword')}
                                                onBlur={handleBlur('newPassword')}
                                                value={values.newPassword}
                                                placeholder={'Enter your new password'}
                                                secureTextEntry={true}
                                            />
                                        </Item>
                                        {spinner ? <Spinner /> : <Button style={{ marginTop: 20 }} onPress={handleSubmit} primary><Text> Change Password </Text></Button>}
                                        <Button style={{ marginTop: 20 }} onPress={() => setPassword(!password)} danger><Text> Cancel </Text></Button>

                                    </View>
                                )}
                            </Formik> : <Text></Text>}
                        </Body>
                    </CardItem>
                    <CardItem footer bordered>
                        <Button transparent
                            onPress={logout}
                        >
                            <Text>Logout</Text>
                        </Button>
                    </CardItem>
                </Card>
            </Content>
        </Container >

    );

}