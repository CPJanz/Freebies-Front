import React from "react";

import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Title,
  Body,
  Button,
  Left,
  Right
} from "native-base";

import { Linking, Image } from "react-native";

export default class MeetTheTeamScreen extends React.Component {
  // Render any loading content that you like here
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              hasText
              transparent
              onPress={() => this.props.navigation.navigate("App")}
            >
              <Text>Back</Text>
            </Button>
          </Left>
          <Body>
            <Title>The Team</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Card>
            <CardItem header border style={{ paddingBottom: 0 }}>
              <Image
                source={require("../assets/images/AppName.png")}
                style={{
                  height: 150,
                  resizeMode: "contain",
                  flex: 1,
                  alignSelf: "center"
                }}
              />
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text
                  style={{
                    fontWeight: "bold",
                    marginBottom: 15,
                    textAlign: "center",
                    flex: 1,
                    alignSelf: "center"
                  }}
                >
                  There's a lot of buzz about Freebeez-{"\n"}meet the team who
                  created it!
                </Text>

                <Image
                  source={require("../assets/images/groupPhoto.jpg")}
                  style={{
                    height: 250,
                    width: 230,
                    marginBottom: 15,
                    resizeMode: "contain",
                    flex: 1,
                    alignSelf: "center"
                  }}
                />

                <Text style={{ fontWeight: "bold", marginTop: 20 }}>
                  Katie Haster
                </Text>

                <Image
                  source={require("../assets/images/katie.jpg")}
                  style={{
                    height: 160,
                    width: 120,
                    marginTop: 5,
                    marginBottom: 5,
                    resizeMode: "contain",
                    flex: 1,
                    alignSelf: "center"
                  }}
                />

                <Text>
                  Katie Haster is an aspiring UX Designer, with a strong
                  background in arts and administration, client management, and
                  now full stack development. Visit Katie's site at{" "}
                  <Text
                    style={{ color: "blue", textDecorationLine: "underline" }}
                    onPress={() =>
                      Linking.openURL(
                        "https://katiehaster.github.io/myPortfolio/"
                      )
                    }
                  >
                    kaitehaster.com
                  </Text>
                </Text>

                <Text style={{ fontWeight: "bold", marginTop: 20 }}>
                  Claire Gibeau
                </Text>

                <Image
                  source={require("../assets/images/claire.jpg")}
                  style={{
                    height: 130,
                    width: 90,
                    marginTop: 5,
                    marginBottom: 5,
                    resizeMode: "contain",
                    flex: 1,
                    alignSelf: "center"
                  }}
                />

                <Text>
                  Claire is a passionate PM who thrives in taking great ideas
                  and making them tangible. She has over 8 years of experience
                  in the industry, with a business degree from the University of
                  Washington, as well as certifications in Project Management
                  and Full Stack Web Development from UW, and CS Fundamentals
                  from Stanford University. See more of Claire's work at{" "}
                  <Text
                    style={{ color: "blue", textDecorationLine: "underline" }}
                    onPress={() => Linking.openURL("https://clairegibeau.com/")}
                  >
                    clairegibeau.com
                  </Text>
                </Text>

                <Text style={{ fontWeight: "bold", marginTop: 20 }}>
                  Stacy Nowak
                </Text>

                <Image
                  source={require("../assets/images/stacy.jpeg")}
                  style={{
                    height: 130,
                    width: 90,
                    marginTop: 5,
                    marginBottom: 5,
                    resizeMode: "contain",
                    flex: 1,
                    alignSelf: "center"
                  }}
                />

                <Text>
                  Stacy is a full stack web developer with a certificate from
                  the University of Washington. She has a degree in zoology and
                  also has a background managing bank branch operations where
                  she achieved the highest audit compliance rating. Stacy brings
                  that same meticulousness and solutions-finding success to the
                  web applications she’s created. Find out more about Stacy’s
                  coding projects at{" "}
                  <Text
                    style={{ color: "blue", textDecorationLine: "underline" }}
                    onPress={() =>
                      Linking.openURL("http://www.stacynowak.com/")
                    }
                  >
                    stacynowak.com
                  </Text>
                </Text>

                <Text style={{ fontWeight: "bold", marginTop: 20 }}>
                  Carl Janz
                </Text>

                <Image
                  source={require("../assets/images/carl.jpg")}
                  style={{
                    height: 160,
                    width: 120,
                    marginTop: 5,
                    marginBottom: 5,
                    resizeMode: "contain",
                    flex: 1,
                    alignSelf: "center"
                  }}
                />

                <Text>
                  Transitioning to Full Stack Development after 6 years of
                  Quality Assurance in the mobile games industry. Carl has a
                  passion for learning about systems, understanding how they
                  work, and creating amazing things with them. Discover more of
                  his projects at{" "}
                  <Text
                    style={{ color: "blue", textDecorationLine: "underline" }}
                    onPress={() => Linking.openURL("http://carljanz.com")}
                  >
                    carljanz.com
                  </Text>
                </Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
