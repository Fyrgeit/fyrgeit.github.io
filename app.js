function toggleSidebar() {
    let nav = document.querySelector("nav");

    nav.classList.toggle("hidden");
}

let links = [
    {href: "index.html", name: "Hem"},
    {href: "projekt.html", name: "Webb-projekt"},
    {href: "maps.html", name: "Kart-projekt"},
];

let currentUrl = window.location.href;
let navElement = document.querySelector("nav");

links.forEach(link => {
    let aElement = document.createElement("a");
    let h2Element = document.createElement("h2");

    h2Element.innerHTML = link.name;

    aElement.setAttribute("href", link.href);

    if (currentUrl.endsWith(link.href)) {
        h2Element.classList.add("current-page");
    }

    aElement.appendChild(h2Element);
    navElement.appendChild(aElement);
});