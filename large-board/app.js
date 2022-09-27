const resRobotKey = "b4ef13f2-27ef-4134-a6f4-9b322e9c8f77";

let main = document.getElementById("results");

let stButton = document.getElementById("stButton");
let clButton = document.getElementById("clButton");

stButton.addEventListener("click", getStations);
clButton.addEventListener("click", clearField);

function clearField() {
    let input = document.getElementById("input");

    input.value = '';
}

function getStations() {
    let input = document.getElementById("input");
    
    let stationName = input.value;
    let lookupURL = `https://api.resrobot.se/v2.1/location.name?input=${stationName}&format=json&accessId=${resRobotKey}`;

    main.innerHTML = '';

    fetch(lookupURL)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        let placeList = data.stopLocationOrCoordLocation;
        
        let stopList = [];

        placeList.forEach(element => {
            if (element.StopLocation != undefined) { 
                stopList.push(element.StopLocation);
            }
        });
        
        let topSpot = stopList[0];

        let newP = document.createElement("p");
        newP.classList.add("topSpot");
        newP.innerHTML = "Visar avgångar för: " + topSpot.name;
        main.appendChild(newP);

        let departureURL = `https://api.resrobot.se/v2.1/departureBoard?id=${topSpot.extId}&duration=60&format=json&accessId=${resRobotKey}`;

        getDepartures(departureURL);
    });
}

function getDepartures(departureURL) {
    fetch(departureURL)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);

        for (let i = 0; i < Math.min(data.Departure.length, 10); i++) {
            let currDep = data.Departure[i];
            
            let newType = document.createElement("p");
            let newOperator = document.createElement("p");
            let newLine = document.createElement("p");
            let newDestination = document.createElement("p");
            let newTime = document.createElement("p");

            newOperator.classList.add("operator");
            newType.classList.add("type");
            newLine.classList.add("line");
            newDestination.classList.add("destination");
            newTime.classList.add("time");
            
            newOperator.innerHTML = currDep.ProductAtStop.operator;
            newType.innerHTML = currDep.ProductAtStop.catOutL;
            newLine.innerHTML = currDep.ProductAtStop.displayNumber;
            newDestination.innerHTML = currDep.direction;
            newTime.innerHTML = currDep.time;
            
            let newDiv = document.createElement("div");
            newDiv.classList.add("container");
            
            let newTopRow = document.createElement("div");
            newTopRow.classList.add("topRow")
            
            let newBottomRow = document.createElement("div");
            newBottomRow.classList.add("bottomRow")

            newTopRow.append(newOperator);
            newTopRow.append(newType);
            newBottomRow.append(newLine);
            newBottomRow.append(newDestination);
            newBottomRow.append(newTime);

            newDiv.append(newTopRow);
            newDiv.append(newBottomRow);
            
            main.append(newDiv);
        }
    });
}