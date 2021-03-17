import React, { useRef, useState, createRef, } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image
} from 'react-native';
import { Link } from "react-router-native";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Spinner, Item, Input, Label } from 'native-base';
import URL from '../../core/index';
import axios from "axios";
import styles from '../../assets/global-styles/globalStyles';


import { useGlobalStateUpdate } from "../../context/context";

export default function Signin() {

  const [loading, setLoading] = useState(false);
  const globalStateUpdate = useGlobalStateUpdate();

  const loginSchema = Yup.object().shape({
    password: Yup.string()
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
  });

  const signInNow = ({ email, password }) => {
    setLoading(true);
    console.log({email , password});
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
      setLoading(false);
    }).catch((err) => {
      alert(err.response.data.message)
      setLoading(false);
    })
  }

  return (


    <View style={styles.wholeScreen}>
      <View style={{  flex:3 , alignSelf:'center' }}>
        <Image style={{width:300 , height:250 }}source={require('../../assets/images/envycle-demo.png')}
        >
        </Image>
      </View>
    <View style={{flex:6}}>
      <View style={styles.modalCard}>
        <Formik
          validationSchema={loginSchema}
          initialValues={{ email: '', password: '' }}
          onSubmit={values => signInNow(values)}
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
                  placeholder={'Enter your password'}
                />
              </Item>
              {loading ? <Spinner />
                :
                <Pressable
                  style={[styles.button, styles.buttonClose, { marginTop: 20 }]}
                  onPress={handleSubmit}
                >
                  <Text style={styles.textStyle}>Login</Text>
                </Pressable>

              }

              <View style={{ marginTop: 20 , alignSelf:'center' , fontSize:8 }}>
                <Link to="/signup">
                  <Text>
                    Create an account
                    </Text></Link>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </View>
    </View>
  );
}


