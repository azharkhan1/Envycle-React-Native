import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native'


export default function Button({ title, style, onPress }) {
    return (
        <TouchableOpacity
            style={[styles.button, style]}
            onPress={onPress}
        >
            <Text style={[styles.text,]}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'tomato',
        borderRadius: 25,
        height: 45,
        marginVertical: 10,
    },
    text: {
        color: 'white',
        fontSize: 18,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }
})