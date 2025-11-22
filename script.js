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
}