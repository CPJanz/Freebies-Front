import React from 'react';

import {Text} from 'native-base'

export default class TabBarIcon extends React.Component {
  render() {

    var textStyle = {
      fontSize: 22,
      fontWeight: (this.props.focused) ? "bold" : "normal",
      color: "#424242",
      marginBottom: 8
    }    

    return (
      <Text style={textStyle}>
        {this.props.name}
      </Text>     
    );
  }
}