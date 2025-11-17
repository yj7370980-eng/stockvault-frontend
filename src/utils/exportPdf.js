import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function exportInventoryPdf(products) {
  const doc = new jsPDF();

  doc.text('Inventory Report', 14, 20);

  const rows = products.map(({ id, name, category, price, stock }) => [
    id, name, category, price, stock,
  ]);

  autoTable(doc, {
    head: [['ID', 'Name', 'Category', 'Price (₹)', 'Stock/Status']],
    body: rows,
    startY: 30,
  });

  doc.save('report.pdf');
}
