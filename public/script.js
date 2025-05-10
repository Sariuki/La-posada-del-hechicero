const API_URL = 'https://TU_BACKEND_RENDER.onrender.com/api/products';
const container = document.getElementById('product-list');
const category = container.dataset.category || null;

// Crear filtros dinámicos
const createFilters = () => {
  const form = document.createElement('form');
  form.innerHTML = `
    <input type="text" id="filter-name" placeholder="Buscar por nombre" />
    <input type="number" id="filter-price" placeholder="Precio máximo" />
    <label><input type="checkbox" id="filter-stock" /> Solo con stock</label>
  `;
  container.parentNode.insertBefore(form, container);
  form.addEventListener('input', renderProducts);
};

// Guardar productos cargados
let products = [];

const loadProducts = async () => {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    products = category ? data.filter(p => p.category === category) : data;
    renderProducts();
  } catch (err) {
    container.textContent = 'Error cargando productos';
  }
};

const renderProducts = () => {
  const nameFilter = document.getElementById('filter-name')?.value.toLowerCase() || '';
  const priceFilter = parseFloat(document.getElementById('filter-price')?.value) || Infinity;
  const stockFilter = document.getElementById('filter-stock')?.checked;

  const filtered = products.filter(p => {
    const matchesName = p.name.toLowerCase().includes(nameFilter);
    const matchesPrice = p.price <= priceFilter;
    const matchesStock = stockFilter ? p.stock > 0 : true;
    return matchesName && matchesPrice && matchesStock;
  });

  container.innerHTML = '';

  if (filtered.length === 0) {
    container.innerHTML = '<p>No hay productos que coincidan.</p>';
    return;
  }

  filtered.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <p><strong>$${p.price}</strong></p>
      <p>Stock: ${p.stock}</p>
    `;
    container.appendChild(div);
  });
};

createFilters();
loadProducts();
