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

function addTask(){
    const input = $id("taskInput")
    const text = input.value.trim()
    if (!text) return
    
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

function renderTasks(){
    const ul = $id("taskList")
    ul.innerHTML = "";

    tasks.forEach(t => {
        const li = document.createElement("li")

        li.innerHTML = `
            <input type="checkbox" ${t.done  ? "checked" : ""} data-id="${t.id} class="checkTask" />
            <span class="${t.done ? "done" : ""}">${t.text}</span>
            <button class="del" data-id="${t.id}>🗑</button>
        `

        ul.appendChild(li)

        // na etapa 5 vamos criar a função de marcar como concluída
        attachEvents()
    })
}

function attachEvents(){
    document.querySelectorAll(".checkTask").forEach(c => {
        c.addEventListener("change", e => {
            const id = parseInt(e.target.dataset.id)
            const task = tasks.find(t => t.id === id)
            task?.done = e.target.checked
            // função de saveTasks aqui nas próximas etapas
        })
    })
}