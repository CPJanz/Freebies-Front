import React from 'react';
import { Button, Image, View } from 'react-native';
import { Toast } from "native-base";
//loads the ImagePicker and FileSystem to be used for selecting and capturing user images
import { ImagePicker } from 'expo';

//checks if user has ever given permission on this app to access their camera roll
async function checkCameraPermission() {

  const { Permissions } = Expo;
  try {
    const { status } = await Permissions.getAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
    console.log("checking permission");
    return status === 'granted';
  }
  catch (err) {
    return false;
  }
}

//this code will run if permission has not been given previously to get permission to access users camera roll
async function getCameraPermission() {
  console.log("asking");
  const { Location, Permissions } = Expo;
  const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);

  return status === 'granted';
}

//this code is called by the get image button to check and get camera permission
//if the user has previously given permission, this code will not ask for permission again 
async function checkAndGetCameraPermission() {
  var test = await checkCameraPermission();
  console.log(test);
  if (!test) {
    var gotPermission = await getCameraPermission();

    if (!gotPermission) {
      console.log("didn't get permission");
    }
  }
}

//renders the take picture or select image UI
export default class ImagePickerComponent extends React.Component {
  images = this.props.images ? this.props.images : [];
  
  state = {
    gotImages: false,
    showToast: false
  };

  render() {
    let { gotImages } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Take a photo"
          onPress={() => this._getImage(true)}
        />
        <Button
          title="Pick an image from camera roll"
          onPress={() => this._getImage(false)}
        />
        {gotImages &&
          this.images.map((data, i) => {
            return (
              <Image key={i} source={{ uri: data }} style={{ width: 300, height: 300, marginTop: 5, borderRadius: 15 }} />
            );
          })
        }
      </View>
    );
  }

  //prompts the user to
  //camera = true: take a picture 
  //camera = false: select an existing image from their camera roll
  //adds selected/taken images to user image list for posting
  _getImage = async (camera) => {
    var result;

    await checkAndGetCameraPermission();

    if (camera) {
      result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
    }
    else {
      result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,        
        aspect: [4, 3],
      });
    }
    
    console.log(result);

    //if the user does not cancel, save a local copy of the image and add to image list
    if (!result.cancelled && this.images.length < 5) {     
      this.images.push(result.uri);
    } else if (this.images.length >= 5) {
      Toast.show({
        text: "You may only add up to 5 images",
        buttonText: "Okay",
        duration: 3000,
        position: "top"
      })
    }

    //refreshes the state if images were selected/taken
    this.setState({ gotImages: this.images.length > 0 });
  };
}