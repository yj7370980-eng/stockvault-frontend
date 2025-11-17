import React, { useEffect, useState } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  // Add states for search, filter, sort, pagination if needed
  const [searchText, setSearchText] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = new URLSearchParams({
          search: searchText,
          category: categoryFilter,
          sortKey: sortConfig.key,
          sortDirection: sortConfig.direction,
          page,
          limit: rowsPerPage,
        });

        const response = await fetch(`http://localhost:5000/api/products?${params.toString()}`); // Removed authorization header

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data.products || []); // Adjust if backend response shape is different
        setError('');
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProducts();
  }, [searchText, categoryFilter, sortConfig, page, rowsPerPage]);

  if (error) return <div>{error}</div>;

  return (
    <ul>
      {products.map((p) => (
        <li key={p._id}>
          {p.name} - ₹{p.price} - Qty: {p.quantity}
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
