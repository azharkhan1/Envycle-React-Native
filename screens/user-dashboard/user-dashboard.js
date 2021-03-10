import React, { Component } from 'react';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import { ScrollView, Text } from "react-native";
import Materials from '../../components/materials';
import MyRequests from '../../components/my-requests';

const UserDashboard = () => {
  return (

    <Container>
      <Header hasTabs />
      <Tabs>
        <Tab heading={'Place Request'}>
          <Materials />
        </Tab>
        <Tab heading={"My Requests"}>
         <MyRequests/>
        </Tab>
      </Tabs>
    </Container>

  );
}



export default UserDashboard;