/*export default function ProductCard({ image, title, price }) {
  return (
    //compléter le code
    <div
      className="border rounded shadow-lg hover:shadow-xl transition-shadow
 duration-300 p-4"
    >
      <img
        src={image}
        alt={title}
        className="h-40 w-full object-cover rounded"
      />
      <h3 className="mt-4 text-lg font-bold">{title}</h3>
      <p className="text-primary font-semibold">${price}</p>
    </div>
  );
}*/

"use client";
import { useRouter } from "next/navigation";

export default function ProductCard({ image, title, price, id }) {
  const router = useRouter();

  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      <img src={image} alt={title} className="w-full h-40 object-contain mb-4" />
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-blue-600 font-bold mb-2">{price} $</p>
      <button
        onClick={() => router.push(`/produits/${id}`)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300 mt-4"
      >
        Voir détails
      </button>
    </div>
  );
}



