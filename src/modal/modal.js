import React, { useState, useEffect } from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import CounterInput from "react-counter-input";

function ModalDetails({ detail, addToBasket, modalVisible, closeModal }) {
  const [counter, setCounter] = useState(1);
  const [totalPrice, setTotalPrice] = useState(detail.price);
  useEffect(() => {
    setTotalPrice(detail.price);
  }, [detail.price]);

  useEffect(() => setTotalPrice(counter * Math.ceil(detail.price)), [counter,detail.price]);

  useEffect(() => {
    setCounter(1);
  }, [modalVisible]);

  return (
    <div className="modal">
      <Modal
        open={modalVisible}
        size="tiny"
        closeIcon={true}
        onClose={() => {
          closeModal(false);
        }}
      >
        <Modal.Header>More Details</Modal.Header>
        <Modal.Content image>
          <Image wrapped size="medium" src={detail.image} />
          <Modal.Description>
            <Header>{detail.title}</Header>
            <p>{detail.subtitle}</p>
            <div className="modal-counter">
              <div className="modal-counter__price">
                price:&nbsp;{detail.price}&#36;{" "}
              </div>
              <CounterInput
                min={1}
                count={counter}
                onCountChange={count => setCounter(count)}
              />
              <Button
                onClick={() => {
                  addToBasket(detail.isbn13, detail.title, totalPrice, counter);
                }}
                color="green"
              >
                Add Basket
              </Button>
              <div className="modal-counter__total">
                Total:&nbsp;{totalPrice}$
              </div>
            </div>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="red"
            onClick={() => {
              closeModal(false);
            }}
          >
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default ModalDetails;
