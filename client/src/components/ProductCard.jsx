export default function ProductCard({ product, onEdit, onDelete }) {
  const { name, description, buyingPrice, sellingPrice, quantity } = product;

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>

      {description && (
        <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
      )}

      <div className="text-sm text-gray-600 mt-1 space-y-1">
        <div className="flex justify-between">
          <span>Buying Price</span>
          <span className="font-medium">₹{buyingPrice}</span>
        </div>
        <div className="flex justify-between">
          <span>Selling Price</span>
          <span className="font-medium">₹{sellingPrice}</span>
        </div>
        <div className="flex justify-between">
          <span>Stock</span>
          <span
            className={`font-medium ${
              quantity === 0 ? "text-red-500" : "text-gray-800"
            }`}
          >
            {quantity === 0 ? "Out of stock" : quantity}
          </span>
        </div>
      </div>

      <div className="flex gap-2 mt-3">
        <button
          onClick={() => onEdit(product)}
          className="flex-1 bg-blue-50 text-blue-600 text-sm font-medium py-1.5 rounded hover:bg-blue-100"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(product)}
          className="flex-1 bg-red-50 text-red-600 text-sm font-medium py-1.5 rounded hover:bg-red-100"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
