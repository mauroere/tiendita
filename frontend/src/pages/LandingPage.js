import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  const products = [
    { id: 1, name: "Producto 1", price: 100 },
    { id: 2, name: "Producto 2", price: 200 },
  ];

  return (
    <div>
      <h1>Bienvenido a Tiendita</h1>
      <p>Explora nuestros productos destacados.</p>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/product/${product.id}`}>{product.name}</Link> - $
            {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LandingPage;
