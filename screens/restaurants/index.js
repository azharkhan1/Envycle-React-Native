import React, { useEffect, useState } from 'react';
import { Input, Spinner, Container, Header, Content, Card, CardItem, Text, Body, Button, Item, Label, H1 } from 'native-base';
import { Alert } from 'react-native';
import axios from 'axios'
import url from '../../core/index';
import { useGlobalState, useGlobalStateUpdate } from '../../context/context';
import { ScrollView } from 'react-native-gesture-handler';



export default function Restaurants() {

    const [restaurants, setRestaurants] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [change, setChange] = React.useState(true);
    const [passcode, setPasscode] = useState();
    const globalState = useGlobalState();
    const globalStateUpdate = useGlobalStateUpdate();

    useEffect(() => {
        axios({
            method: 'get',
            url: `${url}/get-restaurants`
        }).then((response) => {
            setRestaurants(response.data.restaurants);
            setLoading(false);
            console.log('restaurants', response.data.restaurants);
        }).catch((err) => {
            console.log('error occured');
            setLoading(true);
        })
    }, [change])


    const redeemVoucher = (id, index) => {

        axios({
            method: 'post',
            url: `${url}/redeem-voucher`,
            data: {
                id: id,
                passcode: passcode,
            }
        }).then((response) => {
            globalStateUpdate(prev => ({
                ...prev, loginStatus: true, user: {
                    ...globalState.user,
                    points: globalState.user.points - restaurants[index].points,
                }, role: response.data.user.role,
            }));
            setPasscode('');
            setChange(!change);
            Alert.alert('Notification', response.data.message);
        }).catch((err) => {
            Alert.alert('Notification', 'wrong passcode')

        })
    }

    return (
        <Container style={{ backgroundColor: '#00868B', }}>
            {loading ? <Spinner /> :
                <ScrollView>
                    {/* <Header /> */}
                    <Content padder>
                        {restaurants.map((value, index) => {
                            return <Card key={index}>
                                <CardItem bordered>
                                    <Body>
                                        <CardItem bordered>
                                            <H1>
                                                {value.name}
                                            </H1>
                                        </CardItem>
                                        <CardItem bordered>
                                            <Text>
                                                Location {value.location}
                                            </Text>
                                        </CardItem>
                                        <CardItem>
                                            {globalState.user.points < value.points ? <Text>You need {value.points - globalState.user.points} points to avail this voucher</Text> : null}
                                            {globalState.user.points >= value.points ? <Text>Disclaimer: Visit {value.name} they will enter passcode for your voucher </Text> : null}
                                        </CardItem>
                                        <CardItem>
                                            {globalState.user.points >= value.points ? <Input
                                                onChangeText={(e) => setPasscode(e)}
                                                placeholder="Enter restaurant passcode"
                                                style={{ borderBottomWidth: 2 }}
                                                secureTextEntry={true}
                                            />
                                                :
                                                <Text></Text>}
                                        </CardItem>

                                    </Body>
                                </CardItem>
                                <CardItem footer bordered>
                                    {globalState.user.points >= value.points ?
                                        <Button
                                            onPress={() => redeemVoucher(value._id, index)}
                                        ><Text>Avail Voucher</Text></Button> : null}
                                </CardItem>
                            </Card>
                        })}
                    </Content>
                </ScrollView>


            }

        </Container >
    )
}