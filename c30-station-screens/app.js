const stationEl = document.querySelector("#station");
const titleEl = document.querySelector("#title");
const leftButtonEl = document.querySelector("#left");
const rightButtonEl = document.querySelector("#right");

const aboveEl = document.querySelector("#above");
const belowEl = document.querySelector("#below");

const staircaseSVG = '<polygon points="144 24 144 0 96 0 96 24 72 24 72 48 48 48 48 72 24 72 24 96 0 96 0 126 41.97 126 144 24"/><polygon class="inverted" points="6 120 6 102 30 102 30 78 54 78 54 54 78 54 78 30 102 30 102 6 138 6 138 21.51 39.48 120 6 120"/>';
const staircaseVB = "0 0 144 126";

const escalatorSVG = '<path d="M24,174h28.12c12.73,0,24.94-5.06,33.94-14.06L190.97,55.03c4.5-4.5,10.61-7.03,16.97-7.03h14.06c13.25,0,24-10.75,24-24h0C246,10.75,235.25,0,222,0h-28.12c-12.73,0-24.94,5.06-33.94,14.06L55.03,118.97c-4.5,4.5-10.61,7.03-16.97,7.03h-14.05c-13.26,0-24,10.74-24,24H0c0,13.26,10.75,24,24,24Z"/><path class="inverted" d="M24,168c-9.93,0-18-8.08-18-18s8.08-18,18-18h14.06c8.02,0,15.55-3.12,21.22-8.78L164.18,18.3c7.93-7.93,18.48-12.3,29.7-12.3h28.12c9.92,0,18,8.07,18,18s-8.08,18-18,18h-14.06c-8.01,0-15.55,3.12-21.21,8.79l-104.91,104.91c-7.93,7.93-18.48,12.3-29.7,12.3H24Z"/>';
const escalatorVB = "0 0 246 174";

let stations = [
    {
        name: "Alby",
        elements: [
            {
                type: "staircase",
                pos: 0,
                horizontal: 0,
                vertical: "up",
            },
            /* {
                type: "elevator",
                pos: 0,
                vertical: "up",
            }, */
        ],
    },
    {
        name: "Masmo",
        elements: [
            {
                type: "staircase",
                pos: 0.6,
                horizontal: 0,
                vertical: "up",
            },
            {
                type: "escalator",
                pos: 0.4,
                horizontal: 1,
                vertical: "up",
            },
            /* {
                type: "elevator",
                pos: 0.5,
                vertical: "up",
            }, */
        ],
    },
    {
        name: "T-centralen, rödgrön undre",
        elements: [
            {
                type: "escalator",
                pos: 0,
                horizontal: 0,
                vertical: "up",
            },
            {
                type: "escalator",
                pos: 0.3,
                horizontal: 0,
                vertical: "up",
            },
            {
                type: "escalator",
                pos: 0.4,
                horizontal: 0,
                vertical: "down",
            },
            {
                type: "escalator",
                pos: 0.6,
                horizontal: 1,
                vertical: "down",
            },
            {
                type: "escalator",
                pos: 0.7,
                horizontal: 1,
                vertical: "up",
            },
            {
                type: "escalator",
                pos: 1,
                horizontal: 1,
                vertical: "up",
            },
        ],
    }
];

let selected = 0;

leftButtonEl.addEventListener("click", left);
rightButtonEl.addEventListener("click", right);

update();

function update() {
    aboveEl.innerHTML = "";
    belowEl.innerHTML = "";
    
    titleEl.innerHTML = `Station: ${selected} - ${stations[selected].name}`;

    stations[selected].elements.forEach((el) => {
        let elEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        
        switch (el.type) {
            case "staircase":
                elEl.classList.add("staircase");
                elEl.setAttribute("viewBox", staircaseVB);
                elEl.innerHTML = staircaseSVG;
                break;

            case "escalator":
                elEl.classList.add("escalator");
                elEl.setAttribute("viewBox", escalatorVB);
                elEl.innerHTML = escalatorSVG;
                break;
                
            default:
                break;
        }

        elEl.classList.add("station-element");

        if (el.horizontal == 0) {
            elEl.classList.add("flipped");
        }

        elEl.setAttribute("style", `left: calc((100vw - 6rem) * ${el.pos} - calc(var(--staircase-width) / 50) * ${el.pos});`)
                
        if (el.vertical == "up") {
            aboveEl.append(elEl);
        } else if (el.vertical == "down") {
            belowEl.append(elEl);
        }
    });
}

function left() {
    selected--;
    selected = Math.max(selected, 0);
    update();
}

function right() {
    selected++;
    selected = Math.min(selected, stations.length - 1);
    update();
}
