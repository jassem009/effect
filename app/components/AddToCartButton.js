"use client";

import { useRouter } from "next/navigation";

export default function AddToCartButton({ product }) {
  const router = useRouter();

  const handleAddToCart = () => {
    router.push(
      `/cart/${product.id}?title=${encodeURIComponent(product.title)}&price=${
        product.price
      }&image=${encodeURIComponent(product.image)}`
    );
  };

  return (
    <button
      onClick={handleAddToCart}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
    >
      Ajouter au Panier
    </button>
  );
}
