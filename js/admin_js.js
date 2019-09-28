// Displays whether the download of data is still in progress or not
function displayDownloadProgress(status) {
    let div = document.getElementsByClassName("downloadProgress")[0];
    div.innerText = "Atsiunčiami duomenys";
    div.style.opacity = "1";
    div.style.backgroundColor = "#ffb300";
    div.style.color = "white";
    if(status === 1) {
        div.style.backgroundColor = "#33CC99";
        div.innerText = "Atsiuntimas baigtas!";
    } else if(status === 0) {
        div.innerText = "Nepavyko nuskaityti lankytojų duomenų";
        div.style.backgroundColor = "#c02942";
    }
}

// Deletes all data stored in localStorage
function deleteAllData() {
    window.localStorage.clear();
}

// Saves received data to localStorage
function saveExampleData() {
    let xhttp = new XMLHttpRequest();
    displayDownloadProgress(-1);
    xhttp.addEventListener("error", () => displayDownloadProgress(0));
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            displayDownloadProgress(1);

            // Finds the length of `clientData` object in localstorage
            let storageLength;
            let clientData = [];
            if(window.localStorage.getItem("clientData") === null) {
                storageLength = 0
            } else {
                storageLength = Object.keys(JSON.parse(window.localStorage.getItem("clientData"))).length;
                clientData.push(JSON.parse(localStorage.getItem("clientData")));
            }

            let data = JSON.parse(this.responseText);
            let today = new Date();
            let time = today.getTime();

            for(i = storageLength; i < Object.keys(data).length + storageLength; i++) {
                data[i - storageLength]["serviced"] = "false";
                data[i - storageLength]["registerTime"] = time;
                clientData.push(data[i - storageLength]);
            }
            localStorage.setItem("clientData", JSON.stringify(clientData));
        }
      };
    xhttp.open("GET", "https://api.myjson.com/bins/q959t", true);
    xhttp.send();
}

// Creates a new client object and writes data to localStorage
function newClient() {
    let id = parseInt(document.forms[0].getElementsByTagName("input")[0].value);
    let specialist = document.forms[0].getElementsByTagName("input")[1].value;

    if(id != NaN && specialist != "" || id != undefined && specialist != "") {
        // Clears form inputs for design purposes
        document.forms[0].getElementsByTagName("input")[0].value = "";
        document.forms[0].getElementsByTagName("input")[1].value = "";

        let today = new Date();
        let time = today.getTime();

        let newClientData = {"id": `${id}`, "specialist": specialist, "serviced": "false", "registerTime": time};
        let storedData = JSON.parse(localStorage.getItem("clientData"));
        storedData.push(newClientData);

        localStorage.setItem("clientData", JSON.stringify(storedData));

        document.getElementsByClassName("successfulRegistration")[0].style.opacity = 1;
    }
}

window.onload = document.querySelector("form input").focus();
document.querySelector("main form div").addEventListener("click", () => newClient());
document.getElementById("SaveExampleData").addEventListener("click", () => saveExampleData());
document.getElementById("DeleteAllData").addEventListener("click", () => deleteAllData());