fetch('data.json')
  .then(res => res.json())
  .then(data => {
    displayCategories(data.categories);
    displayProducts(data.products);

    document.getElementById('searchInput').addEventListener('input', e => {
      const filtered = data.products.filter(p =>
        p.name.includes(e.target.value) || p.category.includes(e.target.value)
      );
      displayProducts(filtered);
    });
  });

function displayCategories(categories){
  const list = document.getElementById('categoryList'); list.innerHTML='';
  categories.forEach(cat=>{
    const div=document.createElement('div'); div.className='category-item'; div.textContent=cat;
    div.addEventListener('click',()=>filterByCategory(cat)); list.appendChild(div);
  });
}

function displayProducts(products){
  const list = document.getElementById('productList'); list.innerHTML='';
  products.forEach(p=>{
    const div=document.createElement('div'); div.className='product-item';
    div.innerHTML=`<img src="${p.image}" alt="${p.name}"><h3>${p.name}</h3><p>السعر: ${p.price} Pi Coin</p>`;
    list.appendChild(div);
  });
}

function filterByCategory(cat){
  fetch('data.json').then(res=>res.json()).then(data=>{
    displayProducts(data.products.filter(p=>p.category===cat));
  });
}
