// Prints clients' data from localStorage
function printClients() {
    // Element to which data is written
    let parent = document.querySelector("main div ul");

    if(window.localStorage.length > 0) {
        // Creates table headers
        let idLI = document.createElement("LI");
        let specialistLI = document.createElement("LI");
        let span = document.createElement("SPAN");
        idLI.innerText = "Nr.";
        specialistLI.innerText = "Specialistas";
        span.appendChild(idLI);
        span.appendChild(specialistLI);
        parent.appendChild(span);
        parent.appendChild(document.createElement("hr"));

        let data = [];
        parseData(data);

        // Sorts data first by name and then by id
        data.sort((a, b) => (a["specialist"] > b["specialist"]) ? 1 :
        (a["specialist"] === b["specialist"]) ? ((parseInt(a["id"]) > parseInt(b["id"])) ? 1 : -1) : -1 );

        // Find unique specialists
        let filteredData = data.filter(item => item["serviced"] === "false");
        let unique = [...new Set(filteredData.map(item => item["specialist"]))];
        // ID for highlighting only the first specialist
        let uniqueID = 0;

        for(i = 0; i < window.localStorage.length; i++) {
            let user = data[i];
            if(user["serviced"] === "false") {
                let li1 = document.createElement("LI");
                let li2 = document.createElement("LI");
                let span = document.createElement("SPAN");
                li1.innerText = parseInt(user["id"]);
                li2.innerText = user["specialist"];

                // Highlight clients currently in service
                if(user["specialist"] === unique[uniqueID]) {
                    span.style.backgroundColor = "#45E6E765";
                    uniqueID++;
                }

                span.appendChild(li1);
                span.appendChild(li2);
                parent.appendChild(span);
                parent.appendChild(document.createElement("hr"));
            }
        }
    } else {
        let msg = document.createElement("LI");
        msg.innerText = "Nerasta Duomenų";
        parent.appendChild(msg);
        parent.appendChild(document.createElement("hr"));
    }
}