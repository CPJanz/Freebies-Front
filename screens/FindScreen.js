//this code creates the FIND page

import React, { Component } from "react";
import FindCard from "../components/FindCard.js";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Text,
  Button,
  View
} from "native-base";
import API from "../utils/API";
const haversine = require("haversine-js");

export default class FindScreen extends Component {
  state = {
    nearbyItems: [],
    location: null
  };
  //Takes in an itemLocation (format: {latitude: 42, longitude: -112}) and compares it to the passed prop location (of the same format).
  calculateDistance = itemLocation =>
    haversine(itemLocation, this.state.location);

  componentDidMount() {
    //Grab current client position then use that to query the database for nearby items, finally set the state with the nearbyItems and location.
    navigator.geolocation.getCurrentPosition(position => {
      API.getNearbyItems(position.coords)
        .then(items => {
          this.setState({ nearbyItems: items.data, location: position.coords });
        })
        .catch(err => console.log(err));
    });
  }

  render() {
    // sampleData for find item card content
    // TODO: plug into backend
    var sampleData = [
      {
        textBody: "This is the optional item description",
        numberOfStars: 1000,
        image:
          "https://bell-environmental.com/wp-content/uploads/2012/05/freesofa-forpickup1.jpg"
      },
      {
        textBody: "This is the optional item description",
        numberOfStars: 1000,
        image:
          "https://bell-environmental.com/wp-content/uploads/2012/05/freesofa-forpickup1.jpg"
      },
      {
        textBody: "This is the optional item description",
        numberOfStars: 1000,
        image:
          "https://bell-environmental.com/wp-content/uploads/2012/05/freesofa-forpickup1.jpg"
      }
    ];

    return (
      <Container>
        <Content>
          {this.state.nearbyItems.map((data, i) => {
            return (
              <FindCard
                key={i}
                textBody={data.description}
                distance={this.calculateDistance(data.location)}
                image={data.image}
              />
            );
          })}
        </Content>
      </Container>
    );
  }
}
