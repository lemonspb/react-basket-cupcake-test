import React from "react";
import { List } from "semantic-ui-react";
import CardItem from "../card";

const ListCard = ({ cardInfo, getIdBook }) => (
  <List>
    {cardInfo.map((books, i) => (
      <List.Item>
        <CardItem
          key={books.isbn13}
          name={books.title}
          price={books.price}
          image={books.image}
          index={i}
          getIdBook={getIdBook}
        />
      </List.Item>
    ))}
  </List>
);

export default ListCard;
