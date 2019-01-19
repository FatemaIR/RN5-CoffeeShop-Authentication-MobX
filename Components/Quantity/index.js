import React from "react";
import { observer } from "mobx-react";

// Navigation
import { withNavigation } from "react-navigation";

// NativeBase Components
import { Text, Button, Icon } from "native-base";

//Store
import CartStore from "../../store/cartStore";
import authstore from "../../store/authStore";

class Quantity extends React.Component {
  navigate() {
    if (authstore.user) {
      this.props.navigation.navigate("CoffeeCart");
    } else {
      this.props.navigation.navigate("Login");
    }
  }

  render() {
    return (
      <Button light transparent onPress={() => this.navigate()}>
        <Text>
          {CartStore.quantity + " "}
          <Icon
            type="FontAwesome"
            name="coffee"
            style={{ color: "white", fontSize: 15 }}
          />
        </Text>
      </Button>
    );
  }
}

export default withNavigation(observer(Quantity));
