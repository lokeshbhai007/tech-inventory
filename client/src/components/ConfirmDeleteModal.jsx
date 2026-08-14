export default function ConfirmDeleteModal({ product, onConfirm, onCancel }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
        <h2 className="text-lg font-semibold mb-2">Delete Product?</h2>
        <p className="text-sm text-gray-600 mb-4">
          Are you sure you want to permanently delete{" "}
          <span className="font-medium">"{product.name}"</span>? This cannot
          be undone.
        </p>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 py-2 rounded border border-gray-300 text-sm text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 rounded bg-red-600 text-white text-sm font-medium hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
