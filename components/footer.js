import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import { Link, useHistory } from 'react-router-native';

export default function AppFooter() {
    const history = useHistory();


    return (
        <Footer>
            <FooterTab>
                <Button onPress={() => history.push('/')}>
                    <Icon active={true} name="apps" />
                </Button>
                <Button onPress={() => history.push('/restaurants')}>
                    <Icon name="camera" />
                </Button>
                {/* <Button >
                    <Icon name="navigate" />
                </Button> */}
                <Button onPress={() => history.push('/my-profile')}>
                    <Icon name="person" />
                </Button>

            </FooterTab>
        </Footer>

    );

}