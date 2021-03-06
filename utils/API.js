import axios from "axios";

export default {
  getNearbyItems: location => {
    console.log(
      `Getting items near: ${location.latitude}, ${location.longitude}`
    );
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
    console.log("new item: ", JSON.stringify(itemObject));
    const queryString = `https://freebies-api.herokuapp.com/api/item/${
      itemObject.giverId
    }`;
    axios.post(queryString, itemObject);
  },
  // route for updating item as taken
  takeItem: (id, available) => {
    const queryString = "https://freebies-api.herokuapp.com/api/item/" + id;
    return axios.put(queryString, { available: available });
  },

  // route for reposting an item
  itemRepost: itemId => {
    const queryString = `https://freebies-api.herokuapp.com/api/item/repost/${itemId}`;
    return axios.put(queryString);
  },

  // route for deleting an item
  itemDelete: (itemId, userId) => {
    console.log("Deleting", JSON.stringify(itemId));
    const queryString = `https://freebies-api.herokuapp.com/api/item/${itemId}`;
    return axios.delete(queryString, { userId: userId });
  },

  // route to get a user's posted items
  findGiven: userId => {
    const queryString = `https://freebies-api.herokuapp.com/api/item/${userId}`;
    return axios.get(queryString);
  },

  // route to delete user account
  deleteUser: userId => {
    const queryString = `https://freebies-api.herokuapp.com/api/user/${userId}`;
    return axios.delete(queryString);
  }
};
