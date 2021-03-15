import React from 'react';
import { Container, Header, Content, Tab, Tabs, TabHeading, Icon, Text } from 'native-base';
import Materials from '../../components/materials';
import MyRequests from '../../components/my-requests';

const UserDashboard = () => {
  return (
    <Container  >
      <Header hasTabs />
      <Tabs tabBarBackgroundColor={'red'}>
        <Tab heading={<TabHeading><Text>Place Request</Text></TabHeading>}>
          <Materials />
        </Tab>
        <Tab heading={<TabHeading><Text>My Requests</Text></TabHeading>}>
          <MyRequests />
        </Tab>
      </Tabs>
    </Container>

  );
}



export default UserDashboard;