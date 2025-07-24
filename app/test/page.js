 "use client";
 import { useEffect, useState } from "react";
 export default function App() {
 const [count, setCount] = useState(0);
 useEffect(() => {
 console.log(`Le compteur a changé : ${count}`);
 }, [count]); // L'effet s'exécute uniquement quand `count` change.
 return (
 <div>
 <h1>Compteur : {count}</h1>
 <button onClick={() => setCount(count + 1)}>Incrémenter</button>
 </div>
 );
}
