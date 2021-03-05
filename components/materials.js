import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { Text, Button, Thumbnail, Spinner, Container, Header, Content, Card, CardItem, Body, Left, Right } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import axios from 'axios'
import url from "../core/index";
import { useGlobalState, useGlobalStateUpdate } from '../context/context';


export default function Materials() {
    const [materials, setMaterials] = useState();
    const [loading, setLoading] = useState(true);
    const globalStateUpdate = useGlobalStateUpdate();
    const globalState = useGlobalState();


    useEffect(() => {
        axios({
            method: 'get',
            url: `${url}/get-materials`,
        }).then((res) => {
            setMaterials(res.data.materials);
            setLoading(false);
        }).catch((err) => {
            setLoading(true);
        })
    }, []);

    const addMaterial = (index) => {
        var old_materials = [...materials];
        old_materials[index].added = true,
            setMaterials(old_materials);
        console.log('selected material ' , materials[index]);
        globalStateUpdate((prevValue) => ({ ...prevValue, cart: [...globalState.cart, materials[index]] , role:'haha' }));
        // globalStateUpdate((prevValue) => ({ ...prevValue, loginStatus: false }))
    }

    return (


        <Container>
            {loading ? <Spinner />
                :

                <Grid >
                    <Row>

                        <ScrollView>
                            <Col>
                                <Card style={styles.card}>
                                    {materials.map((value, index) => {
                                        return <CardItem key={index}>
                                            <Body style={styles.card}>
                                                <Thumbnail source={{ uri: value.url }}></Thumbnail>
                                                <Text style={{ textAlign: 'center' }}>{value.name}</Text>
                                                <Button onPress={() => value.added === true ? () => { return } : addMaterial(index)} style={{ alignSelf: 'center' }} success><Text>{value.added === true ? 'Added' : 'Add Material'}</Text></Button>
                                            </Body>
                                        </CardItem>
                                    })
                                    }
                                </Card>
                            </Col>
                        </ScrollView>
                    </Row>
                </Grid>

            }
        </Container>
    )
}

const styles = new StyleSheet.create({
    card: {
        width: '100%',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        backgroundColor: 'lightgreen',
        padding: 20,
    }
})