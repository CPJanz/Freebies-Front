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
  }
};
