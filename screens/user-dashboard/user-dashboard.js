import React, { Component } from 'react';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import { ScrollView, Text } from "react-native";
import Materials from '../../components/materials';

const UserDashboard = () => {
  return (

    <Container>
      <Header hasTabs />
      <Tabs>
        <Tab heading={'tab1'}>
          <Materials />
        </Tab>
        <Tab heading={"Tab2"}>
          <Text>Haha</Text>
        </Tab>
        <Tab heading={"Tab3"}>
          <Text>Haha</Text>
        </Tab>
      </Tabs>
    </Container>

  );
}



export default UserDashboard;