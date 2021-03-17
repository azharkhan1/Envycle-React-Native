import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import { Link, useHistory } from 'react-router-native';
import axios from 'axios';

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
                    <Icon name="home" />
                </Button>
                <Button active={restaurants ? true : false} onPress={() => forRestaurants()}>
                    <Icon name="camera" />
                </Button>
                {/* <Button >
                    <Icon name="navigate" />
                </Button> */}
                <Button active={myProfile ? true : false} onPress={() => forMyProfile()}>
                    <Icon name="person" />
                </Button>

            </FooterTab>
        </Footer>

    );

}