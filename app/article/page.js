"use client";
import { useSearchParams } from "next/navigation";
export default function Articles() {
const searchParams = useSearchParams();
// Lire les paramètres de requête
const category = searchParams.get("category");
const brand = searchParams.get("brand");
return (
<div className="p-6">
<h1 className="text-2xl font-bold">Produits</h1>
<p>Catégorie : {category || "Toutes les catégories"}</p>
<p>Marque : {brand || "Toutes les marques"}</p>
</div>
);
}