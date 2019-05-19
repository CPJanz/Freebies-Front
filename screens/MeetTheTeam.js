import React from 'react';

import { Container, Header, Content, Card, CardItem, Text, Title, Body, Button, Left, Right } from "native-base";

import {Linking, Image} from 'react-native';

export default class MeetTheTeamScreen extends React.Component {

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
          <Title>The Team</Title>
          </Body>
          <Right></Right>
        </Header>
        <Content padder>
        <Card>
          <CardItem header border style={{paddingBottom:0}}>
          <Image source={require("../assets/images/AppName.png")} style={{height:80, resizeMode: "center", flex:1, alignSelf:"center"}} />
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text style={{fontWeight:"bold", marginBottom:15, textAlign:"center", flex:1, alignSelf:"center"}}>
              There's a lot of buzz about Freebeez-{"\n"}meet the team who created it!
              </Text>
            
              <Image source={require("../assets/images/groupPhoto.jpg")} style={{height:250, width:230, marginBottom:15, resizeMode: "center", flex:1, alignSelf:"center"}} />

            <Text style={{fontWeight:"bold", marginTop:20}}>
                Katie Haster
            </Text>

            <Text style={{fontWeight:"bold", marginTop:20}}>
                Claire Gibeau
            </Text>

            <Image source={require("../assets/images/claire.jpg")} style={{height:120, width:80, marginTop:5, marginBottom:5, resizeMode: "center", flex:1, alignSelf:"center"}} />

              <Text >
              Claire is a passionate PM who thrives in taking great ideas and making them tangible. She has over 8 years of experience in the industry, with a business degree from the University of Washington, as well as certifications in Project Management and Full Stack Web Development from UW, and CS Fundamentals from Stanford University. See more of Claire's work at <Text style={{color:"blue", textDecorationLine:"underline"}} onPress={() => Linking.openURL("https://clairegibeau.com/")}>clairegibeau.com</Text>
              </Text>
           
            <Text style={{fontWeight:"bold", marginTop:20}}>
                Stacy Nowak
            </Text>

            <Text style={{fontWeight:"bold", marginTop:20}}>
                Carl Janz
            </Text>

            </Body>
          </CardItem>
        </Card>
        </Content>        
      </Container>
    );
  }
}