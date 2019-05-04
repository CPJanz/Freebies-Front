import axios from "axios";

export default {
  getNearbyItems: location => {
    console.log("locatio", location);
    const queryString =
      "https://freebies-api.herokuapp.com/api/item?latitude=" +
      location.latitude +
      "&longitude=" +
      location.longitude;
    return axios.get(queryString);
  },
  postNewItem: itemObject => {
    const queryString = "https://freebies-api.herokuapp.com/api/item";
    return axios.post(queryString, itemObject);
  }
  // route for updating item as taken
  // route for reposting an item
  // route to post a new user
  // route to get user information
  // route to get a user's posted items
};
