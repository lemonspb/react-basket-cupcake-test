import React from "react";
import { Card, Image } from "semantic-ui-react";
import "./card.css";

const CardItem = ({ name, image, price, index, getIdBook }) => {
  return (
    <Card
      className="card-item"
      onClick={() => {
        getIdBook(index);
      }}
    >
      <Image src={image} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{name}</Card.Header>
      </Card.Content>
      <Card.Content extra>price:&nbsp;{price}&#36;</Card.Content>
    </Card>
  );
};

export default CardItem;
