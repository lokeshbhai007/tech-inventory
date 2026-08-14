import { useEffect, useMemo, useState } from "react";
import { productApi } from "../services/api.js";
import ProductGrid from "../components/ProductGrid.jsx";
import SearchBar from "../components/SearchBar.jsx";
import ProductForm from "../components/ProductForm.jsx";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal.jsx";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [search, setSearch] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);

  const loadProducts = async () => {
    setLoading(true);
    setLoadError("");
    try {
      const data = await productApi.getAll();
      setProducts(data);
    } catch (err) {
      setLoadError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!search.trim()) return products;
    const q = search.toLowerCase();
    return products.filter((p) => p.name.toLowerCase().includes(q));
  }, [products, search]);

  const openAddForm = () => {
    setEditingProduct(null);
    setFormOpen(true);
  };

  const openEditForm = (product) => {
    setEditingProduct(product);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingProduct(null);
  };

  const handleFormSubmit = async (data) => {
    if (editingProduct) {
      const updated = await productApi.update(editingProduct._id, data);
      setProducts((prev) =>
        prev.map((p) => (p._id === updated._id ? updated : p))
      );
    } else {
      const created = await productApi.create(data);
      setProducts((prev) => [created, ...prev]);
    }
    closeForm();
  };

  const handleDeleteConfirm = async () => {
    try {
      await productApi.remove(deletingProduct._id);
      setProducts((prev) =>
        prev.filter((p) => p._id !== deletingProduct._id)
      );
    } catch (err) {
      setLoadError(err.message);
    } finally {
      setDeletingProduct(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Tech Inventory Manager
        </h1>
        <div className="flex items-center gap-3">
          <SearchBar value={search} onChange={setSearch} />
          <button
            onClick={openAddForm}
            className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded hover:bg-blue-700 whitespace-nowrap"
          >
            + Add Product
          </button>
        </div>
      </div>

      {loading && <p className="text-gray-400">Loading products...</p>}

      {loadError && (
        <p className="text-sm text-red-500 bg-red-50 rounded px-3 py-2 mb-4">
          {loadError}
        </p>
      )}

      {!loading && !loadError && (
        <ProductGrid
          products={filteredProducts}
          onEdit={openEditForm}
          onDelete={setDeletingProduct}
        />
      )}

      {formOpen && (
        <ProductForm
          initialData={editingProduct}
          onSubmit={handleFormSubmit}
          onClose={closeForm}
        />
      )}

      <ConfirmDeleteModal
        product={deletingProduct}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingProduct(null)}
      />
    </div>
  );
}
