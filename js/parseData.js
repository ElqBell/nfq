function parseData(data) {
    for(i = 0; i < window.localStorage.length; i++)
        data[i] = JSON.parse(localStorage.getItem(`user${i}`));
}