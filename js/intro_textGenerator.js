const typedTextSpan = document.querySelector('.typed-text');
const cursorSpan = document.querySelector('.cursor');

const textArray = ['Front-end Developer', 'tech passionate', 'sport lover', 'self-taught'];
let typingDelay = 250;
const erasingDelay = 100;
// Delay between current and next text
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {

    if (charIndex < textArray[textArrayIndex].length) {
        // add class typing to stop animation in css
        cursorSpan.classList.add('typing');

        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;

        setTimeout(type, typingDelay);

        // increase typing speed
        if (typingDelay > 75) typingDelay = typingDelay - 25;

    } else {
        cursorSpan.classList.remove('typing');
        setTimeout(erase, newTextDelay);
        typingDelay = 250;
    }
}

function erase() {
    if (charIndex > 0) {
        cursorSpan.classList.add('typing');
        typedTextSpan.textContent = textArray[textArrayIndex].substring(
            0,
            charIndex - 1
        );
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        cursorSpan.classList.remove('typing');
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) {
            textArrayIndex = 0;
        }
        setTimeout(type, typingDelay + 1100);
    }
}

if (textArray.length) {
    // first word shown in page is in first place in array
    // then is deleted to the next one
    charIndex = textArray[0].length;
    typedTextSpan.innerHTML = textArray[0];

    setTimeout(erase, newTextDelay + 1000);
}