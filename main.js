// ============  Dark mode toggler ==============
const body = document.querySelector("body"),
  themeToggler = document.querySelector("#theme-toggler"),
  homeIconsStrokes = document.querySelectorAll(".home-icon-stroke"),
  contactIconsStrokes = document.querySelectorAll(".contact-icon-stroke"),
  contactChevronBackground = document.querySelector("#chevron-background");

const toggleTheme = (e) => {
  // Add/remove dark mode
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    // If adding dark mode
    // Change toggler's img to a sun
    changeImgPath(themeToggler.firstElementChild, "/src/Mobile/SVGs/sun.svg");

    // Change icons' colors
    homeIconsStrokes.forEach(
      (stroke) => stroke.setAttribute("stroke", "#5d9ad8") // --lighter-primary-blue
    );
    contactIconsStrokes.forEach(
      (stroke) => stroke.setAttribute("stroke", "#f4f4f4") // --light-gray
    );

    // Change contact section's chevron's background
    contactChevronBackground.setAttribute("fill", "#214467"); // --darker-primary-blue

    // Take note of the theme in LS
    localStorage.setItem("darkModeOn", "true");
  } else {
    // If removing dark mode
    // Change toggler's img to a moon
    changeImgPath(themeToggler.firstElementChild, "/src/Mobile/SVGs/moon.svg");

    // Change icons' colors
    homeIconsStrokes.forEach(
      (stroke) => stroke.setAttribute("stroke", "#214467") // --darker-primary-blue
    );
    contactIconsStrokes.forEach(
      (stroke) => stroke.setAttribute("stroke", "#001a34") // --dark-blue
    );

    // Change contact section's chevron's background
    contactChevronBackground.setAttribute("fill", "#3f6e9e"); // --blue

    // Take note of the theme in LS
    localStorage.setItem("darkModeOn", "false");
  }

  // If there's an event object (aka, if the function was called because of an event firing...)
  if (e) e.preventDefault();
};

const changeImgPath = (img, newRelPath) => {
  let oldPath = img.src;
  let urlObject = new URL(oldPath);
  urlObject.pathname = newRelPath;
  img.src = urlObject.href;
};

const changeImgSize = (mql, paths) => {
  if (mql.matches) {
    for (let i = 0; i < paths.length; i++) {
      changeImgPath(imgs[i], paths[i]);
    }
  }
};

themeToggler.addEventListener("click", toggleTheme);

// ====== Remember if dark mode was on or not. =====
// Check local storage to see if there's any value at all regarding the site's theme
if (!localStorage.getItem("darkModeOn")) {
  // Is there anything there? No? Assign a value then
  // Setting an initial value to the key-value pair
  localStorage.setItem("darkModeOn", "false");
} else {
  // If there IS a value, check if it's "true" so it can turn dark mode on; otherwise, leave it as light.
  if (localStorage.getItem("darkModeOn") === "true") toggleTheme();
}

// ===============================================================

// This button is generated through a script, so add the fade class afterwards.
const bmcContainer = document.querySelector(".bmc-btn-container");
bmcContainer.classList.add("fade-in");

// ========= Change images depending on a certain media query ==========
const smallSize = matchMedia("(max-width: 767px)"),
  tabletSize = matchMedia("(min-width: 768px) and (max-width: 1199px)"),
  desktopSize = matchMedia("(min-width: 1200px)"),
  smallSizeImgPaths = [
    "src/Mobile/SVGs/Code navbar icon.svg",
    "src/Mobile/Portfolio thumbnails/L'indécis.png",
    "src/Mobile/Portfolio thumbnails/RGBGuessingGamePreview.png",
    "src/Mobile/Portfolio thumbnails/Portfolio.png",
    "src/Mobile/Portfolio thumbnails/NewsGrid.png",
    "src/Mobile/Portfolio thumbnails/BookList.png",
  ],
  tabletSizeImgPaths = [
    "src/Desktop/Illustrations-SVG/Code navbar icon.svg",
    "src/Tablet/Portfolio Thumbnails/L'indécis.png",
    "src/Tablet/Portfolio Thumbnails/RGBGuessingGame.png",
    "src/Tablet/Portfolio Thumbnails/Portfolio.png",
    "src/Tablet/Portfolio Thumbnails/NewsGrid.png",
    "src/Tablet/Portfolio Thumbnails/BookList.png",
  ],
  desktopSizeImgPaths = [
    "src/Desktop/Illustrations-SVG/Code navbar icon.svg",
    "src/Desktop/Portfolio thumbnails/L'indécis.png",
    "src/Desktop/Portfolio thumbnails/RGBGuessingGame.png",
    "src/Desktop/Portfolio thumbnails/Portfolio.png",
    "src/Desktop/Portfolio thumbnails/NewsGrid.png",
    "src/Desktop/Portfolio thumbnails/BookList.png",
  ],
  cardsImgs = document.querySelectorAll(".card > img"),
  navicon = document.querySelector("#navbar img");

// Construct array of cards' images
let imgs = Array.from(cardsImgs);
// Add the nav icon to the front
imgs.unshift(navicon);

smallSize.onchange = () => changeImgSize(smallSize, smallSizeImgPaths);
changeImgSize(smallSize, smallSizeImgPaths);

tabletSize.onchange = () => changeImgSize(tabletSize, tabletSizeImgPaths);
changeImgSize(tabletSize, tabletSizeImgPaths);

desktopSize.onchange = () => changeImgSize(desktopSize, desktopSizeImgPaths);
changeImgSize(desktopSize, desktopSizeImgPaths);

// =================================================

// ======= Observer for the fade-in on scroll =======
const faders = document.querySelectorAll(".fade-in"),
  options = {
    threshold: 0.4,
    delay: 200,
  };

const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
  for (let entry of entries) {
    if (!entry.isIntersecting) {
      continue;
    }
    entry.target.classList.add("appear");
    appearOnScroll.unobserve(entry.target);
  }
}, options);

for (let fader of faders) {
  appearOnScroll.observe(fader);
}

// ================================================
