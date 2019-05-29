import React, { Component } from 'react';
import { View, Dimensions, Animated } from 'react-native';
const { width } = Dimensions.get('window');

export default class Slideshow extends Component {

  render() {
    let position = Animated.divide(this.props.scrollX, width);

    return (
      <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection: 'row' 
        }}>
        {this.props.images.length > 1 ? (
          this.props.images.map((_, i) => { 
            let opacity = position.interpolate({
              inputRange: [i - 1, i, i + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp'
            });
            return (
              <Animated.View
                key={i} 
                style={{ 
                  opacity, 
                  height: 10, 
                  width: 10, 
                  backgroundColor: '#424242', 
                  marginBottom: 15, 
                  marginRight: 8, 
                  marginLeft: 8, 
                  borderRadius: 5 }}
              />
            );
          })) : null}
      </View>
    );
  }
}