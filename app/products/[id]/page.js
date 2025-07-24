// Ce fichier est un server component (pas de "use client")

import AddToCartButton from "@/app/components/AddToCartButton";

// 1. Récupération des détails produit
async function getProduct(id) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) throw new Error("Produit introuvable");
  return res.json();
}

// 2. Générer les metadata dynamiquement
export async function generateMetadata({ params }) {
  const product = await getProduct(params.id);

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.image],
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description,
    },
  };
}

// 3. Composant de page
export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Détails Produit</h1>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-2xl font-bold">{product.title}</h2>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-64 object-cover rounded my-4"
        />
        <p className="text-lg text-gray-700 mb-4">${product.price}</p>
        {/* Pas de router.push ici, car c’est un composant serveur */}
       <AddToCartButton product={product}/>
      </div>
    </div>
  );
}
