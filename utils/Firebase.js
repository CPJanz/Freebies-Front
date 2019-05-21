import * as firebase from "firebase";
import uuid from "uuid";

export default {
  uploadImage: async uri => {
    // generates a random image ID for firebase
    let imageID = uuid.v4() + ".jpg";
    // creates a blob (binary image format)
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    // creates a reference based off of the generated image ID
    let ref = firebase
      .storage()
      .ref()
      .child(imageID);
    // sends the blob to firebase
    let snapshot = await ref.put(blob, { contentType: "image/jpg" });
    // finalizes the uploaded blob
    blob.close();
    // returns the URL of the uploaded image
    return await snapshot.ref.getDownloadURL();
  },

  deleteImage: async filepath => {
    let filename = filepath
      .split("")
      .slice(filepath.indexOf("/o/") + 3, filepath.indexOf("?"))
      .join("");
    let imgRef = firebase
      .storage()
      .ref()
      .child(filename);
    imgRef
      .delete()
      .then(() => console.log(`${filename} deleted from Firebase`))
      .catch(error => console.error(`Error removing ${filename}`, error));
  }
};
