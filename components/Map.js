import React, { Component } from 'react';
import { Button } from 'react-native';
import openMap from 'react-native-open-maps';

export default class Map extends Component {
  _goToMaps = () => {
    openMap(this.props.location);
  }
  
  render() {
    return (
      <Button
        color={'#bdc3c7'}
        onPress={this._goToMaps}
        title="Click To Open Maps 🗺" />
    );
  }
}