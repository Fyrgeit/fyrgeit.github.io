const images = {
    "Alby tunnelbana": {
        title: "Albys tunnelbanesystem",
        desc: "En karta för alla som tycker att det finns för lite tunnelbana i Alby. Även min första slutförda hittepåkarta någonsin! Grunden gjordes i <a href='https://beno.uk/metromapcreator/' target='_blank'>Metro Map Creator</a> och resten av infon slängdes dit i Paint3D."
    },
    "Tvärbanorna": {
        title: "Stockholms sammanhängande spårvägar",
        desc: "Ännu en karta gjord i <a href='https://beno.uk/metromapcreator/' target='_blank'>Metro Map Creator</a>. Mycket inspirerad (eller rent av kopierad) av <a href='https://youtu.be/y_9fhvqWPBs?t=593' target='_blank'>Stockholmshjärtas</a> förslag på utbyggnader av snabbspårvägar utöver Spårväg Syd. Dock har jag lagt till Lidingöbanan och Spårväg City och hittat på lite trafikeringslinjer."
    },
    "Tunnelbanan": {
        title: "Nya tunnelbanan (2022)",
        desc: "Nya tunnelbanan enligt ursprungliga planer! Alltså att gula linjen (vars färg den inte hade då) fortsatte ner på röda linjens spår till Skärholmen. Denna karta gjorde jag när jag rätt nyligen hade lärt mig Adobe Illustrator, och den är nog fortfarande en av mina top 3 kartor."
    },
    "Nya tunnelbanan": {
        title: "Nya tunnelbanan (2023)",
        desc: "En annan avbildning av nya tunnelbanan som jag är riktigt stolt över. Jag tycker jag har fått till 'luftigheten' som finns i många professionella kartor (även om det är lite trångt på sina ställen :D). Tycker även om att typsnittet får det att se lite vintage ut. (Kanske påminner om <a href='https://sv.wikipedia.org/wiki/Esseltub' target='_blank'>Esseltub</a>?)"
    },
    "Tvarbanana": {
        two: true,
        title: "Tvärbanan",
        desc: "Gjorde denna mest för att testa lite olika sätt att markera saker och ting. Till exempel att visa stationer på en sträcka med flera linjer som en utdragen stationsblob, och även att en linje tar slut mitt på en sträcka. Sedan kände jag för att göra en karta i dark mode och passade även på att översätta till engelska, men det gick lite över styr..."
    },
    "Mjölkpallstrafiken": {
        title: "Mjölkpallspendeln",
        desc: "Detta är nog en av mina top 3 kartor och kom till när jag tänkte på alla små stackars stationer som ligger längs stambanorna, men inte har haft nån trafik på många år. I denna alternativa verklighet har Sörmlandstrafiken tagit tag i detta problemet och startat trafikkonceptet Mjölkpallspendeln (visst har det en fantastisk slogan?). Historiskt sett är mjölkpallståg långsamma tåg som stannar vid alla möjliga stationer, till skillnad från snälltågen, som bara stannade i de större orterna, som Flen!"
    },
    "Regionaltåg-01": {
        title: "Regionaltåg i Sverige",
        desc: "En geografiskt korrekt karta gjord i Illustrator för att visa hur bra landet täcks av regionaltåg. Inkluderar dock inte SJ:s regionaltåg, för att jag trodde det skulle bli jobbigt, men vid närmare eftertanke blir det ju bara de två X40-linjerna och Kust till kust-tågen."
    },
    "Järnvägar-i-Mälardalen (1)": {
        title: "Tågtrafik i Mälardalen",
        desc: "Troligtvis min karta med flest antal linjer. Denna gjorde jag efter att ha blivit inspirerad av en snubbe på Reddit som gjorde en jättevacker karta över all tågtrafik i södra Sverige upp till Mälardalen, så jag blev sugen på att bygga på konceptet. Det finns definitivt ett par fel i den utöver att vissa saker är utdaterade."
    },
    "stadsbussar": {
        two: true,
        title: "Stomnätet i Stockholms innerstad",
        desc: "Ytterligare en av mina favoriter. Jag hade aldrig riktigt gjort en busskarta förut, men tyckte det blev bra ändå, med tanke på att bussnätverk ofta är mycket mer komplicerade än spårtrafiknätverk. Gjorde även engelska + dark mode för att. Nu fattas bara en karta med alla innerstadsbussar :D (Nej)"
    },
    "Tumba-Alby": {
        title: "Bussar i Alby",
        desc: "En till busskarta! Denna gjorde jag för att se ifall man hade kunnat dra om någon befintlig busslinje till det planerade bostadsområdet <a href='https://www.botkyrka.se/stadsplanering-och-trafik/botkyrka-vaxer/hitta-projekt-efter-kommundel/alby/pagaende-planer-och-program/albytappan' target='_blank'>Albytäppan</a> (ligger vid Amalias väg). Istället för att dra om skapade jag en ny linje som även fungerar som en ringlinje i Alby. Inte särskilt troligt att något sånt händer, men kul att spåna på. (btw rip 743:an)"
    },
    "Pågen24": {
        title: "Pågatågen 2024",
        desc: "Denna karta gjordes för att visa Pågatågens trafikupplägg efter tidtabellsbytet 10:e december 2024 (då Klostergården öppnade). Den var rätt kul och lärorik att göra. Dock saknas ett par Pågatåg Express Malmö-Hässleholm-Älmhult (och även till Ystad tror jag?)."
    },
    "Nynäsbanan": {
        title: "Nynäsbanan overhaul",
        desc: "En dag tyckte jag lite synd om alla som bor i Nynäshamn och bestämde mig för att kolla ifall det är möjligt med expresståg hela vägen ner till Nynäshamn. Det visar sig att det går att spara några minuter, under förutsättningen att man bygger dubbelspår mellan Nynäsgård och Ösmo. Roligt - som alltid - med grafiska tidtabeller."
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
    
    if (images[key].two) {
        let imgEl2 = document.createElement("img");
        sectionEl.append(imgEl2);
        imgEl2.src = `./images/${key} (2).png`;
        imgEl2.alt = images[key].title;

    }

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

        /* let pEl = document.createElement("p");
        divEl.append(pEl);
        pEl.innerHTML = images[key].desc.slice(0, 75) + "..."; */
    }
}