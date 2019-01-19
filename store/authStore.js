import { decorate, observable } from "mobx";
import { observer } from "mobx-react";
import axios from "axios";
import { AsyncStorage } from "react-native";
import jwt_decode from "jwt-decode";
import { withNavigation } from "react-navigation";

class AuthStore {
  constructor() {
    this.user = null;
    this.isAuthenticated = false;
  }

  setCurrentUser(token) {
    if (token) {
      axios.defaults.headers.common.Authorization = `jwt ${token}`;
      const decodedUser = jwt_decode(token);
      this.user = decodedUser;
      this.isAuthenticated = true;
    } else {
      this.user = null;
      this.isAuthenticated = false;
    }
  }

  setAuthToken(token) {
    if (token) {
      return AsyncStorage.setItem("myToken", token).then(() => {
        axios.defaults.headers.common.Authorization = `jwt ${token}`;
      });
    } else {
      return AsyncStorage.removeItem("myToken").then(() => {
        delete axios.defaults.headers.common.Authorization;
        this.user = null;
      });
    }
  }

  checkForToken() {
    return AsyncStorage.getItem("myToken")
      .then(res => res.data)
      .then(token => {
        if (token) {
          const currentTime = Date.now() / 1000;
          const user = jwt_decode(token);
          if (user.exp > currentTime) {
            this.setAuthToken(token);
            this.setCurrentUser(token);
          } else {
            this.setAuthToken();
          }
        }
      });
  }

  loginUser(userData, navigation) {
    axios
      .post("http://coffee.q8fawazo.me/api/login/", userData)
      .then(res => res.data)
      .then(user => {
        this.setAuthToken(user.token);
        this.setCurrentUser(user.token);
      })
      .then(() => {
        navigation.replace("CoffeeList");
      });
  }

  registerUser(userData, navigation) {
    axios
      .post("http://coffee.q8fawazo.me/api/register/", userData)
      .then(res => res.data)
      .then(user => {
        this.loginUser(userData, navigation);
      })
      .catch(err => console.error(err.response.data));
  }

  logoutUser() {
    this.user = null;
    this.setAuthToken();
    this.setCurrentUser();
  }
}

decorate(AuthStore, {
  user: observable,
  isAuthenticated: observable
});

const authstore = new AuthStore();
export default withNavigation(authstore);
