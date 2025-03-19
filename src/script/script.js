const btnNewTask = document.getElementById ('btnNewTask')
const addTaskDialog = document.getElementById ('addTaskDialog')
const submitTask = document.getElementById ('submitTask')
const containerList = document.getElementById('containerList')

import { taskBanc, newTask } from '../../database/banco.js';

//função validação de dados
function validateData(){
    let valtitulo = document.getElementById('inpTitle').value
    let valdescicao = document.getElementById('inpTitle').value
    let valdata = document.getElementById('inpTitle').value
    
    if (valtitulo == '' && valdescicao == '' && valdata == '') {
        alert("Por favor, preencha todos os campos antes de prosseguir.");
        return false; 
      } 
}

btnNewTask.onclick = () => {
    console.log('1');
    addTaskDialog.showModal()
}

submitTask.onclick = () => {
    validateData()
    
    if (validateData() === false) {
        addTaskDialog.showModal()
    } else {
        removeTable()
        newTask(taskBanc)
        addTaskDialog.close()
        createTable(taskBanc)
    }

    console.log(taskBanc.banco);
}

function createTable(taskBanc){
    //criação cabeçalho da tabela
    let table = document.createElement('table');
    let thead = document.createElement ('thead');
    let headerRow = document.createElement ('tr');
    let column = ['Tarefa', 'Descrição', 'Data de Entrega','Status', 'Opções'];

    column.forEach(column => {
        let th = document.createElement ('th');
        th.innerText = column;
        headerRow.appendChild (th)
    });
    thead.appendChild (headerRow);
    table.appendChild (thead);
    
    let tbody = document.createElement ('tbody');

    //adição dos dados 
    taskBanc.banco.forEach(taskBanc  => {
        let tr = document.createElement ('tr');

        //colunas
        let tdTitle = document.createElement ('td');
        tdTitle.innerText = taskBanc.titulo;
        tr.appendChild (tdTitle)

        let tdDescription = document.createElement ('td');
        tdDescription.innerText = taskBanc.descricao;
        tr.appendChild (tdDescription);

        let tdDate = document.createElement ('td');
        tdDate.innerText = taskBanc.dataentrega
        tr.appendChild (tdDate);

        let tdStatus = document.createElement ('td');
        if (taskBanc.status === 'urgente') { 
            tdStatus.style.color = 'red'
        } else if (taskBanc.status === 'atenção') { 
            tdStatus.style.color = 'orange'
        }
        tdStatus.innerText = taskBanc.status;
        tr.appendChild (tdStatus);

        let tdOption = document.createElement ('td');
        tdOption.innerHTML = `<input style="margin-right: 3px; width: 15px; height: 15px;" type="checkbox" id="taskCheckbox" value="concluida">
        <i id="btnEditTask" class="fa-solid fa-pen-to-square"></i>
        <i id="btnDeleteTask" class="fa-solid fa-trash"></i>`
        tr.appendChild (tdOption)
        tbody.appendChild (tr)
    });

    table.appendChild (tbody)

    containerList.appendChild(table)
}

function removeTable(){
    containerList.innerHTML = ''
}