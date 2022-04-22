let data = [
  ["Kunskapskrav", "Steg E", "Steg C", "Steg A"],
  [
    "K2 - I arbetet utvecklar eleven kod som med...",
    "I arbetet utvecklar eleven kod som med tillfredsställande resultat följer standarder och omfattar någon av de grundläggande teknikerna för märkspråk och stilmallar.",
    "I arbetet utvecklar eleven kod som med tillfredsställande resultat följer standarder och som omfattar några av de grundläggande teknikerna för märkspråk och stilmallar.",
    "I arbetet utvecklar eleven kod som med gott resultat följer standarder och som omfattar flera av de grundläggande teknikerna för märkspråk och stilmallar.",
  ],
  ["2 - Eleven bearbetar också..", "Steg E", "Steg C", "Steg A"],
  ["Kunskapskrav", "Steg E", "Steg C", "Steg A"],
];

let container = document.getElementById("container");

for (let i = 0; i < 4; i++) {
  let newDiv = document.createElement("div");
  newDiv.classList.add("box");
  newDiv.classList.add("head");

  let newP = document.createElement("p");
  newP.classList.add("head");
  newP.innerHTML = data[0][i];

  newDiv.append(newP);
  container.append(newDiv);
}

for (let i = 1; i < data.length; i++) {
  let newDiv = document.createElement("div");
  newDiv.classList.add("box");
  newDiv.classList.add("leftColumn");

  let newP = document.createElement("p");
  newP.classList.add("leftColumn");
  newP.innerHTML = data[i][0];

  newDiv.append(newP);
  container.append(newDiv);

  for (let j = 1; j < data[i].length; j++) {
    let newDiv = document.createElement("div");
    newDiv.classList.add("box");

    let newP = document.createElement("p");
    newP.innerHTML = data[i][j];

    newDiv.append(newP);
    container.append(newDiv);
  }
}

const api_key = "8ade30c6140f4c08b5ac38690f524819";
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const apiUrl = `http://api.sl.se/api2/realtimedeparturesv4.json?key=${api_key}&siteid=9181&timewindow=30`;

fetch(  
  proxyUrl + apiUrl
)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  });
