import React, { Component } from "react";
import { observer } from "mobx-react";

// navigation
import { withNavigation } from "react-navigation";
// NativeBase Components
import {
  Icon,
  Button,
  Text,
  Footer,
  FooterTab,
  List,
  Content
} from "native-base";

// Store
import authStore from "../../store/authStore";

class CoffeeFooter extends Component {
  loginButton() {
    return (
      <Button vertical onPress={() => this.props.navigation.navigate("Login")}>
        <Text>Login</Text>
      </Button>
    );
  }

  logoutButton() {
    return (
      <Button vertical onPress={() => authStore.logoutUser()}>
        <Text>Logout</Text>
      </Button>
    );
  }

  render() {
    return (
      <Footer>
        <FooterTab>
          {authStore.user ? this.logoutButton() : this.loginButton()}
        </FooterTab>
      </Footer>
    );
  }
}

export default withNavigation(observer(CoffeeFooter));
