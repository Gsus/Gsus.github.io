// const scroll = new SmoothScroll('#navbar a[href*="#"]', {
//   speed: 800,
// });

const bmc = document.querySelector(".bmc-btn-container");
bmc.classList.add("fade-in");

const smallSize = matchMedia("(max-width: 767px)"),
  tabletSize = matchMedia("(min-width: 768px) and (max-width: 1199px)"),
  desktopSize = matchMedia("(min-width: 1200px)"),
  smallSizeImgPaths = [
    "Mobile/SVGs/Code navbar icon.svg",
    // "Mobile/SVGs/Landing down chevron.svg",
    "Mobile/Portfolio thumbnails/L'indécis.png",
    "Mobile/Portfolio thumbnails/RGBGuessingGamePreview.png",
    "Mobile/Portfolio thumbnails/Portfolio.png",
    "Mobile/Portfolio thumbnails/NewsGrid.png",
    "Mobile/Portfolio thumbnails/BookList.png",
  ],
  tabletSizeImgPaths = [
    "Desktop/Illustrations-SVG/Code navbar icon.svg",
    // "Tablet/Tablet Chevron@2x.png",
    "Tablet/Portfolio Thumbnails/L'indécis.png",
    "Tablet/Portfolio Thumbnails/RGBGuessingGame.png",
    "Tablet/Portfolio Thumbnails/Portfolio.png",
    "Tablet/Portfolio Thumbnails/NewsGrid.png",
    "Tablet/Portfolio Thumbnails/BookList.png",
  ],
  desktopSizeImgPaths = [
    "Desktop/Illustrations-SVG/Code navbar icon.svg",
    // "Tablet/Tablet Chevron@2x.png",
    "Desktop/Portfolio thumbnails/L'indécis.png",
    "Desktop/Portfolio thumbnails/RGBGuessingGame.png",
    "Desktop/Portfolio thumbnails/Portfolio.png",
    "Desktop/Portfolio thumbnails/NewsGrid.png",
    "Desktop/Portfolio thumbnails/BookList.png",
  ],
  cardsImgs = document.querySelectorAll(".card > img"),
  // chevron = document.querySelector("#chevron"),
  navicon = document.querySelector("#navbar img"),
  faders = document.querySelectorAll(".fade-in");

// Construct array
let imgs = Array.from(cardsImgs);
// imgs.unshift(chevron);
imgs.unshift(navicon);

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

smallSize.onchange = () => changeImgSize(smallSize, smallSizeImgPaths);
changeImgSize(smallSize, smallSizeImgPaths);

tabletSize.onchange = () => changeImgSize(tabletSize, tabletSizeImgPaths);
changeImgSize(tabletSize, tabletSizeImgPaths);

desktopSize.onchange = () => changeImgSize(desktopSize, desktopSizeImgPaths);
changeImgSize(desktopSize, desktopSizeImgPaths);

// === Observer ===
const options = {
  threshold: 0.4,
  delay: 300,
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
