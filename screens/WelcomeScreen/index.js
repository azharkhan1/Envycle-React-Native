import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ImageBackground,
} from 'react-native'
import Button from '../../components/Button';


export default WelcomeScreen = ({ navigation }) => {
    return (
        <ImageBackground style={styles.background} source={require('../../assets/images/background.jpg')
        }
            blurRadius={1}
        >
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../../assets/images/logo.png')} />
            </View>
            <View style={styles.buttonContainer}>
                <Button title={'Login'}
                    onPress={()=>navigation.navigate('Login')}
                />
                <Button title={'Register'}
                onPress={()=>navigation.navigate('Signup')}
                 style={{ backgroundColor: '#00868B', }} />
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end',
    },

    container: {
        display: 'flex',
        flex: 1,
    },
    buttonContainer: {
        padding: 20,
        width: '100%'
    },
    logo: {
        height: 270,
        width: 270,
    },
    logoContainer: {
        position: "absolute",
        top: 50,
        alignItems: "center",
    },
})
