
import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import Footer from "../components/footer";
export default function Home() {
    return (
        <>
            <View style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' , backgroundColor:'black' }}>
                <Card>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Card.Image containerStyle={{ width: '50%' }} source={require('../assets/images/recycle.jpg')}>
                            <Text style={{ marginBottom: 10 }}>
                                The idea with React Native Elements is more about component structure than actual design.
    </Text>
                        </Card.Image>
                        <Card.Image containerStyle={{ width: '50%', }} source={require('../assets/images/recycle.jpg')}>
                            <Text style={{ marginBottom: 10 }}>
                                The idea with React Native Elements is more about component structure than actual design.
    </Text>
                        </Card.Image>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', }}>
                        <Card.Image containerStyle={{ width: '50%' }} source={require('../assets/images/recycle.jpg')}>
                            <Text style={{ marginBottom: 10, }}>
                                The idea with React Native Elements is more about component structure than actual design.
    </Text>
                        </Card.Image>
                        <Card.Image containerStyle={{ width: '50%' }} source={require('../assets/images/recycle.jpg')}>
                            <Text style={{ marginBottom: 10 }}>
                                The idea with React Native Elements is more about component structure than actual design.
    </Text>
                        </Card.Image>
                    </View>
                </Card>
            </View>
            <Footer />
        </>
    )
}

const styles = new StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    card: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        flexWrap: 'wrap',
    },

})