"use client"; // Si vous utilisez Next.js App Router (Next.js 13+)
import { useEffect, useState } from "react";
export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json"); // Accès au fichier dans `public/`
        if (!response.ok) {
          throw new Error("Erreur lors du chargement du fichier JSON");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;
  return (
    <div>
      <h1>Liste des utilisateurs</h1>
      <ul>
        {data.map((user) => (
          <li key={user.id}>
            {user.name} - {user.age} ans
          </li>
        ))}
      </ul>
    </div>
  );
}







