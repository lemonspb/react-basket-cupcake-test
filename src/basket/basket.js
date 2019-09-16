import React  from "react";
import { Button, Table } from "semantic-ui-react";

const Basket = ({ removeBasketItem, basketItem }) => {


  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Price</Table.HeaderCell>
          <Table.HeaderCell>Count</Table.HeaderCell>
          <Table.HeaderCell>Delete item</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {Object.values(basketItem).map(({ name, count, price, id }) => (
          <Table.Row key={id}>
            <Table.Cell>{name}</Table.Cell>
            <Table.Cell>{price}&#36;</Table.Cell>
            <Table.Cell>{count}</Table.Cell>
            <Table.Cell>
              <Button color='red'
                onClick={() => {
                  removeBasketItem(id);
                }}
              >
                Delete
              </Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default Basket;
