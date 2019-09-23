// Prints clients' data from localStorage
function printClients() {
    if(window.localStorage.length > 0) {
        // Creates table headers
        let idLI = document.createElement("LI");
        let specialistLI = document.createElement("LI");
        idLI.innerText = "ID";
        specialistLI.innerText = "SPECIALIST";
        document.querySelector("main div ul").appendChild(idLI);
        document.querySelector("main div ul").appendChild(specialistLI);
        document.querySelector("main div ul").appendChild(document.createElement("hr"));

        let data = [];
        for(i = 0; i < window.localStorage.length; i++)
            data[i] = JSON.parse(localStorage.getItem(`user${i}`));

        // Sorts data first by name and then by id
        data.sort((a, b) => (a["specialist"] > b["specialist"]) ? 1 :
        (a["specialist"] === b["specialist"]) ? ((parseInt(a["id"]) > parseInt(b["id"])) ? 1 : -1) : -1 );

        for(i = 0; i < window.localStorage.length; i++) {
            let li1 = document.createElement("LI");
            let li2 = document.createElement("LI");
            let user = data[i];
            li1.innerText = parseInt(user["id"]);
            li2.innerText = user["specialist"];
            document.querySelector("main div ul").appendChild(li1);
            document.querySelector("main div ul").appendChild(li2);
            document.querySelector("main div ul").appendChild(document.createElement("hr"));
        }
    } else {
        let msg = document.createElement("LI");
        msg.innerText = "No Data Found";
        document.querySelector("main div ul").appendChild(msg);
        document.querySelector("main div ul").appendChild(document.createElement("hr"));
    }
}