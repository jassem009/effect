"use client";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState(["all"]);
  const [selectedCat, setSelectedCat] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [loading, setLoading] = useState(true);

  // Étape 1 + 2 : Fetch produits + catégories
  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch("https://fakestoreapi.com/products").then((res) => res.json()),
      fetch("https://fakestoreapi.com/products/categories").then((res) =>
        res.json()
      ),
    ])
      .then(([productsData, categoriesData]) => {
        setProducts(productsData);
        setFiltered(productsData);
        setCategories(["all", ...categoriesData]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Étapes 3 à 6 : recherche, catégorie, tri, prix min/max
  useEffect(() => {
    if (products.length === 0) return;

    let temp = [...products];

    if (selectedCat !== "all") {
      temp = temp.filter((p) => p.category === selectedCat);
    }

    if (search) {
      temp = temp.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (minPrice) {
      temp = temp.filter((p) => p.price >= parseFloat(minPrice));
    }

    if (maxPrice) {
      temp = temp.filter((p) => p.price <= parseFloat(maxPrice));
    }

    if (sort === "asc") {
      temp.sort((a, b) => a.price - b.price);
    } else if (sort === "desc") {
      temp.sort((a, b) => b.price - a.price);
    } else if (sort === "az") {
      temp.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "za") {
      temp.sort((a, b) => b.title.localeCompare(a.title));
    }

    setFiltered(temp);
  }, [products, selectedCat, search, sort, minPrice, maxPrice]);

  // Étape 7 : réinitialiser tous les filtres
  const resetFilters = () => {
    setSelectedCat("all");
    setSearch("");
    setSort("");
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <div className="p-4">
      <h1 className="text-center text-3xl font-bold mb-8">Produits</h1>

      {/* Filtres */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        {/* Catégories */}
        <select
          className="border p-2 rounded"
          value={selectedCat}
          onChange={(e) => setSelectedCat(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.toUpperCase()}
            </option>
          ))}
        </select>

        {/* Recherche */}
        <input
          type="text"
          placeholder=" Rechercher..."
          className="border p-2 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Prix min */}
        <input
          type="number"
          placeholder="Prix min"
          className="border p-2 rounded w-24"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        {/* Prix max */}
        <input
          type="number"
          placeholder="Prix max"
          className="border p-2 rounded w-24"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        {/* Tri */}
        <select
          className="border p-2 rounded"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">-- Trier --</option>
          <option value="asc">Prix ↑</option>
          <option value="desc">Prix ↓</option>
          <option value="az">Titre A → Z</option>
          <option value="za">Titre Z → A</option>
        </select>

        {/* Bouton reset */}
        <button
          onClick={resetFilters}
          className="bg-green-200 text-green-700 px-3 py-2 rounded hover:bg-green-300"
        >
          Réinitialiser les filtres
        </button>
      </div>

      {/* Affichage produits ou loading */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.length > 0 ? (
            filtered.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.image}
                title={product.title}
                price={product.price}
              />
            ))
          ) : (
            <p className="text-gray-600 col-span-full text-center">
              Aucun produit ne correspond à vos filtres.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
