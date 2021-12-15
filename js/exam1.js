let btnEl = document.querySelector('.btn')
let contentEl = document.querySelector('#content')

let tasks = getTaskFormLocalStorage()
renderTask(tasks)
btnEl.addEventListener('click', function(){
    if(!contentEl.value){
        alert("Vui lòng nhập tasks!")
        return false
    }

    let taskId = this.getAttribute('id')
    let tasks = getTaskFormLocalStorage()
    let task = {name: contentEl.value}

    if(taskId == 0 || taskId){
        tasks[taskId] = task
        this.removeAttribute('id')
    } else {
        tasks.push(task)
    }

    contentEl.value = ''

    localStorage.setItem('tasks', JSON.stringify(tasks))
    renderTask(tasks)
})

function editTask(id){
    let tasks = getTaskFormLocalStorage()
    if(tasks.length > 0){
        contentEl.value = tasks[id].name
        btnEl.setAttribute('id',id)
    }
}

function deleteTask(id){
    if(confirm("Bạn thực sự muốn xoá?")){
        let tasks = getTaskFormLocalStorage()
        tasks.splice(id, 1)
        localStorage.setItem('tasks', JSON.stringify(tasks))
        renderTask(getTaskFormLocalStorage())
    }
}

function renderTask(tasks = []){
    let content = '<ul>'
    tasks.forEach((task, index) =>{
        content +=`<li>
            <div class="tasks">${task.name}</div>
            <a href="#" onclick="editTask(${index})">Sửa</a>
            <a href="#" onclick="deleteTask(${index})">Xoá</a>
        </li>`
    })

    content += '</ul>'
    document.querySelector('#result').innerHTML = content
}
        
function getTaskFormLocalStorage(){
    return localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : []
}
