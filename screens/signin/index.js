import React, { useRef, useState, createRef, } from 'react';

import {
  TouchableWithoutFeedback,
  View,
  Text,
  Pressable,
  Image
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Spinner, Item, Input, Label } from 'native-base';
import URL from '../../core/index';
import axios from "axios";
import styles from '../../assets/global-styles/globalStyles';
import Button from '../../components/Button';
import { useGlobalStateUpdate } from "../../context/context";
import { KeyboardAvoidingView } from 'react-native';

export default function Signin({ navigation }) {

  const [loading, setLoading] = useState(false);
  const globalStateUpdate = useGlobalStateUpdate();

  const loginSchema = Yup.object().shape({
    password: Yup.string()
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
  });

  const signInNow = ({ email, password }) => {
    console.log('url is ', URL);
    setLoading(true);
    axios({
      method: "post",
      url: `${URL}/auth/login`,
      data: {
        userEmail: email.toLowerCase(),
        userPassword: password
      },
    }).then((response) => {
      globalStateUpdate(prev => ({
        ...prev, loginStatus: true, user: {
          userEmail: response.data.user.userEmail,
          userName: response.data.user.userName,
          points: response.data.user.points,
        }, role: response.data.user.role,
      }));
    }).catch((err) => {
      console.log('error', err);
      // alert(err.response.data.message)
      setLoading(false);
    })
  }

  return (

    <KeyboardAvoidingView
      behavior='padding'
    >

      <View style={styles.wholeScreen}>
        <View style={{ flex: 3, alignSelf: 'center' }}>
          <Image style={{ width: 300, height: 250 }} source={require('../../assets/images/envycle-demo.png')}
          >
          </Image>
        </View>
        <View style={{ flex: 6 }}>
          <View style={styles.modalCard}>
            <Formik
              validationSchema={loginSchema}
              initialValues={{ email: '', password: '' }}
              onSubmit={values => signInNow(values)}
            >
              {({ handleChange, setFieldTouched, touched, handleSubmit, values, errors, isValid }) => (
                <View>
                  {touched.email &&
                    <Label style={{ fontSize: 10, color: 'red' }}>{errors.email}</Label>
                  }
                  <Item stackedLabel last>
                    <Input
                      onChangeText={handleChange('email')}
                      onBlur={() => setFieldTouched('email')}
                      value={values.email}
                      placeholder={'Enter your email'}
                    />
                  </Item>
                  <Item stackedLabel last
                  >
                    {touched.password &&
                      <Label style={{ fontSize: 10, color: 'red' }}>{errors.password}</Label>
                    }
                    <Input
                      onChangeText={handleChange('password')}
                      onBlur={() => setFieldTouched('password')}
                      value={values.password}
                      secureTextEntry={true}
                      placeholder={'Enter your password'}
                    />
                  </Item>
                  {loading ? <Spinner />
                    :
                    <Button

                      onPress={handleSubmit}
                      title={'Login'}
                    >

                    </Button>

                  }
                  <View style={{ marginTop: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

                    <TouchableWithoutFeedback
                      onPress={() => navigation.navigate('ForgotPassword')}
                      style={{ marginTop: 20, alignSelf: 'center', fontSize: 8 }}>
                      <Text>
                        Forgot Password?
                      </Text>
                    </TouchableWithoutFeedback>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}


