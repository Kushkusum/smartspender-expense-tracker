# 💸 Expense Tracker

A modern, interactive Expense Tracker built with **HTML, CSS, and JavaScript**.  
Track your expenses, visualize spending trends, manage budgets, and export data—all in one clean interface.

---

## 🔧 How to Run the Application

1. **Clone or download** this repository.  
2. Ensure the following **3 files are together** in the same folder:  
   - `index.html`  
   - `style.css`  
   - `index.js`  
3. Open `index.html` in any modern web browser (Chrome, Firefox, Edge, etc.).  
4. Start adding, filtering, and managing your expenses right away—**no server setup required**, everything works **offline**.  

> **Optional:** Use a live server extension in VSCode for auto-refresh while editing.

---

## 🛠️ Technical Stack

- **Frontend:** HTML, CSS, JavaScript (Vanilla)  
- **Data Storage:** Local browser storage (`localStorage`)  
- **AI Tool:** Cursor for development assistance  

---

## ⭐ Core Features (Assignment Requirements)

1. **Add Expense Form**  
   - Input fields: amount, category, date, optional description  
   - Categories: Food, Transport, Entertainment, Bills, Shopping, Other  
   - Validation: amount must be positive, date cannot be in the future  

2. **Expense List Display**  
   - Display all expenses in a clean, organized table  
   - Columns: date, category, amount, description  
   - Delete button for each expense  

3. **Filtering**  
   - Filter by category dropdown  
   - Filter by date range (from-to)  
   - Clear filters option  

4. **Statistics Dashboard**  
   - Total amount spent  
   - Number of transactions  
   - Breakdown by category (visual chart optional)  

5. **User Interface**  
   - Clean, responsive design  
   - Mobile-friendly layout  
   - Basic styling using CSS (no framework required)  

---

## ✨ Bonus Features Implemented

- **Budget Warning:** Alerts when monthly spending exceeds a set limit, with color-coded progress bar.  
- **Export CSV:** Download all expenses for external use or backup.  
- **Charts:**  
  - Doughnut chart: Spending by category  
  - Line chart: Daily spending trends  
  - Charts adapt to dark/light theme  
- **Search:** Text search through expense descriptions  
- **Edit Expenses:** Modify existing entries directly from the table  
- **Currency Converter:** Supports INR, USD, EUR, GBP  
- **Recurring Expenses:** Checkbox to mark recurring expenses (automatically added monthly)  

---

## 🤖 Cursor Usage Documentation

This project was developed using **Cursor AI**, which helped generate the HTML, CSS, and JS files based on prompts.  

### Example Prompts Used with Cursor

1. **HTML Generation**
Create a fully functional Expense Tracker HTML page with:

Add expense form (amount, category, date, description, recurring checkbox)

Filters (category, date range, search)

Monthly budget progress bar

Expense table with edit/delete

Statistics and charts

Dark mode toggle and currency selector

Link CSS and JS files


2. **CSS Generation**

Write modern, pastel CSS for Expense Tracker:

Style container, inputs, buttons, table, budget bar

Add hover effects, flex layout, dark mode

Responsive design for mobile (<768px)

Style chart boxes and recurring tag


3. **JavaScript Generation**

Write JS for Expense Tracker with:

Add/Edit/Delete expenses

Filters, search, currency conversion

Budget progress bar with alerts

Recurring expenses auto-add

Charts using Chart.js (doughnut & line)

Dark mode toggle and chart refresh

CSV export

LocalStorage persistence


### How Cursor Helped

- **Rapid Prototyping:** Generated fully structured, modular HTML, CSS, and JS quickly.  
- **Cross-file Consistency:** Automatically linked files (`index.html`, `style.css`, `index.js`) without errors.  
- **Complex Features:** Implemented recurring expenses, filters, and dynamic charts logic which would take hours to code manually.  
- **Theme Handling:** Integrated dark mode across all elements and charts seamlessly.  

### Modifications Made to AI-Generated Code

1. **Validation Logic:** Added checks to prevent future dates and negative amounts.  
2. **Recurring Expenses Handling:** Replaced alert pop-ups with a recurring checkbox for smoother UX.  
3. **Chart Refresh on Theme Toggle:** Ensured charts adapt to dark/light mode.  
4. **UI Polish:** Adjusted pastel colors, padding, and responsiveness for better readability.  

---

## ⚠️ Challenges Faced and How They Were Overcome

1. **Single File Output from Cursor:**  
- Challenge: Initially, Cursor generated all 3 files (HTML, CSS, JS) inline in one file.  
- Solution: Separated the code into **3 interconnected files** with proper `<link>` and `<script>` tags.  

2. **Dark Mode & Chart Colors:**  
- Challenge: Dark mode changed UI colors but charts remained in light theme.  
- Solution: Re-rendered charts after theme toggle with appropriate pastel colors and text/grid colors.  

3. **Budget Alerts:**  
- Challenge: Triggering alerts dynamically without annoying the user.  
- Solution: Limited alert to trigger only when the monthly budget is exceeded and used a **color-coded progress bar**.  

4. **Recurring Expense Alerts:**  
- Challenge: The recurring expense logic initially displayed a pop-up alert every time the page loaded for recurring items.  
- Solution: Replaced the alert with a **recurring checkbox** in the add expense form.  

---

## ⏱️ Time Spent

- **Total Time:** ~2–3 hours  
  - Planning & Cursor prompts: ~0.5 hour  
  - Reviewing & modifying AI-generated code: ~0.5–1 hour  
  - Styling, charts, and responsive tweaks: ~0.5–1 hour  
  - Testing & polishing features: ~0.5 hour

