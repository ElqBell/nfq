function adjustLocalStorage(id) {
    for(i = id; i < window.localStorage.length; i++) {
        localStorage.setItem(`user${i}`, localStorage.getItem(`user${i+1}`));
    }
    localStorage.removeItem(`user${window.localStorage.length - 1}`);

}

function deleteClient() {
    let id = document.forms[0].getElementsByTagName("input")[0].value;
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

    // Clears input text
    document.forms[0].getElementsByTagName("input")[0].value = "";
}