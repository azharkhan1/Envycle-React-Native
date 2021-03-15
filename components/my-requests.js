import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from "react-native"
import { Container, Header, Content, Card, CardItem, Text, Body, Button, Left, Right } from "native-base";
import { Spinner } from "native-base"
import url from "../core/index";
import axios from 'axios';




export default function myRequests() {
    const [myRequests, setMyRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [change, handleChange] = useState(true);

    useEffect(() => {
        let arr = [];
        axios({
            method: 'get',
            url: `${url}/getOrders`,
        }).then((response) => {
            response.data.placedRequests.map((value) => {
                if (value.status === 'Pending') {
                    arr.push(value);
                }
            })
            setMyRequests(arr);
        }, (error) => {
            console.log("an error occured");
        })
        socket.on('requests', (data) => {
            setRealTime(!realTime);
        })
    }, [realTime])

    const deleteOrder = (id) => {
        axios({
            method: 'delete',
            url: `${url}/delete-order`,
            data: {
                id: id,
            },
        }).then((response) => {
            alert(response.data.message);
            handleChange(!change);
        }).catch((error) => {
            alert('server error');
        })
    }
    return (
        <Container>

            {loading ? <Spinner /> :
                <Container>
                    <ScrollView>
                        <Content padder>
                            {myRequests.map(({ phoneNo, cart, address, status, _id }, index) => {
                                return <Card key={index}>
                                    <CardItem bordered  >
                                        <Text >Status: <Text>{status}</Text></Text>
                                    </CardItem>
                                    <CardItem bordered>
                                        {cart.map(({ product, quantity }, index) => {
                                            return <Body key={index}>
                                                <CardItem bordered>
                                                    <Text>
                                                        Product: {product} x {quantity} kg
                                                </Text>
                                                </CardItem>
                                            </Body>
                                        })}

                                    </CardItem>
                                    <CardItem footer bordered>
                                        {status === 'Pending' ?
                                            < Button onPress={() => deleteOrder(_id)} danger><Text>Cancel Request </Text></Button>
                                            : <></>
                                        }
                                    </CardItem>
                                </Card>




                            })}
                        </Content>
                    </ScrollView >
                </Container>
            }
        </Container>
    )
}

const styles = new StyleSheet.create({
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
        width: '80%'
    },



})