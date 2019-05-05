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
  },
  // route for updating item as taken
  itemTaken: itemId => {
    const queryString = `https://freebies-api.herokuapp.com/api/item/${itemId}`;
    return axios.put(queryString);
  },

  // route for reposting an item
  itemRepost: itemId => {
    const queryString = `https://freebies-api.herokuapp.com/api/item/repost/${itemId}`;
    return axios.put(queryString);
  },

  // route to post a new user
  newUser: email => {
    const queryString = "https://freebies-api.herokuapp.com/api/user";
    return axios.post(queryString, email);
  },

  // route to get user information
  findUser: userId => {
    const queryString = `https://freebies-api.herokuapp.com/api/user/${userId}`;
    return axios.get(queryString);
  },

  // route to get a user's posted items
  getPostedItems: userId => {
    const queryString = `https://freebies-api.herokuapp.com/api/user/posts/${userId}`;
    return axios.get(queryString);
  }
};
