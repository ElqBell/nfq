// Finds the amount of time a visit lasted
function calculateVisitLength(startTime, endTime) {
    let totalSeconds = Math.round((endTime - startTime) / 1000);
    return totalSeconds;
}

// Updates client data
function servicedClient() {
    let id = document.getElementById("Clients").value;

    let clientData = localStorage.getItem("clientData");
    let dataLength = Object.keys(JSON.parse(clientData)).length;
    let data = [];
    parseData(clientData, data);

    let today = new Date();
    let time = today.getTime();

    for(i = 0; i < dataLength; i++) {
        if(data[i]["id"] == id) {
            // Finds the time it took to service a client
            time = calculateVisitLength(data[i]["registerTime"], time)

            let updatedClientData = {"id": id, "specialist": data[i]["specialist"], "serviced": "true",
                                    "registerTime": data[i]["registerTime"], "visitLength" : time};
            let storedData = JSON.parse(localStorage.getItem("clientData"));
            storedData[i] = updatedClientData;
            localStorage.setItem("clientData", JSON.stringify(storedData));
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

// A function to create an option for a drop-down list
function createOption(dataToWrite, whereToWrite) {
    let optionTag = document.createElement("OPTION");
    optionTag.setAttribute("value", dataToWrite);
    optionTag.innerText = dataToWrite;
    document.getElementById(whereToWrite).appendChild(optionTag);
}

// Finds all specialists and displays them
function findSpecialists() {
    let clientData = localStorage.getItem("clientData");
    let data = [];
    parseData(clientData, data);

    clearSelectTag("Specialists");

    // Sort object array by specialist name
    data.sort((a, b) => a["specialist"] > b["specialist"] ? 1 : -1);

    // Find unique specialists
    let filteredData = data.filter(item => item["serviced"] === "false");
    let unique = [...new Set(filteredData.map(item => item["specialist"]))];

    for(i = 0; i < unique.length; i++) {
        createOption(unique[i], "Specialists");
    }
}

// Finds clients belonging to selected specialist and displays them
function findClients() {
    let currentSpecialist;
    let specialists = document.querySelectorAll("#Specialists option");

    clearSelectTag("Clients");

    // Find currently selected specialist
    for(i = 0; i < specialists.length; i++)
        if(specialists[i].selected == true) {
            currentSpecialist = specialists[i].innerText;
            break;
        }

    let clientData = localStorage.getItem("clientData");
    let data = [];
    parseData(clientData, data);

    // Sort object array by id
    data.sort((a, b) => parseInt(a["id"]) > parseInt(b["id"]) ? 1 : -1);

    for(i = 0; i < data.length; i++)
        if(data[i]["specialist"] === currentSpecialist && data[i]["serviced"] === "false") {
            createOption(data[i]["id"], "Clients");
        }
}

window.onload = findSpecialists();
window.onload = findClients();
document.getElementById("Specialists").addEventListener("change", () => findClients());
document.getElementById("ServicedClientButton").addEventListener("click", () => servicedClient());