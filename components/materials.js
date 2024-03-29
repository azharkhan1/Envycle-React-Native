import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Alert, Modal, Pressable,
    Text,
    TouchableOpacity,
} from 'react-native';
import { H3, Card, CardItem, Spinner, Thumbnail, Item, Input, Label, Textarea } from 'native-base';
import axios from 'axios'
import url from "../core/index";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Icon } from 'react-native-elements';
import Button from '../components/Button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const placeRequestSchema = Yup.object().shape({
    address: Yup.string()
        .min(6, 'Enter Valid Address')
        .required('Required'),
    phoneNo: Yup.string()
        .required('Required')
        .min(11, 'Enter valid phone Number')
    ,
});




export default function Materials() {

    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [materials, setMaterials] = useState();
    const [total, setTotal] = useState(0);
    const [change, setChange] = useState(true);
    const [spinner, setSpinner] = useState(false);

    useEffect(() => {
        axios({
            method: 'get',
            url: `${url}/get-materials`,
        }).then((res) => {
            res.data.materials.map((value, index) => {
                value.quantity = 0;
            })
            setMaterials(res.data.materials);
            setLoading(false);
        }).catch((err) => {
            setLoading(true);
        })
    }, [change]);




    function addQty(index) {
        var prevMaterials = [...materials];
        prevMaterials[index].quantity = prevMaterials[index].quantity + 5;
        setMaterials(prevMaterials);
        var totalQuantity = 0;
        materials.map((value => {
            totalQuantity += value.quantity;
        }))
        setTotal(totalQuantity)

    }
    function removeQty(index) {
        var prevMaterials = [...materials];
        prevMaterials[index].quantity = prevMaterials[index].quantity - 5;
        var sum = 0;
        setMaterials(prevMaterials);
        var totalQuantity = 0;
        materials.map((value => {
            totalQuantity += value.quantity;
        }))
        setTotal(totalQuantity)

    }
    const placeRequest = (formValue) => {
        var { address, remarks, phoneNo } = formValue;
        var totalQuantity = 0;
        materials.map((value => {
            totalQuantity += value.quantity;
        }))

        var materialToSend = materials.filter((value) => {
            if (value.quantity > 0) {
                return value
            }
        })
        setSpinner(true);
        axios({
            method: 'post',
            url: `${url}/place-order`,
            data: {
                cart: materialToSend,
                address: address,
                phoneNo: phoneNo,
                quantity: totalQuantity,
                remarks: remarks,
            },

        }).then((response) => {
            Alert.alert('Notification', 'Your request has been placed!')
            setTotal(0)
            setModalVisible(!modalVisible);
            setChange(!change);
            setSpinner(false)
        }, (error) => {
            // console.log("an error occured");
            Alert.alert('An error occured, Please try again');
            setSpinner(false)
        })
    }

    return (


        <ScrollView >
            {loading ? <Spinner /> :

                <Card >
                    <CardItem bordered style={{ marginBottom: 10, backgroundColor: 'white', justifyContent: 'center' }} >
                        <H3 style={{ color: 'white', alignSelf: 'center' }}>Place Request</H3>
                    </CardItem>
                    <View style={styles.container}>
                        {materials.map(({ name, quantity, url }, index) => {
                            return <View key={index} style={styles.cardContainer}>
                                <Thumbnail source={{ uri: url }}></Thumbnail>
                                <Text style={styles.text}>{name}</Text>
                                <Text style={styles.input}>{quantity}</Text>
                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                    <TouchableOpacity style={styles.myButton} onPress={() => addQty(index)}>
                                        <MaterialCommunityIcons name='plus-circle' color='tomato' size={40} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.myButton} onPress={quantity > 0 ? () => removeQty(index) : () => { return }}>
                                        <MaterialCommunityIcons name='minus-circle' color='tomato' size={40} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        })}
                    </View>
                    {loading ? null :
                        <Button
                            onPress={total >= 20 ? () => setModalVisible(true) : () => { return }}
                            title={total >= 20 ? 'Checkout' : 'Minimum 20kg to place request'}
                        />

                    }
                </Card>

            }
            <View style={styles.centeredView}>
                <Modal

                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >

                    <View style={styles.modalCard}>
                        <Formik
                            validationSchema={placeRequestSchema}
                            initialValues={{ address: '', remarks: '', phoneNo: '' }}
                            onSubmit={values => placeRequest(values)}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
                                <View>
                                    <Item stackedLabel
                                        style={{ marginVertical: 10 }}
                                    >

                                        <Input
                                            onChangeText={handleChange('address')}
                                            onBlur={handleBlur('address')}
                                            value={values.address}
                                            placeholder="Enter Address"


                                        />
                                        {errors.address &&
                                            <Text style={{ fontSize: 10, color: 'red', alignSelf: 'flex-start', top: 15, }}>{errors.address}</Text>
                                        }

                                    </Item>
                                    <Item stackedLabel last
                                        style={{ marginVertical: 10 }}
                                    >

                                        <Input
                                            onChangeText={handleChange('phoneNo')}
                                            onBlur={handleBlur('phoneNo')}
                                            value={values.phoneNo}
                                            placeholder="Enter Phone Number"

                                        />
                                        {errors.phoneNo &&
                                            <Text style={{ fontSize: 10, color: 'red', alignSelf: 'flex-start', top: 15 }}>{errors.phoneNo}</Text>
                                        }

                                    </Item>

                                    <Textarea rowSpan={4} style={{ width: '100%', marginTop: 20, marginBottom: 30, }} bordered placeholder=" Enter your message"
                                        onChangeText={handleChange('remarks')}
                                        onBlur={handleBlur('remarks')}
                                        value={values.remarks}

                                    />
                                    <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(!modalVisible)}>
                                        <Icon name='close' color='black' />
                                    </TouchableOpacity>
                                    {spinner ? <Spinner /> :
                                        <Pressable
                                            style={[styles.button, styles.buttonClose]}
                                            onPress={handleSubmit}
                                        >
                                            <Text style={styles.textStyle}>Place Request</Text>
                                        </Pressable>
                                    }
                                </View>
                            )}

                        </Formik>
                    </View>

                </Modal>
            </View>
        </ScrollView>

    )
}

const styles = new StyleSheet.create({

    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        alignItems: 'center',
        padding: 2,
    },
    cardContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexShrink: 1,
        padding: 10,
        alignSelf: 'center',
        borderRadius: 18,
        borderWidth: 2,
        borderColor: 'black',
        margin: 2,
        padding: 10,

    },

    closeBtn: {
        width: 20,
        height: 20,
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
        width: '100%',
        height: '100%'
    },
    input: {
        width: 80,
        height: 20,
        borderWidth: 1,
        textAlign: 'center',
        borderRadius: 3,
        color: 'black',
        marginTop: 5,
    },
    myButton: {
        width: 55,

        textAlign: "center",
        fontSize: 16,
        marginTop: 20,
        borderRadius: 10,
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
        elevation: 2
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
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 5,
    }
})