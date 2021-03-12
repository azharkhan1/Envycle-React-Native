import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import { Link } from 'react-router-native';

export default class AppFooter extends Component {
    render() {
        return (
            <Footer>
                <FooterTab>
                    <Button>
                        <Link to='/'><Icon name="apps" /></Link>
                    </Button>
                    <Button>
                      <Link to='/restaurants'><Icon name="camera" /></Link>  
                    </Button>
                    <Button active>
                        <Icon active name="navigate" />
                    </Button>
                    <Button>
                        <Link to="/my-profile" style={null}><Icon name="person" /></Link>
                    </Button>
                </FooterTab>
            </Footer>

        );
    }
}