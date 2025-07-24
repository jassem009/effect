"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProductDetails({ product }) {
  const router = useRouter();

  const handleAddToCart = () => {
    router.push(
      `/cart/${product.id}?title=${encodeURIComponent(product.title)}&price=${encodeURIComponent(
        product.price
      )}&image=${encodeURIComponent(product.image)}`
    );
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-bold">{product.title}</h2>
      <div className="relative w-full h-64 my-4 rounded overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
      <p className="text-lg text-gray-700 mb-4">${product.price}</p>
      <button
        onClick={handleAddToCart}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
        aria-label={`Add ${product.title} to cart`}
      >
        Ajouter au Panier
      </button>
    </div>
  );
}
