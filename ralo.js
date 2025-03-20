document.addEventListener("DOMContentLoaded", () => {
    const taskTable = document.querySelector("#containerList tbody");
    const addTaskDialog = document.querySelector("#addTaskDialog");
    const btnNewTask = document.querySelector("#btnNewTask");
    const submitTask = document.querySelector("#submitTask");

    // Inputs do formulário
    const inpTitle = document.querySelector("#inpTitle");
    const inpDescription = document.querySelector("#inpDescription");
    const inpDate = document.querySelector("#inpDate");
    const inpStatus = document.querySelector("#inpStatus");

    let tasks = []; // Lista de tarefas
    let editIndex = null; // Índice da tarefa que está sendo editada

    // Abrir modal para nova tarefa
    btnNewTask.addEventListener("click", () => {
        limparFormulario();
        editIndex = null; // Definir que estamos adicionando uma nova tarefa
        addTaskDialog.showModal();
    });

    // Adicionar ou editar tarefa
    submitTask.addEventListener("click", () => {
        const title = inpTitle.value.trim();
        const description = inpDescription.value.trim();
        const date = inpDate.value;
        const status = inpStatus.value;

        if (!title || !description || !date) {
            alert("Preencha todos os campos!");
            return;
        }

        if (editIndex === null) {
            // Adicionar nova tarefa
            tasks.push({ title, description, date, status });
        } else {
            // Editar tarefa existente
            tasks[editIndex] = { title, description, date, status };
            editIndex = null; // Resetar índice de edição
        }

        updateTaskTable();
        addTaskDialog.close();
    });

    // Atualizar tabela de tarefas
    function updateTaskTable() {
        taskTable.innerHTML = ""; // Limpa a tabela

        tasks.forEach((task, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${task.title}</td>
                <td>${task.description}</td>
                <td>${task.date}</td>
                <td>${task.status}</td>
                <td>
                    <input type="checkbox" class="taskCheckbox" data-index="${index}">
                    <i class="fa-solid fa-pen-to-square btnEditTask" data-index="${index}"></i>
                    <i class="fa-solid fa-trash btnDeleteTask" data-index="${index}"></i>
                </td>
            `;

            taskTable.appendChild(row);
        });

        addEventListeners();
    }

    // Adicionar eventos aos botões dinâmicos
    function addEventListeners() {
        document.querySelectorAll(".btnDeleteTask").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const index = e.target.dataset.index;
                tasks.splice(index, 1);
                updateTaskTable();
            });
        });

        document.querySelectorAll(".btnEditTask").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const index = e.target.dataset.index;
                const task = tasks[index];

                // Preencher os inputs com os dados da tarefa
                inpTitle.value = task.title;
                inpDescription.value = task.description;
                inpDate.value = task.date;
                inpStatus.value = task.status;

                editIndex = index; // Definir o índice para edição
                addTaskDialog.showModal(); // Abrir o modal para edição
            });
        });
    }

    // Função para limpar o formulário ao abrir o modal
    function limparFormulario() {
        inpTitle.value = "";
        inpDescription.value = "";
        inpDate.value = "";
        inpStatus.value = "Normal";
    }
});