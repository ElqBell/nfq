function adjustLocalStorage(id) {
    // Only executes if removed item is not the last one
    if(id != window.localStorage.length) {
        for(i = id; i < window.localStorage.length; i++) {
            localStorage.setItem(`user${i}`, localStorage.getItem(`user${i+1}`));
        }
        localStorage.removeItem(`user${window.localStorage.length - 1}`);
    }
}

function deleteClient() {
    let id = document.getElementById("Clients").value;
    let data = [];
    for(i = 0; i < window.localStorage.length; i++) {
        data[i] = JSON.parse(localStorage.getItem(`user${i}`));
        if(data[i]["id"] == id) {
            localStorage.removeItem(`user${i}`);
            // Sorts local storage keys in order
            adjustLocalStorage(i);
            break;
        }
    }

    // Finds new specialist list(deletes specialist if they have no more clients)
    findSpecialists();
    // Finds new client list (without the deleted one)
    findClients();
}

function clearSelectTag(selector) {
    let specialists = document.querySelectorAll(`#${selector} option`);
    for(i = 0; i < specialists.length; i++)
        document.getElementById(selector).removeChild(specialists[i]);
}

function findSpecialists() {
    let data = [];
    for(i = 0; i < window.localStorage.length; i++)
        data[i] = JSON.parse(localStorage.getItem(`user${i}`));

    clearSelectTag("Specialists");

    // Sort array by specialist name
    data.sort((a, b) => a["specialist"] > b["specialist"] ? 1 : -1);
    
    let unique = [...new Set(data.map(item => item["specialist"]))];

    for(i = 0; i < unique.length; i++) {
        let optionTag = document.createElement("OPTION");
        optionTag.setAttribute("value", unique[i]);
        optionTag.innerText = unique[i];
        document.getElementById("Specialists").appendChild(optionTag);
    }
}

function findClients() {
    let currentSpecialist;
    let specialists = document.querySelectorAll("#Specialists option");

    clearSelectTag("Clients");

    for(i = 0; i < specialists.length; i++)
        if(specialists[i].selected == true) {
            currentSpecialist = specialists[i].innerText;
            break;
        }

    let data = [];
    for(i = 0; i < window.localStorage.length; i++)
        data[i] = JSON.parse(localStorage.getItem(`user${i}`));

    // Sort array by id
    data.sort((a, b) => parseInt(a["id"]) > parseInt(b["id"]) ? 1 : -1);

    for(i = 0; i < data.length; i++)
        if(data[i]["specialist"] === currentSpecialist) {
            let optionTag = document.createElement("OPTION");
            optionTag.setAttribute("value", data[i]["id"]);
            optionTag.innerText = data[i]["id"];
            document.getElementById("Clients").appendChild(optionTag);
        }
}

window.onload = findSpecialists();
window.onload = findClients();
document.getElementById("Specialists").addEventListener("change", () => findClients());
document.getElementById("DeleteClientButton").addEventListener("click", () => deleteClient());