let data = [
  ["Kunskapskrav", "Steg E", "Steg C", "Steg A"],
  [
    "Kunskap",
    "Läraren har vissa kunskaper inom ämnet som läraren undervisar i.",
    "Läraren har goda kunskaper inom ämnet som läraren undervisar i.",
    "Läraren har mycket goda kunskaper inom ämnet som läraren undervisar i.",
  ],
  ["Engagemang",
    "Läraren bryr sig knappt om ämnet de undervisar i och vill knappt att eleverna ska bry sig om ämnet.",
    "Läraren bryr sig om ämnet de undervisar i och vill att eleverna ska bry sig om ämnet.",
    "Läraren bryr sig väldigt mycket om ämnet de undervisar i och vill väldigt gärna att eleverna ska bry sig om ämnet."
  ],
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
