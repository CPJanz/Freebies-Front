import React from 'react';

import { Container, Button, Text } from 'native-base';
import { NavigationActions } from "react-navigation";

export default class AboutScreen extends React.Component {

  // Render any loading content that you like here
  render() {
    return (
        <Container>
        <Button onPress={() => this.props.navigation.navigate('App')}>
          <Text>
            Button
          </Text>
        </Button>
      </Container>
    );
  }
}