//Cloudinary Widget 
//KNOW this code needs to be updated. This is a placeholder

import React, { Component } from 'react';

import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Body } from 'native-base';

export default class CloudinaryWidget extends Component {
    render() {
        return (
            <Button id="upload_widget" class="cloudinary-button">Upload files</Button>

            <script src="https://widget.cloudinary.com/v2.0/global/all.js" type="text/javascript"></script>

            <script type="text/javascript">
                var myWidget = cloudinary.createUploadWidget({
                    cloudName: 'my_cloud_name',
  uploadPreset: 'my_preset'}, (error, result) => { 
    if (!error && result && result.event === "success") {
                    console.log('Done! Here is the image info: ', result.info);
                }
              }
            )
            
document.getElementById("upload_widget").addEventListener("click", function(){
                    myWidget.open();
                }, false);
</script>
        );
    }
}
