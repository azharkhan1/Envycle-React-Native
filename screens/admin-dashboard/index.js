import React, { useEffect, useState } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Body, Left, Right, Button } from 'native-base';
import { useGlobalState } from '../../context/context';
import { View } from 'react-native'
import axios from 'axios';
import url from '../../core/index';
import socket from "../../config/socket";

export default function AdminDashboard() {
    const globalState = useGlobalState();
    const [realTime, setRealTime] = useState(false);
    const [orders, setOrders] = useState([]);


    useEffect(() => {
        let arr = [];
        axios({
            method: 'get',
            url: `${url}/getOrders`,
        }).then((response) => {
            response.data.placedRequests.map((value) => {
                if (value.status === 'Pending') {
                    arr.push(value);
                    console.log('pending values', value);
                }
            })
            arr = arr.slice().reverse();
            setOrders(arr);
            socket.on('requests', (data) => {
                setRealTime(!realTime);
            })
        }).catch((err) => {
            alert('server error');
        })

    }, [realTime])

    const confirmRequest = (index) => {

        axios({
            method: 'patch',
            url: `${url}/confirmOrder`,
            data: {
                id: orders[index]._id,
                userEmail: orders[index].userEmail
            },
        }).then((res) => {
            alert('Request Confirmed');
            setRealTime(!realTime);
        }).catch((err) => {
            console.log("error is=>", err);
        })
    }

    const declineRequest = (index) => {
        console.log(orders[index]._id)
        axios({
            method: 'patch',
            url: `${url}/declineOrder`,
            data: {
                id: orders[index]._id,
            },
        }).then((res) => {
            alert('Request Declined');
            setRealTime(!realTime);
        }).catch((err) => {
            console.log("error is=>", err);
        })
    }

    return (
        <Container>
            <Header />
            <Content padder>
                <CardItem header bordered>
                    <Text>NativeBase</Text>
                </CardItem>
                {orders.map(({ cart, _id, phoneNo, address, userEmail, remarks }, index) => {
                    return <Card key={index}>
                        <CardItem bordered>
                            <Body key={index}>
                                <CardItem>
                                    <Left>
                                        <Text>{userEmail}</Text>
                                    </Left>
                                </CardItem>
                                <CardItem>
                                    <Text>
                                        <Left>
                                            <Text>Address:</Text>
                                        </Left>
                                    </Text>
                                    <Right>
                                        <Text>{address}</Text>
                                    </Right>
                                </CardItem>
                                <CardItem>
                                    <Left>
                                        <Text>
                                            Phone
                                        </Text>
                                    </Left>
                                    <Right>
                                        <Text>{phoneNo}</Text>
                                    </Right>
                                </CardItem>
                                {cart.map((cartVal, index) => {
                                    return (
                                        <View key={index} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                            <CardItem>
                                                <Left>
                                                    <Text style={{ alignSelf: 'flex-end' }}>
                                                        {cartVal.product ? cartVal.product : cartVal.name}
                                                    </Text>
                                                </Left>
                                                <Right>
                                                    <Text>
                                                        {cartVal.quantity}
                                                    </Text>
                                                </Right>
                                            </CardItem>
                                        </View>
                                    )
                                })}

                                <CardItem>
                                    <Left>
                                        <Text>
                                            Remarks:
                                        </Text>
                                    </Left>
                                    <Right>
                                        <Text>
                                            {remarks}
                                        </Text>
                                    </Right>

                                </CardItem>
                            </Body>

                        </CardItem>
                        <CardItem footer bordered>
                            <Left><Button onPress={() => confirmRequest(index)} primary><Text>Accept</Text></Button></Left>
                            <Right><Button onPress={() => declineRequest(index)} danger><Text>Reject</Text></Button></Right>
                        </CardItem>
                    </Card>
                })}
            </Content>
        </Container>

    );

}