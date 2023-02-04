let outputEl = document.querySelector("#output");
let stationEl = document.querySelector("#station");
let depNumEl = document.querySelector("#dep-num");
let nextEl = document.querySelector("button#next");
let prevEl = document.querySelector("button#prev");

let key = "b4ef13f2-27ef-4134-a6f4-9b322e9c8f77";
let stationName = "Årstaberg";
let stationCode = "740000002";
let lookupURL = `https://api.resrobot.se/v2.1/location.name?input=${stationName}&format=json&accessId=${key}`;
let departureURL = `https://api.resrobot.se/v2.1/departureBoard?id=${stationCode}&format=json&accessId=${key}`;

let apiReturn = "";

let n = 0;

nextEl.addEventListener("click", function(){ n++; reload(); });
prevEl.addEventListener("click", function(){ n--; reload(); });

fetch(departureURL).then((response) => {
    return response.json();
}).then((data) => {
    apiReturn = data;
    reload();
});

function reload() {
    if (n < 0) { n = apiReturn.Departure.length - 1 }
    if (n >= apiReturn.Departure.length) { n = 0 }
    stationEl.innerHTML = `Station: ${stationCode}`;
    depNumEl.innerHTML = `N: ${n}`;
    outputEl.innerHTML = JSON.stringify(apiReturn.Departure[n], null, "\t");
}