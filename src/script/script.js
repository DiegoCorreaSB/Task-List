const btnNewTask = document.getElementById ('btnNewTask')
const addTaskDialog = document.getElementById ('addTaskDialog')
const editTaskDialog = document.getElementById ('editTaskDialog')
const submitTask = document.getElementById ('submitTask')
const containerList = document.getElementById('containerList')
const containerEditTask = document.getElementById ('containerEditTask')
const containerNewTask = document.getElementById ('containerNewTask')

import { taskBanc, newTask } from '../../database/banco.js';

//função validação de dados
function validateData(){
    let valtitulo = document.getElementById('inpTitle').value
    let valdescricao = document.getElementById('inpDescription').value
    let valdata = document.getElementById('inpDate').value
    
    if (valtitulo === '' || valdescricao === '' || valdata === '') {
        alert("Por favor, preencha todos os campos antes de prosseguir.")
        return false
    }
    return true; // Retorna true se a validação passar
}

btnNewTask.onclick = () => {
    //console.log('1')
    containerEditTask.style.display = 'none'
    addTaskDialog.showModal()
}

submitTask.onclick = () => {
    if (validateData() === false) {
        addTaskDialog.showModal()
    } else {
        removeTable();
        newTask(taskBanc)
        addTaskDialog.close()
        createTable(taskBanc)
    }
    //console.log(taskBanc.banco)
};

function createTable(taskBanc) {
    //criação cabeçalho da tabela
    let table = document.createElement('table')
    let thead = document.createElement('thead')
    let headerRow = document.createElement('tr')
    let column = ['Tarefa', 'Descrição', 'Data de Entrega', 'Status', 'Opções']

    column.forEach(column => {
        let th = document.createElement('th')
        th.innerText = column
        headerRow.appendChild(th)
    });
    thead.appendChild(headerRow)
    table.appendChild(thead)

    let tbody = document.createElement('tbody')

    //adição dos dados
    taskBanc.banco.forEach((task, index) => {
        let tr = document.createElement('tr')

        //colunas
        let tdTitle = document.createElement('td')
        tdTitle.innerText = task.titulo
        tr.appendChild(tdTitle)

        let tdDescription = document.createElement('td')
        tdDescription.innerText = task.descricao
        tr.appendChild(tdDescription)

        let tdDate = document.createElement('td')
        tdDate.innerText = task.dataentrega;
        tr.appendChild(tdDate)

        let tdStatus = document.createElement('td')
        if (task.status === 'urgente') {
            tdStatus.style.color = 'red'
        } else if (task.status === 'atenção') {
            tdStatus.style.color = 'orange'
        }
        tdStatus.innerText = task.status
        tr.appendChild(tdStatus)

        let tdOption = document.createElement('td')
        tdOption.innerHTML = `
            <input style="margin-right: 3px; width: 15px; height: 15px;" type="checkbox" id="taskCheckbox-${index}" value="concluida">
            <i class="fa-solid fa-pen-to-square btnEditTask"></i>
            <i class="fa-solid fa-trash btnDeleteTask" data-index="${index}"></i>`

        tr.appendChild(tdOption)
        tbody.appendChild(tr)
    });

    table.appendChild(tbody)
    containerList.appendChild(table)
}

//verificar se Opção Excluir/Editar se é clicada
containerList.addEventListener('click', function(event) {
    if (event.target.classList.contains('btnDeleteTask')) {
        const index = parseInt(event.target.dataset.index)
        //console.log('Ícone de exclusão clicado para a tarefa:', index)
        deleteRow(index, event.target.closest('table'))
    } else if (event.target.classList.contains('btnEditTask')) {

        containerEditTask.style.display = 'flex'
        containerNewTask.style.display = 'none'
        containerNewTask.style.flexDirection = 'column'

        addTaskDialog.showModal(); // Abrir o modal para edição
        
    }
}) 

function deleteRow(index, table) {
    // Remova a linha da tabela
    table.deleteRow(index + 1)
    taskBanc.banco.splice(index, 1)
    removeTable(taskBanc)
    createTable(taskBanc)
}

function removeTable(){
    containerList.innerHTML = ''
}