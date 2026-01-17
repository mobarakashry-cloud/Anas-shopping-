let products = [];

function renderProducts(){
  const list = document.getElementById('productList'); list.innerHTML='';
  products.forEach(p=>{
    const div = document.createElement('div'); div.textContent=`${p.name} - ${p.category} - ${p.price} Pi Coin`;
    list.appendChild(div);
  });
}

document.getElementById('addProductForm').addEventListener('submit', e=>{
  e.preventDefault();
  const product = {
    name: document.getElementById('name').value,
    category: document.getElementById('category').value,
    price: document.getElementById('price').value,
    image: document.getElementById('image').value
  };
  products.push(product);
  renderProducts();
  e.target.reset();
});
