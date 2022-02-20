import {saveTask, getTasks, onGetTasks, deleteTask, getTask, updateTask} from './firebase.js';

const taskForm = document.querySelector('#task-form');
const tasksContainer = document.querySelector('#tasks-container');
const btnRight = document.querySelector('.print')
let editStatus = false;
let id = '';

window.addEventListener('DOMContentLoaded', async ()=>{
    const querySnapshot = await getTasks();

    onGetTasks((querySnapshot) =>{
  
        tasksContainer.innerHTML = '';
        querySnapshot.forEach( doc =>{
          
            
            const task = doc.data();
            tasksContainer.innerHTML += `
                <div class=" card card-body mt-2 border-primary">
                    <h3 class="h5">${task.title}</h3>
                    <p>${task.description}</p>
                    <div> 
                    <button class='btn btn-danger btn-delete' data-id="${doc.id}">Delete</button>
                    <button class=' btn btn-info btn-edit' data-id="${doc.id}">Edit</button>
                    </div>
                </div>        
            `;
                    
        });                                
        
        

        const btnDelete = tasksContainer.querySelectorAll('.btn-delete')

        btnDelete.forEach(btn=>{
            btn.addEventListener('click', ({target:{dataset}})=>{
                deleteTask(dataset.id)

            })
        })

        const btnEdit = tasksContainer.querySelectorAll('.btn-edit')
        btnEdit.forEach(btn=>{
            btn.addEventListener('click', async (e) =>{
                const doc = await getTask(e.target.dataset.id)
                const task = doc.data()

                taskForm['task-title'].value = task.title
                taskForm['task-description'].value = task.description

                editStatus = true;
                id = doc.id;
                taskForm['btn-task-save'].innerText = 'Update';

            })
        })


    });

});

const Error = () =>{
    const esta = document.querySelector('.bg-danger')
    if(!esta){


        const error = document.createElement('div')
        error.className = 'bg-danger alert alert-dismissible alert-danger mt-3';
        error.textContent = 'Empty field';
        btnRight.appendChild(error)
        setTimeout(()=>{
            error.remove()
        },3000)
    }
    
}

taskForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const title = taskForm['task-title']
    const description = taskForm['task-description']

    if(!editStatus){
        if(title.value == '' || description.value == ''){
            
                Error('No se puede')

           

        
            

        }else{
            saveTask(title.value, description.value);

        }

        
    }else{
        updateTask(id,{
            title: title.value,
            description: description.value
        })
        editStatus = false;
    }
    taskForm.reset()
})
