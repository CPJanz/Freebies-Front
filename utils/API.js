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
  
  signIn: email => {
  const queryString = "https://freebies-api.herokuapp.com/api/user/" + email;
  return axios.get(queryString);
  },

  createUser: email => {
    const queryString = "https://freebies-api.herokuapp.com/api/user/";
    return axios.post(queryString, { email: email });
  },

  postNewItem: itemObject => {
    console.log("new item: ", itemObject);
    const queryString = `https://freebies-api.herokuapp.com/api/item/${itemObject.giverId}`;
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

  // route to get a user's posted items
  findGiven: userId => {
    const queryString = `https://freebies-api.herokuapp.com/api/item/${userId}`;
    return axios.get(queryString);
  }
};
