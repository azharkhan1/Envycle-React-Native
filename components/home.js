
import { View, Text, Image, StyleSheet , TouchableOpacity } from 'react-native'
import React from 'react';
import {useHistory} from 'react-router-native';
export default function Home() {
    const history = useHistory();
    return (
        <>
            <View style={{ display: 'flex', flex: 1, justifyContent: 'center', backgroundColor: '#28D6C0', padding: 20 }}>
            <TouchableOpacity style={styles.homeIcons} onPress={()=>history.push('/place-request')}>
                   <View style={{ alignSelf: 'center' , backgroundColor:'#00868B' , height:'100%' , }} >
                        <Image style={{ width: 110, height: 110, alignSelf: 'flex-end' }} source={require('../assets/images/givee-recycle.png')}
                        >
                        </Image>
                    </View>
                    <View style={{ display: 'flex', alignSelf: 'center' , marginLeft:40 }}>
                        <Text style={{ alignSelf: 'center', fontSize: 18, fontWeight: 'bold' , color:'#00868B'}}>
                            Place Request Now
                    </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.homeIcons} onPress={()=>history.push('/restaurants')}>
                   <View style={{ alignSelf: 'center' , backgroundColor:'#00868B' , height:'100%' , }} >
                        <Image style={{ width: 110, height: 110, alignSelf: 'flex-end' }} source={require('../assets/images/redeem-voucher.png')}
                        >
                        </Image>
                    </View>
                    <View style={{ display: 'flex', alignSelf: 'center' , marginLeft:40 }}>
                        <Text style={{ alignSelf: 'center', fontSize: 18, fontWeight: 'bold' , color:'#00868B'}}>
                           Redeem Voucher
                    </Text>
                    </View>
                </TouchableOpacity>
           
                <TouchableOpacity style={styles.homeIcons} onPress={()=>history.push('/my-profile')}>
                   <View style={{ alignSelf: 'center' , backgroundColor:'#00868B' , height:'100%' , }} >
                        <Image style={{ width: 110, height: 110, alignSelf: 'flex-end' }} source={require('../assets/images/givee-recycle.png')}
                        >
                        </Image>
                    </View>
                    <View style={{ display: 'flex', alignSelf: 'center' , marginLeft:40 }}>
                        <Text style={{ alignSelf: 'center', fontSize: 18, fontWeight: 'bold' , color:'#00868B'}}>
                            My Profile
                    </Text>
                    </View>
                </TouchableOpacity>
           
                <TouchableOpacity style={styles.homeIcons} onPress={()=>history.push('/my-requests')}>
                   <View style={{ alignSelf: 'center' , backgroundColor:'#00868B' , height:'100%' , }} >
                        <Image style={{ width: 110, height: 110, alignSelf: 'flex-end' }} source={require('../assets/images/my-requests.png')}
                        >
                        </Image>
                    </View>
                    <View style={{ display: 'flex', alignSelf: 'center' , marginLeft:40 }}>
                        <Text style={{ alignSelf: 'center', fontSize: 18, fontWeight: 'bold' , color:'#00868B'}}>
                            My Requests
                    </Text>
                    </View>
                </TouchableOpacity>
           
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
    homeIcons: {
         display: 'flex', flex: 1, marginTop: 40, backgroundColor: 'white', flexDirection: 'row' ,
         justifyContent:'flex-start',
        alignSelf:'center',
         shadowColor: "#00868B",
         shadowOffset: {
             width: 0,
             height: 10,
         },
         shadowOpacity: 0.51,
         shadowRadius: 13.16,
         width:'95%',
         elevation: 20,
        }
,


})