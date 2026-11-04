let signals = ['0r', 'g0g0g', 'g0g', 'g0', 'g0b0', 'g0b0b', 'g00w'];

let fake = 'wbr';

let lookup = {
    0: 'off',
    g: 'green',
    r: 'red',
    b: 'green-blink',
    w: 'white-blink',
};

function signalsFromArray(signals, targetQuerySelector) {
    let mainEl = document.querySelector(targetQuerySelector);
    mainEl.innerHTML = '';

    signals.forEach((signal) => {
        let signalEl = document.createElement('div');
        signalEl.classList.add('main-light-signal');

        signal.split('').forEach((light) => {
            let lightEl = document.createElement('div');
            lightEl.classList.add('light');

            lightEl.classList.add(lookup[light]);

            signalEl.append(lightEl);
        });

        mainEl.append(signalEl);
    });
}

signalsFromArray(signals, '#correct-signals');
signalsFromArray([fake], '#fake-signal');
signalsFromArray([document.querySelector('input').value], '#custom-signal');

document.querySelector('input').oninput = (e) => {
    signalsFromArray([e.target.value], '#custom-signal');
};
