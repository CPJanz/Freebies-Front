import React from 'react';

import { Container, Header, Content, Card, CardItem, Text, Icon, Title, Body, Button, Left, Right } from "native-base";

import {Linking} from 'react-native';

export default class AboutScreen extends React.Component {

  // Render any loading content that you like here
  render() {
    return (
      <Container>
        <Header>
        <Left>
          <Button hasText transparent onPress={() => this.props.navigation.navigate('App')}>
          <Text>Back</Text>
          </Button>
        </Left>
          <Body>
          <Title>About</Title>
          </Body>
          <Right></Right>
        </Header>
        <Content padder>
        <Card>
          <CardItem header border>
          <Text>
          What is Freebeez?
          </Text>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text style={{fontWeight:"bold", marginTop:5, marginBottom:5}}>
              Free Stuff
              </Text>
              <Text >
              Freebeez is an app designed for giving and getting free stuff without having to talk to anyone! Remember the days when you could put unwanted items on the corner with a free sign and first-come-first-serve it would be taken by some lucky person who happened by? Freebeez takes this to next level by providing a platform for posting and finding free items.
              </Text>
              <Text style={{fontWeight:"bold", marginTop:5, marginBottom:5}}>
              How Does It Work?
              </Text>
              <Text>
              If you are searching for free stuff, simply sign up with your email address, and allow geolocation permissions. The app will do the rest by showing you a list of free items closest to you. Have some stuff you want to give away? Sign up with your email, allow geolocation permissions, and snap a photo or two of your stuff. The app will do the rest. Check it out! 
              </Text>
            </Body>
          </CardItem>
          <CardItem footer bordered>
          <Text style={{fontWeight:"bold"}}>FAQs</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text style={{margin:5}}>
              To report any concerns, Email us at <Text style={{color:"blue", textDecorationLine:"underline"}}>freebeez@freestuff.com</Text>.
              </Text>
              <Text style={{margin:5}}>
              No longer want to get or give free stuff? We are sad to see you go. Click here and we’ll remove your account.
              </Text>
              <Text style={{margin:5}}>
              See more here: <Icon name="logo-github" onPress={() => Linking.openURL("https://github.com/CPJanz/Freebies-Front")} />
              </Text>
            </Body>
          </CardItem>
        </Card>
        </Content>        
      </Container>
    );
  }
}