// change color for dark theme
const toggleDarkTheme = document.querySelector('#dark-theme-switch');
const root = document.documentElement;

// check a specific media query to insert a break in a line
const media450 = window.matchMedia('(max-width: 450px)');
const media300 = window.matchMedia('(min-width: 300px)');
const span = document.querySelector('#span-br');
const br = document.createElement('br');

// menu btn
const menuBtn = document.querySelector('#navi-toggle');
const nav = document.querySelector('#nav-id');
const ul = document.querySelector('#ul');
const li = document.querySelectorAll('#nav-id li');
const media700 = window.matchMedia('(max-width: 700px)');

// close menu when a section is clicked
const logoContainer = document.querySelector('.logo-container');

// check window dimmensions
const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
const windowWidth = window.innerWidth || document.documentElement.clientWidth;

// insert an animated logo in menu when activated
let animatedLogoDiv = document.createElement('div');
animatedLogoDiv.innerHTML = `<div class="box-common small top-left"></div>
                            <div class="box-common big top-right"></div>
                            <div class="box-common big bottom-left"></div>
                            <div class="box-common small bottom-right"></div>`;

// change color for dark theme
toggleDarkTheme.addEventListener('click', (e) => {
    root.classList.toggle('dark-theme');
});

// check a specific media query to insert a break after Rubén in intro-section
function addDeleteBr(e) {
    e.matches ? span.prepend(br) : br.remove();;
}
// when media matches
addDeleteBr(media450);
// when media change
media450.addEventListener('change', addDeleteBr);

// menu btn
menuBtn.addEventListener('change', (e) => {
    // hamburguer menu activated
    if (menuBtn.checked) {
        document.querySelector('body').style.overflowY = 'hidden';
        nav.classList.add('nav-checkbox-checked');

        // insert animated logo
        // nav.append(animatedLogoDiv);
        // animatedLogoDiv.classList.add('flex', 'wrap', 'animated-logo-container', 'animated-logo-container-menu');

        /* close menu when a section is clicked */
        // when header logo is clicked
        logoContainer.addEventListener('click', (e) => {
            menuBtn.checked = false;
            document.querySelector('body').style.overflow = 'auto';
            nav.classList.remove('nav-checkbox-checked');

            // delete animated logo
            nav.removeChild(animatedLogoDiv);
        });

        // when a tag from nav panel is clicked
        li.forEach(item => {
            item.addEventListener('click', (e) => {
                menuBtn.checked = false;
                document.querySelector('body').style.overflow = 'auto';
                nav.classList.remove('nav-checkbox-checked');

                // delete animated logo
                nav.removeChild(animatedLogoDiv);
            });
        });
    } else {
        // hamburguer menu desactivated
        document.querySelector('body').style.overflowY = 'auto';
        nav.classList.remove('nav-checkbox-checked');

        // delete animated logo
        nav.removeChild(animatedLogoDiv);
    }
});

// when media query is up to 700 close everything inside menu
media700.onchange = (e) => {
    if (menuBtn.checked) {
        menuBtn.checked = false;
        document.querySelector('body').style.overflow = 'auto';
        nav.classList.remove('nav-checkbox-checked');
        nav.removeChild(animatedLogoDiv);
    }
}

// btn theme switcher
const outerContainer = document.querySelector(".outer-container");
const palette = document.querySelector("#color-theme-switch");
const bubblesContainer = document.querySelector("#bubbles-container");
const radioBtns = bubblesContainer.querySelectorAll("input");
const redBubble = document.querySelector("#red-theme-label");
const blueBubble = document.querySelector("#blue-theme-label");
const greenBubble = document.querySelector("#green-theme-label");

palette.addEventListener("click", (e) => {
    redBubble.classList.toggle("red-bubble-move");
    blueBubble.classList.toggle("blue-bubble-move");
    greenBubble.classList.toggle("green-bubble-move");
});

radioBtns.forEach((elem) => {
    elem.addEventListener("click", (e) => {
        switch (elem.value) {
            case "red":
                outerContainer.style.backgroundColor = "salmon";
                console.log("red");
                break;
            case "blue":
                outerContainer.style.backgroundColor = "lightblue";
                break;
            case "green":
                outerContainer.style.backgroundColor = "lightgreen";
                break;
        }
    });
});


// check if any element is in the viewport //
function isAnyPartOfElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    const vertInView = rect.top <= windowHeight && rect.top + rect.height >= 0;
    const horInView = rect.left <= windowWidth && rect.left + rect.width >= 0;

    return vertInView && horInView;
}

let delay = 0;
// making them visible while scrolling
function scrollHandler() {
    document
        .querySelectorAll(".show-on-scroll:not(.is-visible)")
        .forEach((element) => {
            setTimeout(function () {
                if (
                    isAnyPartOfElementInViewport(element) &&
                    !element.classList.contains("is-visible")
                ) {
                    element.classList.add("is-visible");
                }
            }, delay);

            delay === 2000 ? delay = 0 : delay += 500;
        });
}

window.addEventListener("scroll", scrollHandler);

// call the scroll handler function at first load to show elements that
// is already in the viewport
scrollHandler();
