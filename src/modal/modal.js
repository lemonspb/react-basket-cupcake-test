import React,{useState} from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import CounterInput from "react-counter-input";

function ModalDetails({detail,addBasket,openModal,closeModal}) {

const [ counter, setCounter] = useState(1)

const [stateModal, setStateModal] =  useState(false)


if(stateModal){
  setCounter(1)
}


  return (

<div className='modal'>
  <Modal open={openModal} size='tiny' closeIcon >
    <Modal.Header>More Details</Modal.Header>
    <Modal.Content image>
      <Image wrapped size='medium' src={detail.image} />
      <Modal.Description>
        <Header >{detail.title}</Header>
       
        <p>{detail.subtitle}</p>
        <Modal.Actions>
        <div>price:&nbsp;{detail.price}&#36; </div>
         <span>{counter}&nbsp;X&nbsp;{detail.price}</span>
        <CounterInput
        min={1}
        count= {counter}
        onCountChange={count => setCounter(count )}
      />
    <Button onClick ={()=>{addBasket(detail.isbn13,detail.title,detail.price,counter )}}>Add Basket</Button>
    </Modal.Actions>

      </Modal.Description>

    </Modal.Content>
    <Modal.Actions>
    <Button color='red' onClick={()=>{closeModal(stateModal)}}>Close</Button>
    </Modal.Actions>

  </Modal>

 </div>
  );
}

export default ModalDetails;
