let signals = [
    ["0", "r"],
    ["g", "0", "g", "0", "g"],
    ["g", "0", "g"],
    ["g", "0"],
    ["g", "0", "b", "0"],
    ["g", "0", "b", "0", "b"],
    ["g", "0", "0", "w"],
];

let fakes = [
    ["w", "b", "r"]
];

let lookup = {
    "0": "off",
    "g": "green",
    "r": "red",
    "b": "green-blink",
    "w": "white-blink",
};

function signalsFromArray(array, targetQuerySelector) {
    let mainEl = document.querySelector(targetQuerySelector);

    array.forEach(signal => {
        let signalEl = document.createElement("div");
        signalEl.classList.add("main-light-signal");

        signal.forEach(light => {
            let lightEl = document.createElement("div");
            lightEl.classList.add("light");

            lightEl.classList.add(lookup[light]);

            signalEl.append(lightEl);
        });

        mainEl.append(signalEl);
    });
}

signalsFromArray(signals, "section.correct-signals");
signalsFromArray(fakes, "section.fake-signals");