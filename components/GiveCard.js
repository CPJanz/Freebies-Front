//this is the give item card component 

import React, { Component } from 'react';
import { Image } from 'react-native';

import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Body } from 'native-base';

export default class GiveCard extends Component {
    render() {
        return (
          <Card style={{marginTop: 5}}>
            <CardItem>
              <Button transparent textStyle={{color: '#87838B'}}>
                  <Icon name="logo-github" />
                  <Text>{this.props.numberOfStars}</Text>
                </Button>
            </CardItem>
            <CardItem>
              <Body>
                <Image source={{uri: this.props.image}} style={{height: 200, width: 300, flex: 1}}/>
                <Text>
                  {this.props.textBody}
                </Text>
              </Body>
            </CardItem>
          </Card>
        );
    }
}