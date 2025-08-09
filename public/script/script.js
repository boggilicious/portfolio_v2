let index = 0;

function typeWriter() {
    const attributes = ["WEB DEV...", "PHP artisan...", "JS newbie...", "Bogdan Noskov!"];
    let wordIndex = 0;
    let i = 0;
    let attr = '';
    let isDeleting = false;
    const element = document.getElementById('myName');

    function type() {
        const currentWord = attributes[wordIndex];

        if (!isDeleting) {
            attr = currentWord.substring(0, i + 1);
            i++;
        } else {
            attr = currentWord.substring(0, i - 1);
            i--;
        }

        element.innerHTML = attr;

        let delay = 100;

        if (!isDeleting && i === currentWord.length) {
            delay = 1000;
            isDeleting = true;
        } else if (isDeleting && i === 0) {
            element.innerHTML = "";
            isDeleting = false;
            wordIndex = (wordIndex + 1) % attributes.length;
            delay = 500; // pause before typing next word
        }

        setTimeout(type, delay);
    }

    type();
}

$(document).ready(function () {
    typeWriter();
});
