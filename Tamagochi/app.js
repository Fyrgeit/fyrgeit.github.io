var intervalId = window.setInterval(function(){
    tick();
}, 3000);

let infoBox = document.querySelector("div.infoBox");
let updateInfoBoxButton = document.querySelector("button.infoBox");

let tickButton = document.querySelector("button.tick");

let feedButton = document.querySelector("button.feed");

let hiButton = document.querySelector("button.hi");
let hiOutput = document.querySelector("span.hi");

let teachButton = document.querySelector("button.teach");
let teachInput = document.querySelector("input.teach");

let nameButton = document.querySelector("button.name");
let nameInput = document.querySelector("input.name");

updateInfoBoxButton.addEventListener("click", updateInfoBox);
nameButton.addEventListener("click", nameTamagotchi);
tickButton.addEventListener("click", tick);
feedButton.addEventListener("click", feed);
hiButton.addEventListener("click", hi);
teachButton.addEventListener("click", teach);

let tamagotchi = {
    Hunger: 0,
    Boredom: 0,
    Words: [],
    Alive: true,
    Name: "Tamagotchi",
};

updateInfoBox();

function updateInfoBox() {
    infoBox.innerHTML = "";

    let newName = document.createElement("h1");
    newName.innerHTML = tamagotchi.Name;
    infoBox.appendChild(newName);

    let newStatus = document.createElement("h2");
    newStatus.innerHTML = tamagotchi.Alive ? `${tamagotchi.Name} is alive` : `${tamagotchi.Name} is dead<br>Reload page to revive`
    infoBox.appendChild(newStatus);
    
    let newHunger = document.createElement("p");
    newHunger.innerHTML = `Hunger: ${tamagotchi.Hunger} ${tamagotchi.Hunger >= 5 ? "Please feed me!" : ""}`;
    newHunger.classList.add("hunger");
    infoBox.appendChild(newHunger);
    
    let newBoredom = document.createElement("p");
    newBoredom.innerHTML = `Boredom: ${tamagotchi.Boredom} ${tamagotchi.Boredom >= 5 ? "Please entertain me!" : ""}`;
    newBoredom.classList.add("boredom");
    infoBox.appendChild(newBoredom);
}

function nameTamagotchi() {
    tamagotchi.Name = nameInput.value;
    nameInput.value = "";
    updateInfoBox();
}

function tick() {
    tamagotchi.Hunger++;
    tamagotchi.Boredom++;

    if (tamagotchi.Hunger > 10 || tamagotchi.Boredom > 10) {
        tamagotchi.Alive = false;
    }

    updateInfoBox();
}

function feed() {
    tamagotchi.Hunger -= 4;

    updateInfoBox();
}

function reduceBoredom(amount) {
    tamagotchi.Boredom -= amount;

    updateInfoBox();
}

function hi() {
    if (tamagotchi.Words.length > 0) {
        hiOutput.innerHTML = tamagotchi.Words[Math.floor(Math.random()*tamagotchi.Words.length)];
    }

    reduceBoredom(3);
}

function teach() {
    if (teachInput.value != "") {   
        tamagotchi.Words.push(teachInput.value);
        teachInput.value = "";
    }
}