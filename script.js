const menu = document.querySelector(".menu");

menu?.addEventListener("click", () => {
  document.body.classList.toggle("navopen");
});


/* Scroll reveal */

const observer = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }

    });

  },
  {
    threshold: 0.12
  }
);


document
  .querySelectorAll(
    ".intro, .collections, .story, .showroom, .cta"
  )
  .forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
      "translateY(30px)";

    element.style.transition =
      "1s ease";

    observer.observe(element);

  });


const revealStyle = document.createElement("style");

revealStyle.textContent = `

.show {
  opacity: 1 !important;
  transform: none !important;
}

`;

document.head.appendChild(revealStyle);


/* 3D hero mouse movement */

const scene = document.querySelector(".scene");

if (scene && window.innerWidth > 800) {

  scene.addEventListener("mousemove", event => {

    const rect = scene.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) /
      rect.width -
      0.5;

    const y =
      (event.clientY - rect.top) /
      rect.height -
      0.5;


    const pedestal =
      document.querySelector(".pedestal");

    const rings =
      document.querySelectorAll(".ring");

    const bowl =
      document.querySelector(".bowl");


    if (pedestal) {

      pedestal.style.transform =
        `rotateX(${y * -10 + 3}deg)
         rotateY(${x * 14}deg)
         translateY(-8px)`;

    }


    if (bowl) {

      bowl.style.transform =
        `translate(${x * 18}px, ${y * 12}px)`;

    }


    rings.forEach((ring, index) => {

      const amount =
        index === 0 ? 14 : -10;

      ring.style.marginLeft =
        `${x * amount}px`;

      ring.style.marginTop =
        `${y * amount}px`;

    });

  });


  scene.addEventListener("mouseleave", () => {

    const pedestal =
      document.querySelector(".pedestal");

    const bowl =
      document.querySelector(".bowl");

    if (pedestal) {
      pedestal.style.transform = "";
    }

    if (bowl) {
      bowl.style.transform = "";
    }

  });

}
