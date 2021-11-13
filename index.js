const taskContainer = document.querySelector(".task_container");
let  globalTaskData = [];
const saveToLocalStorage = () => {
localStorage.setItem("taskyCA",JSON.stringify({cards: globalTaskData}));
}

const generateHTML = (taskData) =>{

  return ` <div id=${taskData.id} class="col-md-6 col-lg-4 my-4">
  <div class="card">
    <div class="card-header gap-2 d-flex justify-content-end">
      <button class="btn btn-outline-info" name=${taskData.id} onclick="editCard.apply(this, arguments)" >
        <i class="fal fa-pencil" name=${taskData.id}></i>
      </button>
      <button class="btn btn-outline-danger" name=${taskData.id} onclick="deleteCard.apply(this, arguments)">
        <i class="far fa-trash-alt" name=${taskData.id}></i>
      </button>
    </div>
    <div class="card-body">
      <img
        src=${taskData.image}
        alt="image"
        class="card-img"
        style = "height: 200px"
      />
      <h5 class="card-title mt-4">${taskData.title}</h5>
      <p class="card-text">
        ${taskData.description}
      </p>
      <span class="badge bg-primary">${taskData.type}</span>
    </div>
    <div class="card-footer">
    <button class="btn btn-outline-primary" name=${taskData.id} data-bs-toggle="modal" data-bs-target="#modal${taskData.id}">Open Task</button>
  </div>
  </div>
  </div>
  <div class="modal fade" id="modal${taskData.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">

      </div>
      <div class="modal-body">

        <img src = ${taskData.image} style = "height: 300px; width: 100% ">
        <h5 class="card-title mt-4">${taskData.title}</h5>
        <p class="card-text">
          ${taskData.description}
        </p>
        <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
      </div>
      </div>

    </div>
  </div>
</div>
  `;
  };
const addNewCard = () => {
    const taskData = {
        id: `${Date.now()}`,
        title: document.getElementById("taskTitle").value,
        image: document.getElementById("imgurl").value,
        type: document.getElementById("taskType").value,
        description: document.getElementById("taskDescription").value,
    };
    globalTaskData.push(taskData);
    saveToLocalStorage();
const newCard = generateHTML(taskData);
taskContainer.insertAdjacentHTML("beforeend",newCard);
document.getElementById("taskTitle").value = "" ;
document.getElementById("imgurl").value = "" ;
document.getElementById("taskType").value = "" ;
document.getElementById("taskDescription").value = "" ;
return
};
const loadExistingCards = () =>{
const getData = localStorage.getItem("taskyCA");
 if(!getData) return;
const taskCards = JSON.parse(getData);
 globalTaskData = taskCards.cards;

 globalTaskData.map((taskData) => {
  const newCard = generateHTML(taskData);
  taskContainer.insertAdjacentHTML("beforeend",newCard);
});
return;
};
const deleteCard = (event) => {
    const targetID = event.target.getAttribute("name");
    const elementType = event.target.tagName;

    const removeTask = globalTaskData.filter((task) => task.id !== targetID);
    globalTaskData = removeTask;
saveToLocalStorage();
if(elementType === "BUTTON"){
      return taskContainer.removeChild(
        event.target.parentNode.parentNode.parentNode
      );
    }else{
      return taskContainer.removeChild(
        event.target.parentNode.parentNode.parentNode.parentNode
      );
    }
    };
const editCard = (event) =>{
  const elementType = event.target.tagName;
  let taskTitle;
  let taskType;
  let taskDescription;
  let parentElement;
  let submitButton;

  if(elementType === "BUTTON"){
    parentElement = event.target.parentNode.parentNode;
  }
  else{
    parentElement = event.target.parentNode.parentNode.parentNode;
  }

  taskTitle = parentElement.childNodes[3].childNodes[3];
  taskDescription = parentElement.childNodes[3].childNodes[5];
  taskType = parentElement.childNodes[3].childNodes[7];
  submitButton = parentElement.childNodes[5].childNodes[1];

  taskTitle.setAttribute("contenteditable", "true");
  taskDescription.setAttribute("contenteditable", "true");
  taskType.setAttribute("contenteditable", "true");
  submitButton.setAttribute("onclick","saveEdit.apply(this,arguments)");
  submitButton.innerHTML = "Save Changes";

  };
  const saveEdit = (event) =>{
    const targetID = event.target.getAttribute("name");
    const elementType = event.target.tagName;
    let parentElement;

    if(elementType === "BUTTON"){
      parentElement = event.target.parentNode.parentNode;
    }
    else{
      parentElement = event.target.parentNode.parentNode.parentNode;
    }

  const taskTitle = parentElement.childNodes[3].childNodes[3];
  const taskDescription = parentElement.childNodes[3].childNodes[5];
  const taskType = parentElement.childNodes[3].childNodes[7];
  const submitButton = parentElement.childNodes[5].childNodes[1]
  const updatedData = {
    title: taskTitle.innerHTML,
    type: taskType.innerHTML,
    description: taskDescription.innerHTML,
  }
  const updateGlobalTasks = globalTaskData.map((task) => {
    if (task.id === targetID) {
      console.log({ ...task, ...updatedData });
      return { ...task, ...updatedData };
    }
    return task;
  });
   globalTaskData = updateGlobalTasks;
   saveToLocalStorage();
   taskTitle.setAttribute("contenteditable", "false");
  taskDescription.setAttribute("contenteditable", "false");
  taskType.setAttribute("contenteditable", "false");
  submitButton.innerHTML = "Open Task";
   };
