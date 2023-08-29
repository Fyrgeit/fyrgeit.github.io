let placesEl = document.getElementById("places");

let timeoutId;
function debounce(callback) {
  clearTimeout(timeoutId);
  placesEl.innerHTML = "";
  timeoutId = setTimeout(() => {
    callback();
  }, 500);
}

let originInputEl = document.getElementById("originInput");
originInputEl.addEventListener("input", function() {
    debounce(OnInput);
});
originInputEl.addEventListener("focus", function() {
    debounce(OnInput);
});
/* originInputEl.addEventListener("blur", function() {
    placesEl.innerHTML = "";
}); */



async function OnInput() {
    let search = document.getElementById("originInput").value;
    if (search == "") {
        return;
    }
    let url = `https://api.resrobot.se/v2.1/location.name?input=${search}?&format=json&accessId=b4ef13f2-27ef-4134-a6f4-9b322e9c8f77`

    const response = await fetch(url);
    const jsonData = await response.json();
    //console.log(jsonData);
    let places = jsonData.stopLocationOrCoordLocation.map(n => {
        if (n.StopLocation != null) {
            return {
                type: "stop",
                name: n.StopLocation.name,
                id: n.StopLocation.extId
            }
        }
        if (n.CoordLocation != null) {
            return {
                type: "coord",
                name: n.CoordLocation.name,
                lat: n.CoordLocation.lat,
                lon: n.CoordLocation.lon
            }
        }
        return {
            type: "error"
        }
    });

    places.forEach(place => {
        let placeEl = document.createElement("div");
        placeEl.classList.add("place");
        placeEl.dataset.stop = place;
        
        let placeNameEl = document.createElement("p")
        placeNameEl.classList.add("placeName");
        placeNameEl.innerHTML = place.name;
        placeEl.append(placeNameEl);
        
        if (place.type == "stop") {    
            let placeIdEl = document.createElement("p");
            placeIdEl.classList.add("id");
            placeIdEl.innerHTML = place.id;
            placeEl.append(placeIdEl);
        }

        if (place.type == "coord") {    
            let placeCoordEl = document.createElement("p");
            placeCoordEl.classList.add("coord");
            placeCoordEl.innerHTML = `${place.lat}, ${place.lon}`;
            placeEl.append(placeCoordEl);
        }

        placeEl.addEventListener("click", function() {
            console.log(placeEl.dataset.stop.name);
        })

        placesEl.append(placeEl);
    });
}
