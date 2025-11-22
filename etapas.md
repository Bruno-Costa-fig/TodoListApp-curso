# 📝 To-Do List Pro — Passo a Passo Completo

## 🔧 Etapa 1 — Criar a Estrutura Base do Projeto

1. Criar pasta **todo-pro**
2. Criar arquivos:
   - `index.html`
   - `style.css`
   - `script.js`
3. Estrutura base do HTML:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>To-Do List Pro</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div id="app"></div>
  <script src="script.js"></script>
</body>
</html>
```

---

## 🎨 Etapa 2 — Criar o Layout da Interface

Substitua `<div id="app"></div>` por:

```html
<div class="container">
  <h1>To-Do List Pro</h1>

  <div class="add-area">
    <input type="text" id="taskInput" placeholder="Digite uma tarefa..." />
    <button id="addBtn">Adicionar</button>
  </div>

  <div class="filters">
    <select id="statusFilter">
      <option value="all">Todas</option>
      <option value="pending">Pendentes</option>
      <option value="done">Concluídas</option>
    </select>

    <input type="text" id="searchInput" placeholder="Buscar..." />
  </div>

  <ul id="taskList"></ul>
</div>
```

---

## ➕ Etapa 3 — Adicionar Tarefa (CREATE)

```javascript
let tasks = [];
```

Cada tarefa:

```javascript
{
  id: Date.now(),
  text: "Exemplo",
  done: false,
  priority: "normal"
}
```

```javascript
document.getElementById("addBtn").addEventListener("click", addTask);

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (!text) return;

  tasks.push({
    id: Date.now(),
    text,
    done: false,
    priority: "normal"
  });

  input.value = "";
  saveTasks();
  renderTasks();
}
```

---

## 🖼 Etapa 4 — Renderizar Tarefas

```javascript
function renderTasks() {
  const ul = document.getElementById("taskList");
  ul.innerHTML = "";

  const filtered = applyFilters();

  filtered.forEach(t => {
    const li = document.createElement("li");

    li.innerHTML = `
     <li>
        <input type="checkbox" ${t.done  ? "checked" : ""} data-id="${t.id} class="checkTask" />
        <span class="${t.done ? "done" : ""}">${t.text}</span>
        <button class="del" data-id="${t.id}">🗑</button>
      </li>
    `;

    ul.appendChild(li);
  });

  attachEvents();
}
```

---

## 🔄 Etapa 5 — Marcar como Concluída

```javascript
function attachEvents() {
  document.querySelectorAll(".chk").forEach(c =>
    c.addEventListener("change", e => {
      const id = parseInt(e.target.dataset.id);
      const task = tasks.find(t => t.id === id);
      task.done = e.target.checked;
      saveTasks();
      renderTasks();
    })
  );
}
```

---

## ❌ Etapa 6 — Remover Tarefa (DELETE)

```javascript
document.querySelectorAll(".del").forEach(btn =>
  btn.addEventListener("click", e => {
    const id = parseInt(e.target.dataset.id);
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
  })
);
```

---

## 🔍 Etapa 7 — Filtros (Status + Busca)

```javascript
document.getElementById("statusFilter").addEventListener("change", renderTasks);
document.getElementById("searchInput").addEventListener("input", renderTasks);

function applyFilters() {
  const status = document.getElementById("statusFilter").value;
  const search = document.getElementById("searchInput").value.toLowerCase();

  return tasks.filter(t => {
    const matchesStatus =
      status === "all" ||
      (status === "pending" && !t.done) ||
      (status === "done" && t.done);

    const matchesSearch = t.text.toLowerCase().includes(search);

    return matchesStatus && matchesSearch;
  });
}
```

---

## 💾 Etapa 8 — Persistência com localStorage

Salvar:

```javascript
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
```

Carregar:

```javascript
function loadTasks() {
  const data = localStorage.getItem("tasks");
  if (data) tasks = JSON.parse(data);
}
```

Iniciar app:

```javascript
loadTasks();
renderTasks();
```

---

## ⭐ Etapa 9 — Extensão: Prioridade das Tarefas

Adicionar seletor no HTML:

```html
<select id="prioritySelect">
  <option value="low">Baixa</option>
  <option value="normal" selected>Normal</option>
  <option value="high">Alta</option>
</select>
```

Adicionar no objeto criado:

```javascript
priority: document.getElementById("prioritySelect").value
```

Ordenar antes de renderizar (opcional):

```javascript
tasks.sort((a, b) => {
  const order = { high: 3, normal: 2, low: 1 };
  return order[b.priority] - order[a.priority];
});
```

---

## 🌙 Etapa 10 — Tema Claro/Escuro

HTML:

```html
<button id="themeBtn">Alterar Tema</button>
```

JS:

```javascript
document.getElementById("themeBtn").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark"));
});
```

CSS:

```css
body.dark {
  background: #111;
  color: #fff;
}
```

---

## 📦 Etapa 11 — Finalização

- Testar tudo (CRUD, filtros, busca, persistência)
- Organizar o código em funções pequenas
- Melhorar UX e espaçamentos
- Publicar no GitHub Pages
