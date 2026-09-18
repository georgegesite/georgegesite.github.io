// script.js
// Wires the letter content from data.js into the page, and handles the
// envelope-opening moment. No frameworks, no build step — just open
// index.html in a browser.

document.addEventListener("DOMContentLoaded", () => {
  const envelopeStage = document.getElementById("envelope-stage");
  const letterStage = document.getElementById("letter-stage");
  const envelopeButton = document.getElementById("envelope");

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  fillInLetter();
  wireUpEnvelope();

  function fillInLetter() {
    document.getElementById("letter-recipient").textContent = LETTER.recipient;
    document.getElementById("letter-closing").textContent = LETTER.closing;
    document.getElementById("letter-signature").textContent = LETTER.signature;

    // A quiet line about distance rather than a real date, since this
    // is read whenever it's read.
    document.getElementById("letter-date").textContent =
      "written from far away, thinking of you";

    const body = document.getElementById("letter-body");
    body.innerHTML = "";
    LETTER.paragraphs.forEach((text) => {
      const p = document.createElement("p");
      p.textContent = text;
      body.appendChild(p);
    });
  }

  function wireUpEnvelope() {
    envelopeButton.addEventListener("click", openEnvelope, { once: true });
    envelopeButton.addEventListener(
      "keydown",
      (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openEnvelope();
        }
      },
      { once: true }
    );
  }

  function openEnvelope() {
    if (prefersReducedMotion) {
      showLetter();
      return;
    }

    envelopeStage.classList.add("is-opening");

    // Let the flap open and the paper rise before the whole envelope
    // gives way to the full letter.
    window.setTimeout(() => {
      envelopeStage.classList.add("is-leaving");
    }, 900);

    window.setTimeout(() => {
      envelopeStage.style.display = "none";
      showLetter();
    }, 1500);
  }

  function showLetter() {
    letterStage.classList.add("is-visible");
    letterStage.setAttribute("aria-hidden", "false");
    letterStage.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }
});
