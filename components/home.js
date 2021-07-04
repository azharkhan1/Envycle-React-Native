
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react';
import { useHistory } from 'react-router-native';
export default function Home({navigation}) {
    return (

        <View style={{ display:'flex' , backgroundColor: '#28D6C0', flex:1}}>

            <View style={{ display: 'flex', flex: 1, justifyContent: 'center', backgroundColor: '#28D6C0', padding: 20 , marginTop:20, }}>
                <TouchableOpacity style={styles.homeIcons} onPress={() =>navigation.navigate('PlaceRequest')}>
                    <View style={styles.imageContainer} >
                        <Image
                            style={{  width:100,height:100}}
                            source={require('../assets/images/givee-recycle.png')}
                            resizeMode={'contain'}
                            />

                    </View>
                    <View style={{ display: 'flex', alignSelf: 'center', marginLeft: 40 }}>
                        <Text style={{ alignSelf: 'center', fontSize: 18, fontWeight: 'bold', color: '#00868B' }}>
                            Place Request Now
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.homeIcons} onPress={() => navigation.navigate('Restaurants')}>
                    <View style={styles.imageContainer} >
                        <Image style={{ width: 110, height: 110, alignSelf: 'flex-end' }} source={require('../assets/images/redeem-voucher.png')}
                        >
                        </Image>
                    </View>
                    <View style={{ display: 'flex', alignSelf: 'center', marginLeft: 40 }}>
                        <Text style={{ alignSelf: 'center', fontSize: 18, fontWeight: 'bold', color: '#00868B' }}>
                            Redeem Voucher
                        </Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity style={styles.homeIcons} onPress={() => navigation.navigate('MyRequests')}>
                    <View style={styles.imageContainer} >
                        <Image style={{ width: 110, height: 110, alignSelf: 'flex-end' }} source={require('../assets/images/my-requests.png')}
                        >
                        </Image>
                    </View>
                    <View style={{ display: 'flex', alignSelf: 'center', marginLeft: 40, justifyContent: 'center' }}>
                        <Text style={{ alignSelf: 'center', fontSize: 18, fontWeight: 'bold', color: '#00868B', alignItems: 'center' }}>
                            My Requests
                        </Text>
                    </View>
                </TouchableOpacity>

            </View>

            </View>

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
    homeIcons: {
        display: 'flex', marginTop: 40, backgroundColor: 'white', flexDirection: 'row',
        justifyContent: 'flex-start',
        alignSelf: 'center',
        shadowColor: "#00868B",
        overflow:'hidden',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,
        width: '100%',
        elevation: 20,
        flex:3,
    },
    imageContainer: {
        alignSelf: 'center', 
        backgroundColor: '#00868B', 
        height: '100%',
        justifyContent: 'center',
        overflow: 'hidden',

    }


})