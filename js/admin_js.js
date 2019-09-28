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
    let storageLength = window.localStorage.length;
    displayDownloadProgress(-1);
    xhttp.addEventListener("error", () => displayDownloadProgress(0));
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            displayDownloadProgress(1);
            let data = JSON.parse(this.responseText);
            let today = new Date();
            let time = today.getTime();

            for(i = storageLength; i < Object.keys(data).length + storageLength; i++) {
                data[i - storageLength]["serviced"] = "false";
                data[i - storageLength]["registerTime"] = time;
                localStorage.setItem(`user${i}`, JSON.stringify(data[i - storageLength]));
            }
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

        let newClientData = {"id": id, "specialist": specialist, "serviced": "false", "registerTime": time};
        localStorage.setItem(`user${window.localStorage.length}`, JSON.stringify(newClientData));

        document.getElementsByClassName("successfulRegistration")[0].style.opacity = 1;
    }
}

window.onload = document.querySelector("form input").focus();
document.querySelector("main form div").addEventListener("click", () => newClient());
document.getElementById("SaveExampleData").addEventListener("click", () => saveExampleData());
document.getElementById("DeleteAllData").addEventListener("click", () => deleteAllData());