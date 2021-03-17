
import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import Footer from "../components/footer";
export default function Home() {
    return (
        <>

            <View style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#00868B' }}>
                <View style={{ flex: 3, alignSelf: 'center' }}>
                    <Image style={{ width: 300, height: 250 }} source={require('../assets/images/envycle-demo.png')}
                    >
                    </Image>
                </View>
                <View style={{ flex: 6 }}>
                    <Card containerStyle={{backgroundColor:'transparent'}}>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                            <Card.Image containerStyle={{ width: '50%' }} source={require('../assets/images/give-recycle.png')}>
                                {/* <Text style={{ marginBottom: 10 }}>
                                    The idea with React Native Elements is more about component structure than actual design.
    </Text> */}
                            </Card.Image>
                            <Card.Image containerStyle={{ width: '50%', }} source={require('../assets/images/give-recycle.png')}>
   
                            </Card.Image>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', }}>
                            <Card.Image containerStyle={{ width: '50%' }} source={require('../assets/images/give-recycle.png')}>

                            </Card.Image>
                            <Card.Image containerStyle={{ width: '50%' }} source={require('../assets/images/give-recycle.png')}>
  
                            </Card.Image>
    
                        </View>
                    </Card>
                </View>
            </View>

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