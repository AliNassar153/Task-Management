let tasks =[
  {
    'title':'مهمة ١ ',
    'date':"15/3/2002",
    "isDone":false
  },
  {
    'title':'مهمة ٢ ',
    'date':"15/3/2002",
    "isDone":false
  },
  {
    'title':'مهمة ٣',
    'date':'11/11/2011',
    "isDone":true
  }
]
function getTaskFormStorage(){
let retrievedTasks=JSON.parse(localStorage.getItem('tasks'))
tasks=retrievedTasks??[]
}
getTaskFormStorage()

function right(){
  document.getElementById("tasks").innerHTML =""
  let index =0
  
  for(task of tasks){
    let content =`
    <div class="task1 ${task.isDone ? 'done' :''}">
    <div class="task-info">
    <h2>${task.title}</h2>
    <div><i class="fa-solid fa-calendar-days"></i>&#160; 
    <span>${task.date}</span></div>
    </div>
    <div class="task-action">
    <button onclick="deleteTask(${index})"class="btn1 btn"><i class="fa-solid fa-trash"></i></button>
    ${task.isDone ? `
    <button id="btn2" onclick="completeTask(${index})"class="btn"> <i class="fa-solid fa-circle-xmark"></i></button>

    `:`
    <button onclick="completeTask(${index})"class="btn"><i class="fa-solid fa-check"></i></button>
    `
  }
      <button onclick="editTask(${index})" class="btn"><i class="fa-solid fa-pen-to-square"></i></button>
    </div>
    </div>
    `
    document.getElementById("tasks").innerHTML +=content
    index++
  }
}
right()


document.getElementById("btn").addEventListener("click",function(){
  let now= new Date()
  let dates=now.getDate()+"/"+(now.getMonth()+1) +'/'+now.getFullYear()+'&#160;| &#160;'+now.getHours()+':'+now.getMinutes()
  let taskName =prompt("ادخل اسم المهمة")

  let taskOpj= {
    'title':taskName,
    'date':dates,
    "isDone":false
  }
  tasks.push(taskOpj)
  storeTasks()
  right()
})
function deleteTask(index){ 
  let task=tasks[index]
  let isConfirm =confirm("هل انت متأكد من حذف:"+task.title)
  if(isConfirm){

    tasks.splice(index,1)
    storeTasks()
    right()
  }
}
function editTask(index){

  let task =tasks[index]
let newTaskName=prompt("اكتب تعديلك",task.title)
alert(newTaskName)
task.title=newTaskName
if(newTaskName===null){
  return
}
storeTasks()
right()
}

function completeTask(index){
  let task=tasks[index]
  task.isDone=!task.isDone
  storeTasks()
  right()
}
function storeTasks(){
  let taskString =JSON.stringify(tasks)
  localStorage.setItem('tasks',taskString)
}
