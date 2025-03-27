import React, { useState } from "react";

function AddProductPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price: parseFloat(price) }),
      });

      if (!response.ok) {
        throw new Error("Error adding product");
      }

      alert("Producto agregado exitosamente");
      setName("");
      setPrice("");
    } catch (error) {
      console.error(error);
      alert("Error al agregar el producto");
    }
  };

  return (
    <div>
      <h1>Agregar Producto</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
}

export default AddProductPage;
