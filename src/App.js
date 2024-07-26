import React, { useState } from 'react';
import ProductSelection from './components/ProductSelection';
import axios from 'axios';
import './App.css';

const App = () => {
  const [selections, setSelections] = useState([{ product: '', quantity: '' }]);
  const [order, setOrder] = useState([]);
  const products = ['Pencil', 'Eraser', 'Pen', 'Book'];

  const handleProductChange = (index, product) => {
    const newSelections = [...selections];
    newSelections[index].product = product;
    setSelections(newSelections);
  };

  const handleQuantityChange = (index, quantity) => {
    const newSelections = [...selections];
    newSelections[index].quantity = quantity;
    setSelections(newSelections);
  };

  const handleAddRow = () => {
    if (selections.length < 8) {
      setSelections([...selections, { product: '', quantity: '' }]);
    }
  };

  const handleShowOrder = () => {
    const filledSelections = selections.filter(s => s.product && s.quantity);
    setOrder(filledSelections);
  };

  const handleVoiceOrder = () => {
    const orderText = order.map(o => `${o.quantity} of ${o.product}`).join(', ');
    axios.post('http://localhost:5000/speak', { text: orderText }, { responseType: 'blob' })
      .then(response => {
        const audioUrl = URL.createObjectURL(response.data);
        const audio = new Audio(audioUrl);
        audio.play();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="container">
      <h1 className="headline">Product Order List</h1>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {selections.map((_, idx) => (
            <ProductSelection
              key={idx}
              index={idx}
              products={products}
              handleProductChange={handleProductChange}
              handleQuantityChange={handleQuantityChange}
            />
          ))}
        </tbody>
      </table>
      <div className="button-container">
        {selections.length < 8 && <button className="modern-button" onClick={handleAddRow}>Add</button>}
        <button className="modern-button" onClick={handleShowOrder}>Show Order</button>
      </div>
      {order.length > 0 && (
        <div className="order-section">
          <h2>Your Order:</h2>
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {order.map((o, idx) => (
                <tr key={idx}>
                  <td>{o.product}</td>
                  <td>{o.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="modern-button" onClick={handleVoiceOrder}>What is my Order?</button>
        </div>
      )}
    </div>
  );
};

export default App;
