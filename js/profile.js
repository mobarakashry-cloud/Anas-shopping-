// بيانات وهمية للمستخدم
const user = { name: "محمد", orders: ["هاتف ذكي", "أريكة"] };
document.getElementById('username').textContent = user.name;
const ordersList = document.getElementById('ordersList');
user.orders.forEach(order=>{
  const li = document.createElement('li'); li.textContent=order;
  ordersList.appendChild(li);
});
