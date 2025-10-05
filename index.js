let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let currentCurrency = 'INR';
const currencies = { INR:1, USD:0.012, EUR:0.011, GBP:0.0097 };

const expenseForm = document.getElementById('expense-form');
const tableBody = document.querySelector('#expense-table tbody');
const filterCategory = document.getElementById('filter-category');
const filterFrom = document.getElementById('filter-from');
const filterTo = document.getElementById('filter-to');
const searchInput = document.getElementById('search');
const currencySelector = document.getElementById('currency-selector');
const totalSpentEl = document.getElementById('total-spent');
const transactionCountEl = document.getElementById('transaction-count');
const categoryChartCtx = document.getElementById('category-chart').getContext('2d');
const trendChartCtx = document.getElementById('trend-chart').getContext('2d');
let categoryChart, trendChart;

function saveExpenses() { localStorage.setItem('expenses', JSON.stringify(expenses)); }
function formatAmount(amount){ return `${currentCurrency} ${(amount*currencies[currentCurrency]).toFixed(2)}`; }

// Recurring auto-add
function addRecurringExpenses() {
  const today = new Date(), month = today.getMonth(), year = today.getFullYear();
  expenses.forEach(exp => {
    const expDate = new Date(exp.date);
    if(exp.recurring && (expDate.getMonth()!==month || expDate.getFullYear()!==year)){
      expenses.push({...exp, date: today.toISOString().split('T')[0]});
    }
  });
  saveExpenses();
}

// Render table
function renderExpenses(){
  tableBody.innerHTML = '';
  const filtered = expenses.filter(exp => {
    let pass=true;
    if(filterCategory.value && exp.category!==filterCategory.value) pass=false;
    if(filterFrom.value && exp.date<filterFrom.value) pass=false;
    if(filterTo.value && exp.date>filterTo.value) pass=false;
    if(searchInput.value && !exp.description.toLowerCase().includes(searchInput.value.toLowerCase())) pass=false;
    return pass;
  });

  filtered.forEach((exp,i)=>{
    const tr=document.createElement('tr');
    tr.innerHTML=`<td>${exp.date}</td><td>${exp.category}</td><td>${exp.description||'-'}</td>
    <td>${formatAmount(exp.amount)}</td><td>${exp.recurring?'Yes':'No'}</td>
    <td>
      <button onclick="editExpense(${i})" class="bg-yellow-400">Edit</button>
      <button onclick="deleteExpense(${i})" class="bg-red-500">Delete</button>
    </td>`;
    tableBody.appendChild(tr);
  });
  updateStats(filtered);
  updateCharts(filtered);
}

// Stats & budget progress
function updateStats(list){
  const total = list.reduce((sum,exp)=>sum+Number(exp.amount),0);
  totalSpentEl.textContent=`Total: ${formatAmount(total)}`;
  transactionCountEl.textContent=`Transactions: ${list.length}`;
  updateBudgetProgress(total);
}

// Budget progress bar
function updateBudgetProgress(total){
  const budget=20000;
  const perc=Math.min((total/budget)*100,100);
  const bar=document.getElementById('budget-progress');
  bar.style.width=perc+'%';
  bar.style.backgroundColor=perc<70?'#3b82f6':perc<90?'#facc15':'#ef4444';
  if(total>budget) alert(`Warning! Spending exceeded ${formatAmount(budget)}`);
}

// Charts
function updateCharts(list){
  const catData={}; list.forEach(e=>catData[e.category]=(catData[e.category]||0)+Number(e.amount));
  if(categoryChart) categoryChart.destroy();
  categoryChart=new Chart(categoryChartCtx,{type:'pie',data:{labels:Object.keys(catData),datasets:[{data:Object.values(catData),backgroundColor:['#f87171','#60a5fa','#34d399','#fbbf24','#a78bfa','#f472b6']}]}});

  // Trend chart
  const trendData={};
  list.forEach(e=>{ trendData[e.date]=(trendData[e.date]||0)+Number(e.amount); });
  if(trendChart) trendChart.destroy();
  trendChart=new Chart(trendChartCtx,{type:'line',data:{labels:Object.keys(trendData),datasets:[{label:'Spending',data:Object.values(trendData),borderColor:'#3b82f6',fill:false}]},options:{responsive:true}});
}

// CRUD
function deleteExpense(i){ expenses.splice(i,1); saveExpenses(); renderExpenses(); }
function editExpense(i){
  const e=expenses[i];
  document.getElementById('amount').value=e.amount;
  document.getElementById('category').value=e.category;
  document.getElementById('date').value=e.date;
  document.getElementById('description').value=e.description;
  expenses.splice(i,1); saveExpenses(); renderExpenses();
}

// Events
expenseForm.addEventListener('submit',e=>{
  e.preventDefault();
  const amount=parseFloat(document.getElementById('amount').value);
  const category=document.getElementById('category').value;
  const date=document.getElementById('date').value;
  const description=document.getElementById('description').value;
  if(amount<=0||!date||new Date(date)>new Date()){alert('Invalid amount or future date!'); return;}
  const recurring=confirm("Mark as recurring?");
  expenses.push({amount,category,date,description,recurring});
  saveExpenses(); renderExpenses(); expenseForm.reset();
});

filterCategory.addEventListener('change',renderExpenses);
filterFrom.addEventListener('change',renderExpenses);
filterTo.addEventListener('change',renderExpenses);
searchInput.addEventListener('input',renderExpenses);
currencySelector.addEventListener('change',e=>{currentCurrency=e.target.value; renderExpenses();});
document.getElementById('clear-filters').addEventListener('click',()=>{
  filterCategory.value=''; filterFrom.value=''; filterTo.value=''; searchInput.value=''; renderExpenses();
});

// Theme toggle
document.getElementById('theme-toggle').addEventListener('click',()=>{document.body.classList.toggle('dark-mode');});

// Export CSV
document.getElementById('export-csv').addEventListener('click',()=>{
  let csv='Date,Category,Description,Amount,Recurring\n';
  expenses.forEach(e=>{csv+=`${e.date},${e.category},"${e.description}",${e.amount},${e.recurring}\n`});
  const blob=new Blob([csv],{type:'text/csv'});
  const link=document.createElement('a'); link.href=URL.createObjectURL(blob); link.download='expenses.csv'; link.click();
});

// Init
addRecurringExpenses();
renderExpenses();
