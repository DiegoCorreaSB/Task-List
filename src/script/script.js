const btnNewTask = document.getElementById ('btnNewTask')
const addTaskDialog = document.getElementById ('addTaskDialog')
const  submitTask = document.getElementById ('submitTask')

btnNewTask.onclick = () => {
    console.log('1');
    addTaskDialog.showModal()
}

submitTask.onclick = () => {
    addTaskDialog.close()
}