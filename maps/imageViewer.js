const images = {
    "Alby tunnelbana": {
        title: "Albys tunnelbanesystem",
        desc: "En karta för alla som tycker att det finns för lite tunnelbana i Alby. Även min första slutförda hittepåkarta någonsin! Grunden gjordes i <a href='https://beno.uk/metromapcreator/' class='inline'>Metro Map Creator</a> och resten av infon slängdes dit i Paint3D."
    },
    "Järnvägar-i-Mälardalen (1)": {
        title: "Tågtrafik i Mälardalen",
        desc: "Blev inspirerad av en redditör."
    },
};

function loadImage() {
    const key = localStorage.getItem("imageKey");

    let sectionEl = document.querySelector("section.image");

    if (!key) {
        sectionEl.append(document.createElement("p").innerText = "Felaktig nyckel!");
        return;
    }

    let h1El = document.createElement("h1");
    sectionEl.append(h1El);
    h1El.innerText = images[key].title;

    let imgEl = document.createElement("img");
    sectionEl.append(imgEl);
    imgEl.src = `./images/${key}.png`;
    imgEl.alt = images[key].title;

    let pEl = document.createElement("p");
    sectionEl.append(pEl);
    pEl.innerHTML = images[key].desc;
}

function loadThumbnails() {
    for (const key in images) {
        let aEl = document.createElement("a");
        document.querySelector("main").append(aEl);
        aEl.classList.add("projectWrapper");
        aEl.setAttribute("href", "./viewer.html");
        aEl.addEventListener("click", () => {
            localStorage.setItem("imageKey", key);
        })

        let imgEl = document.createElement("img");
        aEl.append(imgEl);
        imgEl.src = `./images/${key}.webp`;
        imgEl.alt = images[key].title;

        let divEl = document.createElement("div");
        aEl.append(divEl);
        divEl.classList.add("liChild");

        let h1El = document.createElement("h1");
        divEl.append(h1El);
        h1El.innerText = images[key].title;

        let pEl = document.createElement("p");
        divEl.append(pEl);
        pEl.innerHTML = images[key].desc.slice(0, 75) + "...";
    }
}