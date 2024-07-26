import React, { useState } from 'react';

const ProductSelection = ({ products, index, handleProductChange, handleQuantityChange }) => {
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleProductSelect = (e) => {
    setProduct(e.target.value);
    handleProductChange(index, e.target.value);
  };

  const handleQuantitySelect = (e) => {
    setQuantity(e.target.value);
    handleQuantityChange(index, e.target.value);
  };

  return (
    <tr>
      <td>
        <select value={product} onChange={handleProductSelect}>
          <option value="">Choose Product</option>
          {products.map((p, idx) => (
            <option key={idx} value={p}>{p}</option>
          ))}
        </select>
      </td>
      <td>
        <select value={quantity} onChange={handleQuantitySelect}>
          <option value="">Choose Quantity</option>
          {[0, 1, 2, 3, 4, 5].map((q) => (
            <option key={q} value={q}>{q}</option>
          ))}
        </select>
      </td>
    </tr>
  );
};

export default ProductSelection;
