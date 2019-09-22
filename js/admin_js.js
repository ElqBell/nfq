function saveExampleData() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText);
            for(i = 0; i < Object.keys(data).length; i++) {
                localStorage.setItem(`user${i}`, JSON.stringify(data[i]));
            }
        }
      };
    xhttp.open("GET", "https://api.myjson.com/bins/1gwm0h", true);
    xhttp.send();
}