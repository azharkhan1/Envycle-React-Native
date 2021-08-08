import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from "react-native"
import { Container, Header, Content, Card, CardItem, Text, Body, Button } from "native-base";
import { Spinner } from "native-base"
import url from "../core/index";
import axios from 'axios';
import { RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native';
import { Alert } from 'react-native';


const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function myRequests() {
    const [myRequests, setMyRequests] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [loading, setLoading] = useState(true);
    const [change, handleChange] = useState(true);
    useEffect(() => {
        axios({
            method: 'get',
            url: `${url}/myorders`
        }).then((res) => {
            var userRequests = res.data.placedRequests.slice().reverse();
            setMyRequests(userRequests);
            setLoading(false)
        }).catch((err) => {
            Alert.alert('Notification', 'An error occured');
        })
    }, [change])
    const deleteOrder = (id) => {
        axios({
            method: 'delete',
            url: `${url}/delete-order`,
            data: {
                id: id,
            },
        }).then((response) => {
            Alert.alert('Notification', 'Request cancelled successfully!');
            handleChange(!change);
        }).catch((error) => {
            alert('server error');
        })
    }


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
        handleChange(!change)
    }, []);

    return (

        <Container>
            {loading ? <Spinner /> :
                <Container>
                    <SafeAreaView>
                        <ScrollView
                            contentContainerStyle={styles.scrollView}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                />
                            }
                        >
                            <Content padder>
                                {myRequests.map(({ phoneNo, cart, address, status, _id }, index) => {
                                    return <Card key={index}>

                                        <CardItem bordered style={{ backgroundColor: '#00868B' }} >
                                            <Text style={{ color: 'white' }}>Status: <Text style={{ color: 'white' }}>{status}</Text></Text>
                                        </CardItem>
                                        <CardItem bordered>
                                            {cart.map((value, index) => {
                                                return <Body key={index}>
                                                    <CardItem bordered>
                                                        <Text>
                                                            Material: {value.name ? value.name : value.product} x {value.quantity} kg
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
                        </ScrollView>
                    </SafeAreaView>
                </Container>

            }

        </Container >


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