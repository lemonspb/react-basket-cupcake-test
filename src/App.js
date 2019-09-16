import React, { useEffect, useState } from "react";
import "./App.css";
import ModalDetails from "./modal";
import Basket from "./basket";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container, Loader } from "semantic-ui-react";
import MenuBasket from "./menu";
import ListCard from "./list-card";

function App() {

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
    
  },[cardInfo]);

  useEffect(() => {
    localStorage.setItem("storageBasket", JSON.stringify(basketItem));
    setBasketCounter(Object.getOwnPropertyNames(basketItem).length);
  }, [basketItem]);

  const getCartInfo = () => {
    const BASE_URL = `https://5d22b7fd4e05c600146ef4dd.mockapi.io/cupcake/books`;

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
    setCardInfoDetailed(cardInfo[index]);
  }

  function addToBasket(id, name, price, count) {

    setBasketItem({ ...basketItem, [id]: { name, price, count, id } });
  }

  function closeModal(bool) {
    setOpenModal(bool);
  }

  function removeBasketItem(id) {
    delete basketItem[id];
    setBasketItem({ ...basketItem });
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
            addToBasket={addToBasket}
            modalVisible={openModal}
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
