import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Alert, Modal, Pressable,
    Text,
    TouchableOpacity, ImageBackground,
} from 'react-native';
import { Container, Spinner, Thumbnail, Form, Item, Input, Label, Textarea, Content } from 'native-base';
import axios from 'axios'
import url from "../core/index";
import { Formik } from 'formik';
import * as Yup from 'yup';

import { useGlobalState, useGlobalStateUpdate } from '../context/context';



export default function Materials() {

    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [materials, setMaterials] = useState();
    const [total, setTotal] = useState(0);
    const [change, setChange] = useState(true);
    const globalStateUpdate = useGlobalStateUpdate();
    const globalState = useGlobalState();

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

    const placeRequestSchema = Yup.object().shape({
        address: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        phoneNo: Yup.string()
            .required('Required'),
    });



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
        console.log('material to send', materialToSend);

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
            alert('your request has been palced');
            materials.map((value, index) => {
                value.quantity = 0;
            })
            setChange(!change);
        }, (error) => {
            // console.log("an error occured");
            alert('An error occured');
        })



    }

    return (
        <View style={styles.container}>
            <ScrollView>
                {loading ? <Spinner /> :
                    <>
                        {materials.map(({ name, quantity, url }, index) => {
                            return <View style={styles.cardContainer} key={index}>
                                <Thumbnail source={{ uri: url }}></Thumbnail>
                                <Text>{name}</Text>
                                <Text style={styles.input}>{quantity}</Text>
                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                    <TouchableOpacity style={styles.myButton} onPress={() => addQty(index)}>
                                        <ImageBackground
                                            source={require('../assets/images/add.png')}
                                            style={{ height: 18, width: 18, }}
                                        >
                                            <Text style={{ color: 'white', fontSize: 18 }}></Text >
                                        </ImageBackground>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.myButton} onPress={quantity > 0 ? () => removeQty(index) : () => { return }}>
                                        <ImageBackground
                                            source={require('../assets/images/minus.png')}
                                            style={{ height: 18, width: 18, position: 'relative', top: 8 }}
                                        >
                                        </ImageBackground>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        })}
                    </>


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
                        <View style={styles.wholeScreen}>
                            <View style={styles.modalCard}>
                                <Formik
                                    validationSchema={placeRequestSchema}
                                    initialValues={{ address: '', remarks: '', phoneNo: '' }}
                                    onSubmit={values => placeRequest(values)}
                                >
                                    {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
                                        <View>
                                            <Item stackedLabel>
                                                <Label>Address</Label>
                                                {errors.address &&
                                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.address}</Text>
                                                }
                                                <Input
                                                    onChangeText={handleChange('address')}
                                                    onBlur={handleBlur('address')}
                                                    value={values.address}
                                                />
                                            </Item>
                                            <Item stackedLabel last>
                                                <Label>Phone Number</Label>
                                                {errors.phoneNo &&
                                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.phoneNo}</Text>
                                                }
                                                <Input
                                                    onChangeText={handleChange('phoneNo')}
                                                    onBlur={handleBlur('phoneNo')}
                                                    value={values.phoneNo}
                                                />
                                            </Item>

                                            <Textarea rowSpan={4} style={{ width: '100%', marginBottom: 10 }} bordered placeholder=" Enter your message"
                                                onChangeText={handleChange('remarks')}
                                                onBlur={handleBlur('remarks')}
                                                value={values.remarks}

                                            />
                                            <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(!modalVisible)}>
                                                <Text style={{ color: 'white', fontSize: 18 }}>Close</Text >
                                            </TouchableOpacity>
                                            <Pressable
                                                style={[styles.button, styles.buttonClose]}
                                                onPress={handleSubmit}
                                            >
                                                <Text style={styles.textStyle}>Place Request</Text>
                                            </Pressable>
                                        </View>
                                    )}

                                </Formik>
                            </View>
                        </View>
                    </Modal>
                    <Pressable
                        style={[styles.button, styles.buttonOpen]}
                        onPress={total >= 20 ? () => setModalVisible(true) : () => { return }}
                    >
                        <Text style={styles.textStyle}>{total >= 20 ? 'Checkout' : 'Minimum 20kg to place request'}</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    )
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
        width: '100%',
    },
    input: {
        width: 80,
        height: 20,
        borderWidth: 1,
        textAlign: 'center',
        borderRadius: 3,
        color: 'black',
    },
    myButton: {
        width: 55,
        height: 30,
        backgroundColor: "#014732",
        color: "white",
        textAlign: "center",
        fontSize: 16,
        marginTop: 20,
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
    }
})