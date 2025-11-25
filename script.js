const $id = (id) => document.getElementById(id)

let tasks = [];

/*
exemplo

{
  id: Date.now(),
  text: "Exemplo",
  done: false,
  priority: "normal"
}
*/
$id("addBtn").addEventListener('click', addTask)

function addTask() {
    const input = $id("taskInput")
    const text = input.value.trim()
    if (!text) {
        alert("A descrição é obrigatória!")
        return
    }
    
    tasks.push({
        id: Date.now(),
        text,
        done: false,
        priority: "normal"
    })

    input.value = ""
    console.log(tasks)
    // aqui vai o save tasks em etapas futuras
    renderTasks()
}

function renderTasks() {
    const ul = $id("taskList")
    ul.innerHTML = "";

    // aplicar filtros aqui depois

    tasks.forEach(t => {
        const li = document.createElement("li")

        li.innerHTML = `
            <li class="card">
                <input type="checkbox" ${t.done ? "checked" : ""} data-id="${t.id}" class="checkTask" />
                <span class="${t.done ? "done" : ""}">${t.text}</span>
                <button class="del" data-id="${t.id}">🗑️</button>
            </li>
        `

        ul.appendChild(li)
    })

    attachEvents()
}

// na etapa 5 vamos criar a função de marcar como concluída
function attachEvents() {
    const ul = $id("taskList")

    ul.addEventListener('change', e => {
        if (!e.target.matches('.checkTask')) return

        // garante que id bate com o tipo do task.id (Number)
        const id = Number(e.target.dataset.id)
        const task = tasks.find(t => t.id === id)

        if (task) {
            task.done = e.target.checked
            // se quiser persistir, salva aqui
            renderTasks()
        } else {
            console.warn('Task não encontrada para id', id)
        }
    })

    ul.addEventListener('click', e => {
        if (!e.target.matches('.delTask')) return

        const id = Number(e.target.dataset.id)
        tasks = tasks.filter(t => t.id !== id)
        renderTasks()
    })

    // etapa 6
    document.querySelectorAll(".del").forEach(btn =>
        btn.addEventListener("click", e => {
            const id = parseInt(e.target.dataset.id);
            tasks = tasks.filter(t => t.id !== id);
            
            // aqui vai futuramente a função de salvar as tarefas

            renderTasks();
        })
    );
}