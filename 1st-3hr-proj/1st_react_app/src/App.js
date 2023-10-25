import React, { useState, useEffect } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [productName, setProductName] = useState("");

  useEffect(() => {
    // Load product data from local storage on app load
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, []);

  const addProduct = () => {
    const newProduct = {
      id: productId,
      price: parseFloat(sellingPrice),
      Name: productName,
    };

    setProducts([...products, newProduct]);

    // Save product data to local storage
    localStorage.setItem("products", JSON.stringify([...products, newProduct]));

    setProductId("");
    setSellingPrice("");
    setProductName("");
  };

  const deleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);

    // Update local storage when deleting a product
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const total = products.reduce((sum, product) => sum + product.price, 0);

  return (
    <div>
      <h1>Book Seller</h1>
      <div>
        <input
          type="text"
          placeholder="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Selling Price"
          value={sellingPrice}
          onChange={(e) => setSellingPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <button onClick={addProduct}>Add</button>
      </div>
      <ProductList products={products} deleteProduct={deleteProduct} />
      <p>Total Price: {total}</p>
    </div>
  );
}

function ProductList({ products, deleteProduct }) {
  return (
    <ul>
      {products.map((product) => (
        <Product
          key={product.id}
          product={product}
          Name={product.Name}
          deleteProduct={deleteProduct}
        />
      ))}
    </ul>
  );
}

function Product({ product, deleteProduct }) {
  return (
    <li>
      Product ID: {product.id}, Selling Price: {product.price}
      <button onClick={() => deleteProduct(product.id)}>Delete</button>
    </li>
  );
}

export default App;
