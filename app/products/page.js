import Link from 'next/link';

async function getProducts() {
  const res = await fetch('https://fakestoreapi.com/products');
  if (!res.ok) throw new Error('Erreur lors de la récupération des produits');
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Liste des Produits</h1>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(product => (
          <li key={product.id} className="border p-4 rounded shadow">
            <img src={product.image} alt={product.title} className="h-40 mx-auto object-contain" />
            <h2 className="text-xl font-semibold mt-2">{product.title}</h2>
            <p className="mt-1 font-bold">{product.price} $</p>
            <Link href={`/products/${product.id}`}>
              <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Description
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
