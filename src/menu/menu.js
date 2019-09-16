import React from "react";
import { Menu, Label, Icon, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";

const MenuBasket = ({ basketCounter }) => (
  <Menu>
    <Menu.Item position="left">
      <Link to="/">
        <Header>
          Book shop <Icon name="book" />{" "}
        </Header>
      </Link>
    </Menu.Item>
    <Menu.Item position="right">
      <Label>
        <Link to="/basket/">
          <Icon name="shop" />
          <span className="counter">{basketCounter} </span>
        </Link>
      </Label>
    </Menu.Item>
  </Menu>
);

export default MenuBasket;
