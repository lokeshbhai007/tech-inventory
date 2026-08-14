const BASE_URL = import.meta.env.VITE_API_URL;

async function request(endpoint, options = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new Error(errBody.message || `Request failed: ${res.status}`);
  }

  if (res.status === 204) return null;
  return res.json();
}

export const productApi = {
  getAll: () => request("/api/products"),
  getOne: (id) => request(`/api/products/${id}`),
  create: (data) =>
    request("/api/products", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id, data) =>
    request(`/api/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  remove: (id) =>
    request(`/api/products/${id}`, {
      method: "DELETE",
    }),
};
