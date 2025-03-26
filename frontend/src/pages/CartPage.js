import React, { useState } from "react";

function CartPage() {
  const [cart, setCart] = useState([
    { id: 1, name: "Producto 1", price: 100, quantity: 2 },
    { id: 2, name: "Producto 2", price: 200, quantity: 1 },
  ]);

  const handleRemove = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id, quantity) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h1>Carrito de Compras</h1>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price} x{" "}
              <input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(item.id, parseInt(e.target.value))
                }
                min="1"
              />
              <button onClick={() => handleRemove(item.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
      <h2>Total: ${total}</h2>
    </div>
  );
}

export default CartPage;
