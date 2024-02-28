var tasks = [];
var totalTaskCount = 0;
var remainingTask=0;
var inputfield = document.getElementById("input-field");

document.addEventListener("DOMContentLoaded", function() {
    // fatchdata();
    var storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        tasks.forEach(task => renderTask(task));
    } 
});
function fatchdata(){
     fetch('https://jsonplaceholder.typicode.com/todos')
     .then(function(response){
        return response.json();
     }).then(function(data){
        tasks=data.slice(0,10);
        var i=0;
        tasks.forEach(task => {
            setTimeout(function(){
                renderTask(task);
            },100*i++);
        });
     })
}
inputfield.addEventListener("keypress", function(event) {
    if (event.key == "Enter"&&inputfield.value) {
        var task = {
            title: "learnGerman",
            id: new Date().getTime(),
            completed: false
        };
        var taskname = this.value;
        task.title = taskname;
        var taskid = task.id;
        task.completed = false;
        tasks.push(task);
        renderTask(task);
        inputfield.value = "";
        // alert("Kr Bhi Liye Add to Krdi");
    }
});

function renderTask(task) {

    saveTasksToLocalStorage();
    var listitem = document.createElement('div');
    listitem.className = "list-items";
    listitem.id = task.id;

    var left = document.createElement('div');
    left.className = "left";
    left.id = task.id;

    var checkbox = Object.assign(document.createElement('input'), {
        type: 'checkbox',
        id: task.id,
        class: 'myCheckbox',
        name: 'myCheckbox'
    });
    var itemscontent = Object.assign(document.createElement('div'), {
        className: 'items-content',
        id: task.id
    });
    itemscontent.innerHTML = task.title;

    left.appendChild(checkbox);
    left.appendChild(itemscontent);
    listitem.appendChild(left);

    var imagediv = Object.assign(document.createElement('div'));
    var image = Object.assign(document.createElement('img'), {
        className: 'delete',
        id: task.id,
        src: 'delete.png'
    });
    imagediv.appendChild(image);
    listitem.appendChild(imagediv);
    
    document.getElementById('list').appendChild(listitem);
    if(task.completed){
        var taskId = checkbox.getAttribute("id");
        document.getElementById('count').innerHTML=++totalTaskCount;
        document.getElementById(taskId).style.textDecoration="line-through";
        checkbox.checked = true;
    }else{
        document.getElementById('count').innerHTML=++totalTaskCount;
        document.getElementById('remaining').innerHTML=++remainingTask;
    }
    image.addEventListener('click', function() {
        var taskId = this.getAttribute("id");
        var index = tasks.findIndex(task => task.id == taskId);
        if (index !== -1) {
            tasks.splice(index, 1);
            document.getElementById('count').innerHTML=--totalTaskCount;
            
            if(!task.completed)remainingTask--;
            document.getElementById('remaining').innerHTML=remainingTask;
            document.getElementById('list').removeChild(listitem); // Remove the specific list item
            saveTasksToLocalStorage();
            // alert("K bat Bski nhi");
        }
    });
    checkbox.addEventListener('click', function() {
        var taskId = this.getAttribute("id");
        var index = tasks.findIndex(task => task.id == taskId);
        if (index !== -1&&!task.completed) {
            // tasks.splice(index, 1);
            document.getElementById(taskId).style.textDecoration="line-through"; // Remove the specific list item
            task.completed=true;
            // alert("vahh re baut badiya");
            document.getElementById('remaining').innerHTML=--remainingTask;
            saveTasksToLocalStorage();
        }else{
            document.getElementById(taskId).style.textDecoration="none";
            task.completed=false;
            // alert("K reh gya ib");
            remainingTask++;
            document.getElementById('remaining').innerHTML=remainingTask;
            saveTasksToLocalStorage();
        }
    });
}
function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
