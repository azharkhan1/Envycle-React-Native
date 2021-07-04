import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Modal
} from 'react-native'
import { Spinner } from 'native-base';
import { useGlobalState, useGlobalStateUpdate } from '../../context/context';
import axios from 'axios';
import url from '../../core/index';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Cookie from 'react-native-cookie'
import ListItem from '../../components/ListItem';
import Icon from '../../components/Icon'
import ListItemSeperator from '../../components/ListItemSeperator.js'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Input } from 'react-native-elements';
import Button from '../../components/Button';


const ValidationSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .required('Required'),
  newPassword: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),

});



export default function MyProfile({ navigation }) {

  const [modalVisible, setModalVisible] = useState(false);

  const globalState = useGlobalState();
  const globalStateUpdate = useGlobalStateUpdate();
  const [spinner, setSpinner] = useState(false);


  const userInfo = [
    {
      title: globalState.user.userName,
      icon: {
        name: "account",
        backgroundColor: 'tomato',
      },
    },
    {
      title: globalState.user.userEmail,
      icon: {
        name: "email",
        backgroundColor: '#00868B',
      },

    },
    {
      title: `Points ${globalState.user.points}`,
      icon: {
        name: "star-four-points",
        backgroundColor: '#00868B',
      },

    },

  ];



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
      setSpinner(false);
      setModalVisible(!modalVisible)
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
    }, (error) => {
      console.log("error=>", error);
    })
  }

  return (

    <View style={styles.container} >
      <FlatList
        style={{ marginBottom: 20 }}
        data={userInfo}
        keyExtractor={(userInfo) => userInfo.title}
        ItemSeparatorComponent={ListItemSeperator}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            IconComponent={
              <Icon
                name={item.icon.name}
                backgroundColor={item.icon.backgroundColor}
              />
            }
          />
        )}
      />
      <ListItem
        title="Change Password"
        IconComponent={<Icon name="lock" backgroundColor="purple" />}
        onPress={() => setModalVisible(true)}
      />
      <ListItem
        title="Logout"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={() => logout()}
      />


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}

        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modal}>
          <MaterialCommunityIcons name='close' size={30} color='black' style={{ position: 'absolute', top: 10, right: 10 }}
            onPress={() => setModalVisible(!modalVisible)}
          />

          <Text style={{ marginVertical: 20, fontSize: 18, fontWeight: 'bold', color: 'black', alignSelf: 'center' }}>Change password</Text>

          <Formik
            initialValues={{ oldPassword: '', newPassword: '' }}
            validationSchema={ValidationSchema}
            onSubmit={updatePassword}
          >
            {({ handleChange, handleSubmit, values, errors, touched, setFieldTouched, }) => (
              <>
                <Input
                  placeholder={'Enter Previous Password'}
                  leftIcon={<MaterialCommunityIcons name={'lock'} size={20} color={'purple'} />}
                  secureTextEntry
                  value={values.oldPassword}
                  onBlur={() => setFieldTouched('oldPassword')}
                  onChangeText={handleChange('oldPassword')}
                />
                {touched.oldPassword && <Text style={styles.error}>{errors.oldPassword}</Text>}
                <Input
                  placeholder={'Enter New Password'}
                  leftIcon={<MaterialCommunityIcons name={'lock'} size={20} color={'#ffe66d'} />}
                  secureTextEntry
                  value={values.newPassword}
                  onBlur={() => setFieldTouched('newPassword')}
                  onChangeText={handleChange('newPassword')}
                />
                {touched.newPassword && <Text style={styles.error}>{errors.newPassword}</Text>}

                {spinner ? <Spinner /> : <Button title={'Update Password'} onPress={handleSubmit} />}
              </>
            )}




          </Formik>

        </View>
      </Modal>


    </View>

  )

}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'gray',
  },

  modal: {
    display: 'flex',
    backgroundColor: 'white',
    flex: 1,
    padding: 20,
  },
  inputContainer: {

  },
  error: {
    fontSize: 12,
    color: 'red',
    bottom: 20,
    left: 5,
  }
});