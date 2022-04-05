import gsap, { Power1 } from "gsap";

const bigCircle = document.querySelector("div.big-circle");

const circlesRoundingContainer = document.querySelector("div.circles-rounding-container");

let circlesRound;

let circlesQuantity = 20;

const fragment = document.createDocumentFragment();
for (let i = 0; i < circlesQuantity; i++) {
    const divCircle = document.createElement("div");
    divCircle.classList.add("circle-rounding");
    fragment.appendChild(divCircle);
}
circlesRoundingContainer.appendChild(fragment);

circlesRound = document.querySelectorAll("div.circle-rounding");

gsap.fromTo(bigCircle, 
{ right: 0, top: 100 }, 
{ left: -50, top: -50, duration: 17, ease: Power1.easeOut, yoyo: true, repeat: -1}
)

const tl = gsap.timeline();

    tl.to(circlesRound, {
        autoAlpha: 1,
        duration: 2,
        top: "20%",
        left: "80%",
        stagger: 0.2,
    })
    .to(circlesRound, {
        duration: 2,
        top: "50%",
        left: "20%",
        stagger: 0.2,
    })
    .to(circlesRound, {
        zIndex: 10000,
        autoAlpha: 0,
        duration: 2,
        top: "80%",
        left: "80%",
        autoAlpha: 0,
        stagger: 0.2,
    })