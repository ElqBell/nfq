function parseData(clientData, data) {
    clientData = JSON.parse(clientData);
    for(i = 0; i < Object.keys(clientData).length; i++)
        data[i] = clientData[i];
}