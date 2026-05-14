const API="http://localhost:5000/tasks";

async function loadTasks(){

const res=await fetch(API);
const tasks=await res.json();

const list=document.getElementById("taskList");

list.innerHTML="";

tasks.forEach(task=>{

const li=document.createElement("li");

li.innerHTML=`
${task.title}

<button onclick="completeTask('${task._id}')">✅</button>

<button onclick="editTask('${task._id}','${task.title}')">✏</button>

<button onclick="deleteTask('${task._id}')">❌</button>

`;

if(task.completed)
li.classList.add("completed");

list.appendChild(li);

});

}

async function addTask(){

const input=document.getElementById("taskInput");

await fetch(API,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({title:input.value})
});

input.value="";

loadTasks();

}

async function deleteTask(id){

await fetch(API+"/"+id,{
method:"DELETE"
});

loadTasks();

}

async function completeTask(id){

await fetch(API+"/"+id,{
method:"PUT",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({completed:true})
});

loadTasks();

}

async function editTask(id,title){

const newTitle=prompt("Edit task:",title);

await fetch(API+"/"+id,{
method:"PUT",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({title:newTitle})
});

loadTasks();

}

loadTasks();