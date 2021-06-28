import React from 'react';
import {  Footer, FooterTab, Button, Icon } from 'native-base';
import {  useHistory } from 'react-router-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text } from 'react-native';
export default function AppFooter() {
    const history = useHistory();
    const [home, setHome] = React.useState(true);
    const [myProfile, setMyProfile] = React.useState(false);
    const [restaurants, setRestaurants] = React.useState(false);
    const [change, handleChange] = React.useState(true);

    React.useEffect(() => {
    }, [change]);

    const forHome = () => {
        history.push('/')
        setHome(true);
        setMyProfile(false);
        setRestaurants(false)
        handleChange(!change);
    }
    const forRestaurants = () => {
        history.push('/restaurants')
        setRestaurants(true)
        setHome(false)
        setMyProfile(false);
        handleChange(!change);
    }
    const forMyProfile = () => {
        history.push('/my-profile')
        setMyProfile(true);
        setRestaurants(false)
        setHome(false)
        handleChange(!change);
    }


    return (
        <Footer>
            <FooterTab>
                <Button active={home ? true : false} onPress={() => forHome()}>
                    <Icon name='home'/>
                    <Text style={home? {color:'white'} : {color:'lightgray'}}>Home</Text>
                </Button>
                <Button active={restaurants ? true : false} onPress={() => forRestaurants()}>
                <MaterialCommunityIcon name='food' size={30} color={restaurants ? 'white' : 'lightgray'}/>
                <Text style={restaurants? {color:'white'} : {color:'lightgray'}}>Vouchers</Text>
                </Button>
                {/* <Button >
                    <Icon name="navigate" />
                </Button> */}
                <Button active={myProfile ? true : false} onPress={() => forMyProfile()}>
                    <Icon name="person" />
                    <Text style={myProfile? {color:'white'} : {color:'lightgray'}}>My Profile</Text>
                </Button>

            </FooterTab>
        </Footer>
    );

}