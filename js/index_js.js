function printClients() {
    if(window.localStorage.length > 0) {
        for(i = 0; i < window.localStorage.length; i++) {
            let li1 = document.createElement("LI");
            let li2 = document.createElement("LI");
            let data = JSON.parse(localStorage.getItem(`user${i}`));
            li1.innerText = data["id"];
            li2.innerText = data["specialist"];
            document.querySelector("main div ul").appendChild(li1);
            document.querySelector("main div ul").appendChild(li2);
            document.querySelector("main div ul").appendChild(document.createElement("hr"));
        }
    }
}