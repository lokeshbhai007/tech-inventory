import { useState, useEffect } from "react";

const emptyForm = {
  name: "",
  description: "",
  buyingPrice: "",
  sellingPrice: "",
  quantity: "",
};

export default function ProductForm({ initialData, onSubmit, onClose }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        description: initialData.description || "",
        buyingPrice: initialData.buyingPrice ?? "",
        sellingPrice: initialData.sellingPrice ?? "",
        quantity: initialData.quantity ?? "",
      });
    } else {
      setForm(emptyForm);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || form.buyingPrice === "" || form.sellingPrice === "") {
      setError("Name, buying price and selling price are required.");
      return;
    }

    try {
      await onSubmit({
        name: form.name,
        description: form.description,
        buyingPrice: Number(form.buyingPrice),
        sellingPrice: Number(form.sellingPrice),
        quantity: Number(form.quantity) || 0,
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-lg font-semibold mb-4">
          {initialData ? "Edit Product" : "Add Product"}
        </h2>

        {error && (
          <p className="text-sm text-red-500 bg-red-50 rounded px-3 py-2 mb-3">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-sm text-gray-600">Product Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm mt-1"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={2}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-gray-600">Buying Price</label>
              <input
                type="number"
                name="buyingPrice"
                value={form.buyingPrice}
                onChange={handleChange}
                min="0"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm mt-1"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Selling Price</label>
              <input
                type="number"
                name="sellingPrice"
                value={form.sellingPrice}
                onChange={handleChange}
                min="0"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm mt-1"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              min="0"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm mt-1"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 rounded border border-gray-300 text-sm text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 rounded bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
            >
              {initialData ? "Save Changes" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
