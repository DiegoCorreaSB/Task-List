export let taskBanc = {
    banco: []
};

export function newTask() {
    const objTask = {
        titulo: document.getElementById('inpTitle')?.value || "",
        descricao: document.getElementById('inpDescription')?.value || "",
        dataentrega: document.getElementById('inpDate')?.value || "",
        status: document.getElementById('inpStatus')?.value || ""
    };
    taskBanc.banco.push(objTask);

    //limpa inputs
    document.getElementById('inpTitle').value = "";
    document.getElementById('inpDescription').value = "";
    document.getElementById('inpDate').value = "";
}