// Updates client data
function servicedClient() {
    let id = document.getElementById("Clients").value;
    let data = [];
    for(i = 0; i < window.localStorage.length; i++) {
        data[i] = JSON.parse(localStorage.getItem(`user${i}`));
        if(data[i]["id"] == id) {
            localStorage.removeItem(`user${i}`);
            let updatedClientData = {"id": id, "specialist": data[i]["specialist"], "serviced": "true"};
            localStorage.setItem(`user${i}`, JSON.stringify(updatedClientData));
            break;
        }
    }

    // Finds new specialist list(doens't display specialist if they have no more clients)
    findSpecialists();
    // Finds new client list (without the serviced one)
    findClients();
}

// Clears option tags in select tag for writing new data
function clearSelectTag(selector) {
    let specialists = document.querySelectorAll(`#${selector} option`);
    for(i = 0; i < specialists.length; i++)
        document.getElementById(selector).removeChild(specialists[i]);
}

// Finds all specialists and displays them
function findSpecialists() {
    let data = [];
    parseData(data);

    clearSelectTag("Specialists");

    // Sort object array by specialist name
    data.sort((a, b) => a["specialist"] > b["specialist"] ? 1 : -1);

    // Find unique specialists
    let filteredData = data.filter(item => item["serviced"] === "false");
    let unique = [...new Set(filteredData.map(item => item["specialist"]))];

    for(i = 0; i < unique.length; i++) {
        let optionTag = document.createElement("OPTION");
        optionTag.setAttribute("value", unique[i]);
        optionTag.innerText = unique[i];
        document.getElementById("Specialists").appendChild(optionTag);
    }
}

// Finds clients belonging to selected specialist and displays them
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
    parseData(data);

    // Sort object array by id
    data.sort((a, b) => parseInt(a["id"]) > parseInt(b["id"]) ? 1 : -1);

    for(i = 0; i < data.length; i++)
        if(data[i]["specialist"] === currentSpecialist && data[i]["serviced"] === "false") {
            let optionTag = document.createElement("OPTION");
            optionTag.setAttribute("value", data[i]["id"]);
            optionTag.innerText = data[i]["id"];
            document.getElementById("Clients").appendChild(optionTag);
        }
}

window.onload = findSpecialists();
window.onload = findClients();
document.getElementById("Specialists").addEventListener("change", () => findClients());
document.getElementById("ServicedClientButton").addEventListener("click", () => servicedClient());