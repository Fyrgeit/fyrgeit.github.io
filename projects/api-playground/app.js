let originEl = document.querySelector("#origin");
let destinationEl = document.querySelector("#destination");
let searchButtonEl = document.querySelector("#search");
let dateEl = document.querySelector("#date");
let numEl = document.querySelector("#num");
let nextEl = document.querySelector("button#next");
let prevEl = document.querySelector("button#prev");
let exportEl = document.querySelector("button#export");
let outputEl = document.querySelector("#output");

let key = "b4ef13f2-27ef-4134-a6f4-9b322e9c8f77";

let apiReturns = [];
let n = 0;

let stations = [
    { name: "Norsborg", code: "740021733" },
    { name: "Alby", code: "740021731" },
    { name: "Sätra", code: "740021725" },
    { name: "Axelsberg", code: "740021722" },
    { name: "Liljeholmen", code: "740004046" },
    { name: "Östermalmstorg", code: "740021651" },
    { name: "Ropsten", code: "740020757" },
];

stations.forEach((station) => {
    let originOption = document.createElement("option");
    let destinationOption = document.createElement("option");

    originOption.setAttribute("value", station.code);
    destinationOption.setAttribute("value", station.code);

    if (station.name == "Ropsten") {
        destinationOption.setAttribute("selected", "");
    }

    originOption.innerHTML = `${station.name} (${station.code})`;
    destinationOption.innerHTML = `${station.name} (${station.code})`;

    originEl.appendChild(originOption);
    destinationEl.appendChild(destinationOption);
});

nextEl.addEventListener("click", function () {
    n++;
    reload();
});
prevEl.addEventListener("click", function () {
    n--;
    reload();
});

searchButtonEl.addEventListener("click", callApi);

exportEl.addEventListener("click", save);

let times = [];

for (let i = 3; i < 27; i++) {
    let hour = i % 24;
    
    times.push(hour.toFixed().padStart(2, "0") + ":00");
    times.push(hour.toFixed().padStart(2, "0") + ":30");
}

async function callApi() {
    outputEl.innerHTML = "";

    let origin = originEl.value;
    let destination = destinationEl.value;
    let date = dateEl.value;

    for (const time of times) {
        let plannerURL =
            `https://api.resrobot.se/v2.1/trip?` +
            `format=json&` +
            `originId=${origin}&` +
            `destId=${destination}&` +
            `date=${date}&` +
            `time=${time}&` +
            `products=32&` +
            `passlist=1&` +
            `numF=6&` +
            `accessId=${key}`
        ;
        
        let data = await (await fetch(plannerURL)).json();

        if (typeof data.Trip != "undefined") {
            data.Trip.forEach((x) => {
                if (x.LegList.Leg.length > 1) { console.log("knas"); }
                if (x.LegList.Leg[0].Origin.routeIdx == "0") {
                    let ok = true;
                    
                    apiReturns.forEach(obj => {
                        if (obj[1] == x.LegList.Leg[0].Product[0].matchId.slice(3)) {
                            ok = false;
                            return;
                        }
                    });

                    if (ok) {
                        apiReturns.push(
                            x.LegList.Leg[0].Stops.Stop.map((y) => {
                                let time;

                                if (
                                    y.routeIdx ==
                                    x.LegList.Leg[0].Origin.routeIdx
                                ) {
                                    time = y.depTime.slice(0, -3);
                                } else {
                                    time = y.arrTime.slice(0, -3);
                                }

                                return time;
                            })
                        );

                        for (let i = 0; i < 25 - x.LegList.Leg[0].Stops.Stop.length; i++) {
                            apiReturns[apiReturns.length - 1].unshift("");
                        }

                        apiReturns[apiReturns.length - 1].unshift(x.LegList.Leg[0].Product[0].matchId.slice(3));
                        apiReturns[apiReturns.length - 1].unshift(x.ServiceDays[0].sDaysR);
                    }
                }
            });
        } else {
            console.log(data.errorText);
            break;
        }

        reload();
    }

    console.log("done");
}

function reload() {
    if (apiReturns.length > 0) {
        if (n < 0) {
            n = apiReturns.length - 1;
        }
        if (n >= apiReturns.length) {
            n = 0;
        }
        numEl.innerHTML = `N: ${n + 1}/${apiReturns.length}`;
        outputEl.innerHTML = "";
        //outputEl.innerHTML += apiReturns[n].StopTimes.join("\n") + "\n";
        outputEl.innerHTML += JSON.stringify(apiReturns[n], null, "    ");
    } else {
        numEl.innerHTML = "No trains found";
    }
}

function save() {
    rows = transpose(apiReturns);
    
    let csvContent = rows.map(e => e.join(",")).join("\n");

    downloadBlob(csvContent, 'trains.csv', 'text/csv;charset=utf-8;')
}

function downloadBlob(content, filename, contentType) {
    // Create a blob
    var blob = new Blob([content], { type: contentType });
    var url = URL.createObjectURL(blob);
  
    // Create a link to download it
    var pom = document.createElement('a');
    pom.href = url;
    pom.setAttribute('download', filename);
    pom.click();
}

function transpose(matrix) {
    return matrix[0].map((col, i) => matrix.map(row => row[i]));
}