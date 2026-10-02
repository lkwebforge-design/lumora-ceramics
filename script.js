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


/* Bathware gallery reveal + gentle image parallax */
const galleryObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      galleryObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.transitionDelay = Math.min(index * 70, 420) + "ms";
  galleryObserver.observe(element);
});

const bathGallery = document.querySelector(".bathgallery");

if (bathGallery && window.innerWidth > 800) {
  bathGallery.addEventListener("mousemove", event => {
    const rect = bathGallery.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;

    bathGallery.querySelectorAll(".bathcard img").forEach((img, index) => {
      const strength = index === 0 ? 5 : 3;
      img.style.transform = `scale(1.06) translate(${x * strength}px, ${y * strength}px)`;
    });
  });

  bathGallery.addEventListener("mouseleave", () => {
    bathGallery.querySelectorAll(".bathcard img").forEach(img => {
      img.style.transform = "";
    });
  });
}


/* Immersive 3D object interaction */
const hero3d = document.querySelector(".scene");
const heroObject = document.querySelector(".lux-object");
if (hero3d && heroObject && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  let targetX = -10, targetY = 9, currentX = targetX, currentY = targetY;
  let raf = 0;
  const animate3D = () => {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;
    heroObject.style.transform = `translate(-50%,-50%) rotateX(${currentY}deg) rotateY(${currentX}deg) rotateZ(-2deg)`;
    raf = requestAnimationFrame(animate3D);
  };
  animate3D();

  hero3d.addEventListener("pointermove", event => {
    const r = hero3d.getBoundingClientRect();
    const px = (event.clientX - r.left) / r.width - 0.5;
    const py = (event.clientY - r.top) / r.height - 0.5;
    targetX = px * 18 - 4;
    targetY = -py * 14 + 8;
  });
  hero3d.addEventListener("pointerleave", () => {
    targetX = -10;
    targetY = 9;
  });

  const onScroll3D = () => {
    const r = hero3d.getBoundingClientRect();
    const progress = Math.max(-1, Math.min(1, -r.top / Math.max(r.height, 1)));
    heroObject.style.setProperty("--scroll-depth", progress.toFixed(3));
  };
  window.addEventListener("scroll", onScroll3D, {passive:true});
  onScroll3D();
  window.addEventListener("pagehide", () => cancelAnimationFrame(raf), {once:true});
}
