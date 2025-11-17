import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Button, Table, TableHead, TableRow,
  TableCell, TableBody, TablePagination, TextField, Checkbox,
  Dialog, DialogTitle, DialogContent, Link, Stack, Chip
} from '@mui/material';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


import AddProductForm from '../components/AddProductForm';
import EditProductForm from '../components/EditProductForm';
import BulkActions from '../components/BulkActions';
import CategoryFilter from '../components/CategoryFilter';
import ProductDetailModal from '../components/ProductDetailModal';

const categories = ["Men's Clothing", "Women's Clothing", "Kid's Wear", "Accessories"];
const API_BASE_URL = 'http://localhost:5000';

export default function Products() {
  const [searchText, setSearchText] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalCount, setTotalCount] = useState(0);

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [productToView, setProductToView] = useState(null);

  const [selectedIds, setSelectedIds] = useState(new Set());

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');
      try {
        const params = new URLSearchParams({
          search: searchText,
          category: categoryFilter,
          sortKey: sortConfig.key,
          sortDirection: sortConfig.direction,
          page,
          limit: rowsPerPage,
        });

        const response = await fetch(`${API_BASE_URL}/api/products?${params.toString()}`); // Removed Authorization header
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setInventory(data.products || []);
        setTotalCount(data.totalCount || 0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchText, categoryFilter, sortConfig, page, rowsPerPage]);

  const getStockStatus = (quantity) => {
    if (quantity === 0) return <Chip label="Out of Stock" color="error" size="small" />;
    if (quantity < 5) return <Chip label="Low Stock" color="warning" size="small" />;
    return <Chip label="In Stock" color="success" size="small" />;
  };

  const toggleSelectId = (id) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(new Set(inventory.map((item) => item._id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleBulkDelete = async () => {
    if (!window.confirm(`Delete ${selectedIds.size} selected products?`)) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/bulk-delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: Array.from(selectedIds) }),
      });
      if (!response.ok) throw new Error('Failed to bulk delete');
      setSelectedIds(new Set());
      setPage(0);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleExportCSV = () => {
    const header = ['ID', 'Name', 'Category', 'Price', 'Quantity'];
    const rows = inventory.map(item => [item._id, `"${item.name}"`, `"${item.category}"`, item.price, item.quantity]);
    const csv = [header, ...rows].map(e => e.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'products.csv');
  };

 const handleExportPDF = () => {
  const doc = new jsPDF();
  autoTable(doc, {
    head: [['ID', 'Name', 'Category', 'Price (₹)', 'Quantity']],
    body: inventory.map(({ _id, name, category, price, quantity }) => [_id, name, category, price, quantity]),
    startY: 30,
  });
  doc.text('Inventory Report', 14, 20);
  doc.save('inventory_report.pdf');
};


  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddOpen = () => setOpenAdd(true);
  const handleAddClose = () => setOpenAdd(false);

  const handleEditOpen = (product) => {
    setProductToEdit(product);
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setProductToEdit(null);
    setOpenEdit(false);
  };

  const handleDetailOpen = (product) => {
    setProductToView(product);
    setOpenDetail(true);
  };

  const handleDetailClose = () => {
    setProductToView(null);
    setOpenDetail(false);
  };

  const handleAddSubmit = async (newProduct) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
      if (!response.ok) throw new Error('Failed to add product');
      setOpenAdd(false);
      setPage(0);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEditSubmit = async (updatedProduct) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/${updatedProduct._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });
      if (!response.ok) throw new Error('Failed to update product');
      setOpenEdit(false);
      setPage(0);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={3} sx={{ fontWeight: 600 }}>
        Products Inventory
      </Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={2} alignItems="center">
        <TextField
          label="Search by name or category"
          variant="outlined"
          size="small"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          sx={{ minWidth: 250 }}
        />

        <CategoryFilter
          category={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          categories={categories}
        />

        <BulkActions
          selectedCount={selectedIds.size}
          onDelete={handleBulkDelete}
          onExport={handleExportCSV}
        />

        <Button variant="contained" color="primary" onClick={handleAddOpen}>
          Add New Product
        </Button>

        <Button variant="outlined" onClick={handleExportPDF}>
          Export PDF
        </Button>
      </Stack>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selectedIds.size > 0 && selectedIds.size < (inventory?.length || 0)}
                    checked={selectedIds.size === (inventory?.length || 0) && (inventory?.length || 0) > 0}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell onClick={() => requestSort('name')} sx={{ cursor: 'pointer' }}>
                  Name {sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                </TableCell>
                <TableCell onClick={() => requestSort('category')} sx={{ cursor: 'pointer' }}>
                  Category {sortConfig.key === 'category' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                </TableCell>
                <TableCell onClick={() => requestSort('price')} sx={{ cursor: 'pointer' }}>
                  Price (₹) {sortConfig.key === 'price' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                </TableCell>
                <TableCell onClick={() => requestSort('quantity')} sx={{ cursor: 'pointer' }}>
                  Quantity {sortConfig.key === 'quantity' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                </TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(inventory || []).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
                <TableRow key={item._id} selected={selectedIds.has(item._id)}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedIds.has(item._id)}
                      onChange={() => toggleSelectId(item._id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Link
                      component="button"
                      variant="body2"
                      onClick={() => handleDetailOpen(item)}
                    >
                      {item.name}
                    </Link>
                  </TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{getStockStatus(item.quantity)}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleEditOpen(item)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <TablePagination
            component="div"
            count={totalCount}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </>
      )}

      {/* Add Product Dialog */}
      <Dialog open={openAdd} onClose={handleAddClose}>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <AddProductForm onSubmit={handleAddSubmit} onCancel={handleAddClose} />
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={openEdit} onClose={handleEditClose}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          {productToEdit && (
            <EditProductForm
              productData={productToEdit}
              onSubmit={handleEditSubmit}
              onCancel={handleEditClose}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Product Detail Dialog */}
      <ProductDetailModal
        open={openDetail}
        onClose={handleDetailClose}
        product={productToView}
      />
    </Box>
  );
}
