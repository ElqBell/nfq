/*function displayDownloadProgress(status) {
    if(status === 0) {

    }
}*/

function saveExampleData() {
    //displayDownloadProgress(0);
    let xhttp = new XMLHttpRequest();
    let storageLength = window.localStorage.length;
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //displayDownloadProgress(1);
            let data = JSON.parse(this.responseText);
            for(i = storageLength; i < Object.keys(data).length + storageLength; i++) {
                localStorage.setItem(`user${i}`, JSON.stringify(data[i - storageLength]));
            }
        }
      };
    xhttp.open("GET", "https://api.myjson.com/bins/1gwm0h", true);
    xhttp.send();
}

function clearForm() {
    document.forms[0].getElementsByTagName("input")[0].value = "";
    document.forms[0].getElementsByTagName("input")[1].value = "";
}

function newClient() {
    console.log("come");
    let id = parseInt(document.forms[0].getElementsByTagName("input")[0].value);
    let specialist = document.forms[0].getElementsByTagName("input")[1].value;
    clearForm();
    let obj = {"id": id, "specialist": specialist};
    localStorage.setItem(`user${window.localStorage.length}`, JSON.stringify(obj));
}

document.querySelector("main form").addEventListener("submit", () => newClient());
document.getElementById("SaveExampleData").addEventListener("click", () => saveExampleData());