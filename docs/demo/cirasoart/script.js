

function activateRandomItemOfSection(section) {
    let elements = document.querySelectorAll("main > section#" + section + " > ul > li");
    if (elements.length == 0) { return; }
    let randomIndex = Math.floor(Math.random() * elements.length);
    //
    elements.forEach(element => element.classList.remove("active"));
    document.querySelectorAll("main > section#" + section + " > ul > li")[randomIndex].classList.add("active");
}

function activateHoveredItemOfSection(section) {

}

function activateNextItemOfSection(section) {
    let element = document.querySelector("main > section#" + section + " > ul > li.active");
    if (element == null || element.nextElementSibling == null) {
        element?.classList.remove("active");
        element = document.querySelector("main > section#" + section + " > ul > li:first-child");
    } else {
        // element.classList.remove("active");
        document.querySelectorAll("main > section#" + section + " > ul > li.active").forEach(e => e.classList.remove("active"));
        element = element.nextElementSibling;
    }
    element.classList.add("active");
}

function deactivateItemsOfSection(section) {
    document.querySelectorAll("main > section#" + section + " > ul > li.active").forEach(e => e.classList.remove("active"));
}

// Activate hover effect

document.querySelectorAll("main > section > ul > li").forEach(element => {
    element.addEventListener("pointerenter", event => {
        if (event.pointerType !== 'mouse') { return };
        let section = event.target?.parentElement?.parentElement?.id;
        if (section == null) { return };
        if (document.querySelector("main > section#" + section) == null) { return };
        deactivateItemsOfSection(section);
        event.target.classList.add("active");
    });
});

// Randomly activate an item of each section

document.querySelectorAll("main > section").forEach(section => {
    activateRandomItemOfSection(section.id);
});

// Every 10 seconds, advance to next item of each section if not hovering
const carouselInterval = 10000;
const sectionCount = document.querySelectorAll("main > section").length;
function advanceCarousel() {
    let accumulatedDelay = 0;
    let sections = document.querySelectorAll("main > section");
    sections.forEach(section => {
        setTimeout(() => {
            if (section.matches(':has(li a:hover)')) { return };
            activateNextItemOfSection(section.id);
        }, accumulatedDelay);
        accumulatedDelay += carouselInterval;
    });
}
// First iteration begins at the desired interval
setTimeout(advanceCarousel, carouselInterval);
// But the timer must account for the period of all sections to keep transitions uniformly spaced
setInterval(advanceCarousel, carouselInterval * sectionCount);

// Remove page fragment when scrolling to top
document.addEventListener("scrollend" in window ? "scrollend" : "scroll", () => {
    if (window.scrollY === 0) {
        history.replaceState(null, document.title, location.pathname + location.search);
    }
});