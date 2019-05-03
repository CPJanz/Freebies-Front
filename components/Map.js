import React, { Component } from 'react';
import { Button } from 'react-native';
import openMap from 'react-native-open-maps';

export default class Map extends Component {
  _goToMap() {
    openMap({ latitude: 37.865101, longitude: -119.538330 });
  }
  
  render() {
    return (
      <Button
        color={'#bdc3c7'}
        onPress={this._goToMap}
        title="Click To Open Maps 🗺" />
    );
  }
}