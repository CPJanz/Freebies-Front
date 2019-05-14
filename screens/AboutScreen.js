import React from 'react';

import { Container, Header, Content, Card, CardItem, Text, Icon, Title, Body, Button, Left, Right, View } from "native-base";

import {Linking, Image } from 'react-native';

import Email from "../components/Email"

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
          <Image source={require("../assets/images/AppName.png")} style={{height:80, resizeMode: "center", flex:1, alignSelf:"center"}} />
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text style={{fontWeight:"bold", marginBottom:5}}>
              Free Stuff
              </Text>
              <Text >
              Freebeez is an app designed for giving and getting free stuff without having to talk to anyone! Remember the days when you could put unwanted items on the corner with a free sign and first-come-first-serve it would be taken by some lucky person who happened by? Freebeez takes this to the next level by providing a platform for posting and finding free items.
              </Text>
              <Text style={{fontWeight:"bold", marginTop:15, marginBottom:5}}>
              How Does It Work?
              </Text>
              <Text>
              If you are searching for free stuff, simply sign up with your email address, and allow geolocation permissions. The app will do the rest by showing you a list of free items closest to you. Have some stuff you want to give away? Sign up with your email, allow geolocation permissions, and snap a photo or two of your stuff. The app will do the rest. Your items will be posted for 24 hours. If someone hasn't taken it in that time, you can repost. Check it out! 
              </Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text style={{fontWeight:"bold", marginTop:5, marginBottom:5}}>
              FAQs
              </Text>
              <View style={{flex:1, flexDirection: "row", alignItems: "flex-start"}}>
              <Text>
              To report any concerns, send us an
              {/* <Text style={{color:"blue", textDecorationLine:"underline"}}>freebeez@freestuff.com</Text>. */}</Text>
              {/* <Button onPress={() => Linking.openURL('mailto:katiehaster@gmail.com') }
      title="freebeez@freebeez.com" /> */}<Email>email</Email>
              </View>
              <Text>
              No longer want to get or give free stuff? We are sad to see you go. Click <Text style={{color:"blue", textDecorationLine:"underline"}}>here</Text> and we’ll remove your account.
              </Text>
              <Text>
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