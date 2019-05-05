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

  //
  signIn: email => {
    const queryString = "https://freebies-api.herokuapp.com/api/user/" + email;
    return axios.get(queryString);
  },

  createUser: email => {
    const queryString = "https://freebies-api.herokuapp.com/api/user/";
    return axios.post(queryString, { email: email });
  },

  postNewItem: itemObject => {
    console.log(itemObject);
  }
  // route for updating item as taken
  // route for reposting an item
  // route to post a new user
  // route to get user information
  // route to get a user's posted items
};
