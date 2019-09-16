import React, { useEffect, useState } from "react";
import "./App.css";
import ModalDetails from "./modal";
import Basket from "./basket";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Container, Loader, Icon, Label } from "semantic-ui-react";
import MenuBasket from "./menu";
import ListCard from "./list-card";

function App() {
  const BASE_URL = `https://5d22b7fd4e05c600146ef4dd.mockapi.io/cupcake/books`;

  let itemStorage = JSON.parse(localStorage.getItem("storageBasket")) || {};
  const [cardInfoDetailed, setCardInfoDetailed] = useState([]);
  const [cardInfo, setCardInfo] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoaing] = useState(true);
  const [basketItem, setBasketItem] = useState(itemStorage);
  const [basketCounter, setBasketCounter] = useState(
    Object.getOwnPropertyNames(itemStorage).length
  );

  useEffect(() => {
    getCartInfo();
  }, []);

  const getCartInfo = () => {
    fetch(`${BASE_URL}`).then(async response => {
      if (response.status !== 200) {
        return;
      }
      const data = await response.json();
      setCardInfo(data.books);
      setLoaing(false);
    });
  };

  function getIdBook(index) {
    setOpenModal(true);
    const arr = cardInfo.filter((e, i, arr) => {
      if (i === index) {
        return e;
      }
    });
    setCardInfoDetailed(arr[0]);
  }

  function addBasket(id, name, price, count) {
    itemStorage[id] = { name, price, count, id };
    localStorage.setItem("storageBasket", JSON.stringify(itemStorage));
    setBasketCounter(Object.getOwnPropertyNames(itemStorage).length);
    setBasketItem(itemStorage);
  }

  function closeModal(bool) {
    setOpenModal(bool);
  }

  function removeBasketItem(id) {
    const itemStorage = JSON.parse(localStorage.getItem("storageBasket")) || {};
    delete itemStorage[id];
    localStorage.setItem("storageBasket", JSON.stringify(itemStorage));
    setBasketItem(itemStorage);
    setBasketCounter(Object.getOwnPropertyNames(itemStorage).length);
  }

  return (
    <Router>
      <React.Fragment>
        <Loader active={loading} block="centered" />
        <MenuBasket basketCounter={basketCounter} />
        <Container>
          <Route
            path="/"
            exact
            render={() => (
              <ListCard cardInfo={cardInfo} getIdBook={getIdBook} />
            )}
          />
          <ModalDetails
            detail={cardInfoDetailed}
            addBasket={addBasket}
            openModal={openModal}
            closeModal={closeModal}
          />
          <Route
            path="/basket/"
            exact
            render={() => (
              <Basket
                removeBasketItem={removeBasketItem}
                basketItem={basketItem}
              />
            )}
          />
        </Container>
      </React.Fragment>
    </Router>
  );
}

export default App;
