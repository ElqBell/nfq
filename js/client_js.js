// Finds average time left to wait
function findClientTime() {
    let id = parseInt(document.forms[0].getElementsByTagName("input")[0].value);
    let clientData = localStorage.getItem("clientData");
    let data = [];
    parseData(clientData, data);

    // Find the object with provided client id
    let obj = {};
    for(i = 0; i < data.length; i++)
        if(data[i]["id"] == id) {
            obj = data[i];
            break;
        }

    if(id != NaN && obj["serviced"] === "false" || id != undefined && obj["serviced"] === "false") {
        let avgTime = averageWaitTime(obj["specialist"]);
        document.getElementsByClassName("avgTime")[0].innerText = avgTime;
    } else {
        document.getElementsByClassName("avgTime")[0].innerText = "Tokio numerio eilėje nėra.";
    }
    document.forms[0].getElementsByTagName("input")[0].value = "";
}

window.onload = document.querySelector("form input").focus();
document.getElementById("FindClientTime").addEventListener("click", () => findClientTime());