"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Panier from "@/app/components/panier";
import Header from "@/app/components/header";

export default function Cart() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [cart, setCart] = useState([]);

  const product = {
    id,
    title: searchParams.get("title") || "Produit inconnu",
    price: parseFloat(searchParams.get("price")) || 0,
    image: searchParams.get("image") || "https://via.placeholder.com/150",
  };

  // Ajouter le produit automatiquement si présent dans l'URL
  useEffect(() => {
    if (!product.id) return;

    setCart((prevCart) => {
      const exists = prevCart.find((item) => item.id === product.id);
      if (exists) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  }, [product.id]);

  const handleAddToCart = () => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleGoBack = () => {
    router.push("/products");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Détails du produit */}
      <h1 className="text-3xl font-bold mb-4">Détails Produit</h1>
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-2xl font-bold">{product.title}</h2>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-64 object-cover rounded my-4"
        />
        <p className="text-lg text-gray-700 mb-4">${product.price}</p>
        <button
          onClick={handleAddToCart}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Ajouter au Panier
        </button>
      </div>

      {/* Panier */}
      <h1 className="text-3xl font-bold mb-4">Panier</h1>
      {cart.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <div className="bg-white p-4 rounded shadow">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center mb-4"
            >
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="ml-4">
                  <h2 className="text-lg font-bold">{item.title}</h2>
                  <p className="text-gray-500">
                    Quantité : {item.quantity} x ${item.price}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleRemoveFromCart(item.id)}
                className="text-red-500 hover:underline"
              >
                Supprimer
              </button>
            </div>
          ))}
          <div className="text-right">
            <p className="text-xl font-bold">
              Total : ${calculateTotal().toFixed(2)}
            </p>
          </div>
        </div>
      )}

      {/* Bouton retour */}
      <div className="mt-6">
        <button
          onClick={handleGoBack}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
        >
          Retour à la liste des produits
        </button>
      </div>

      {/* Composant externe Panier */}
      <Panier cart={cart} />
    
  
    </div>
  );
}
