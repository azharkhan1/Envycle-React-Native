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
import { useGlobalState, useGlobalStateUpdate } from '../context/context';



export default function Materials() {

    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    const [materials, setMaterials] = useState();
    const [cart, setCart] = useState([]);
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
    }, []);

    // const addMaterial = (index) => {
    //     var old_materials = [...materials];
    //     old_materials[index].added = true,
    //         setMaterials(old_materials);
    //     console.log('selected material ', materials[index]);
    //     globalStateUpdate((prevValue) => ({ ...prevValue, cart: [...globalState.cart, materials[index]], role: 'haha' }));
    //     // globalStateUpdate((prevValue) => ({ ...prevValue, loginStatus: false }))
    // }


    function addQty(index) {
        var prevMaterials = [...materials];
        prevMaterials[index].quantity = prevMaterials[index].quantity + 5;
        console.log('materisl=>', materials[index]);
        setMaterials(prevMaterials);
    }
    function removeQty(index) {
        var prevMaterials = [...materials];
        prevMaterials[index].quantity = prevMaterials[index].quantity - 5;
        console.log('materisl=>', materials[index]);
        setMaterials(prevMaterials);
    }
    return (
        <View style={styles.container}>
            <ScrollView>
                {loading ? <Spinner /> :
                    <>
                        {materials.map(({ name, quantity, url }, index) => {
                            return <View style={styles.cardContainer}>
                                <View style={styles.card} key={index}>
                                    <Thumbnail source={{ uri: url }}></Thumbnail>
                                    <Text>{name}</Text>
                                    <Text style={styles.input}>{quantity}</Text>
                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                        <TouchableOpacity style={styles.myButton} onPress={() => addQty(index)}>
                                            <ImageBackground
                                                source={require('../assets/images/add.png')}
                                                style={{ height: 24, width: 24, }}
                                            >
                                                <Text style={{ color: 'white', fontSize: 18 }}></Text >

                                            </ImageBackground>

                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.myButton} onPress={quantity > 0 ? () => removeQty(index) : () => { return }}>
                                            <ImageBackground
                                                source={require('../assets/images/minus.png')}
                                                style={{ height: 24, width: 24, position: 'relative', top: 10 }}
                                            >
                                            </ImageBackground>
                                        </TouchableOpacity>
                                    </View>
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
                                <Form>
                                    <Item stackedLabel>
                                        <Label>Address</Label>
                                        <Input />
                                    </Item>
                                    <Item stackedLabel last>
                                        <Label>Phone Number</Label>
                                        <Input />
                                    </Item>
                                    <Textarea rowSpan={4} style={{ width: '100%', marginBottom: 10 }} bordered placeholder=" Enter your message" />
                                    <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(!modalVisible)}>
                                        <Text style={{ color: 'white', fontSize: 18 }}>Close</Text >
                                    </TouchableOpacity>

                                </Form>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Text style={styles.textStyle}>Place Request</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                    <Pressable
                        style={[styles.button, styles.buttonOpen]}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={styles.textStyle}>CheckOut</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = new StyleSheet.create({

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
        width: 45,
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

    card: {
        display: 'flex',
        backgroundColor: 'white',
        padding: 20,
        padding: 40,
        shadowOpacity: 0.48,
        shadowRadius: 11.95,
        elevation: 18,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    cardContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',

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