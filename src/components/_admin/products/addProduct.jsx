import React from 'react';
// components
import ProductForm from 'src/components/forms/product';

export default function addProduct(props) {
  return (
    <div>
      <ProductForm {...props} />
    </div>
  );
}
