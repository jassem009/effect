import React from "react";

export default function ProductCardDetails({ product }) {
  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-64 object-contain mb-4"
      />
      <p className="text-lg font-semibold text-gray-700">
        ${product.price}
      </p>
      <p className="text-gray-600 mt-4">{product.description}</p>
    </div>
  );
}
