"use client";

export default function Panier({ cart = [], onRemove }) {
  // Calcul du total
  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Contenu du Panier</h2>

      {cart.length === 0 ? (
        <p className="text-gray-600">Votre panier est vide.</p>
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
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-500">
                    {item.quantity} × ${item.price}
                  </p>
                </div>
              </div>
              {onRemove && (
                <button
                  onClick={() => onRemove(item.id)}
                  className="text-red-500 hover:underline"
                >
                  Supprimer
                </button>
              )}
            </div>
          ))}

          <div className="text-right mt-4">
            <p className="text-xl font-bold">
              Total : ${calculateTotal().toFixed()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
