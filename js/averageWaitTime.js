// Calculates average visit time for a specialist
function averageWaitTime(specialist) {
    let clientData = localStorage.getItem("clientData");
    let data = [];
    parseData(clientData, data);

    // Sort object array by specialist name
    data.sort((a, b) => a["specialist"] > b["specialist"] ? 1 : -1);
    // Filter data only for specified specialist name
    let filteredData = data.filter(item => item["specialist"] === specialist);
    // Filter data only for completed visits and not the ones in line
    filteredData = filteredData.filter(item => item.hasOwnProperty("visitLength"));

    if(filteredData.length > 0) {
        let totalSeconds = 0;
        let count = 0;
        for(i = 0; i < filteredData.length; i++) {
            totalSeconds += filteredData[i]["visitLength"];
            count++;
        }
        totalSeconds = Math.floor(totalSeconds / count);
        let formattedTime = new Date(totalSeconds * 1000).toISOString().substr(11, 8);
        return formattedTime;
    } else {
        return "Nėra pakankamai duomenų laikui nustatyti.";
    }
    
}