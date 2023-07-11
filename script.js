const display = document.querySelector(".display");
const backgroundImages = [
  "img/background.png",
  "img/display2__background.jpg",
  "img/display3__background.jpg",
];
let currSlide;
let classNum = 0;
let currdot = 0;
let num = 1;
let intervalId = null;
const dots = document.querySelectorAll(".dot");
const Alldots = document.querySelector(".Alldots");

const data = {
  data1: {
    heading: "A NEW HERO RISES",
    para: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloro necessitatibus maiores vero,autem delectus id ",
    paraMid:
      "inventore quosvero,autem delectus id inventore quoserror hic soluta perferendis?",
  },
  data2: {
    heading: "AGE OF THE DRAGON",
    para: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloro necessitatibus maiores vero,autem delectus id ",
    paraMid:
      "inventore quosvero,autem delectus id inventore quoserror hic soluta perferendis?",
  },
  data3: {
    heading: "WIELDER OF THE FLAME",
    para: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloro necessitatibus maiores vero,autem delectus id ",
    paraMid:
      "inventore quosvero,autem delectus id inventore quoserror hic soluta perferendis?",
  },
};

//For Fading Animation
const createHeading = function (num) {
  return data[`data${num}`].heading.split("").reduce(function (acc, ele) {
    if (ele !== " ") {
      classNum++;
      return acc + `<span id="s${classNum}">${ele}</span>`;
    }
    if (ele === " ") {
      return acc + " ";
    }
  }, "");
};

const startTimer = function (num) {
  intervalId = setInterval(function () {
    changeBackground(num);
  }, 10000);
};

const changeBackground = function (currSlide) {
  clearInterval(intervalId);

  //For BackgroundImage
  dots[currdot].classList.remove("active__dot");

  // Clear any existing animation
  display.style.animation = "none";

  // Wait for the animation to clear (use a timeout)
  setTimeout(function () {
    display.style.backgroundImage = `url(${backgroundImages[currSlide - 1]})`;
    dots[currSlide - 1].classList.add("active__dot");
    display.style.animation = `scale 10s ease-in infinite forwards`;
    currdot = currSlide - 1;

    //For Section

    const HTML = `<section class="section1">
     <span class="head1 ">${createHeading(currSlide)}</span>
    <img class="img__bar animate1" src="img/imgbar.png" alt="" />
    <span class="para__1 animate1"
      >${data[`data${currSlide}`].para}
      <span class="para__1__mid animate1"
        >${data[`data${currSlide}`].paraMid}</span
      >
    </span>
  </section>`;
    display.innerHTML = "";
    display.insertAdjacentHTML("beforeend", HTML);

    // //For Letter Animation

    const heading1 = document.querySelector(".head1");
    const Selements = heading1.getElementsByTagName("span");
    for (let i = 0; i < Selements.length; i++) {
      Selements[i].style.opacity = `0`;
      Selements[i].style.animation = `textFading 2s ease-out ${
        i * 0.2
      }s forwards`;
    }

    if (currSlide % backgroundImages.length === 0) currSlide = 1;
    else currSlide++;

    num = currSlide;

    startTimer(num);
  }, 100); // Wait for 100ms before changing the background
};

changeBackground((currSlide = 1));

//Pagination

Alldots.addEventListener("click", function (e) {
  currSlide = Number(e.target.closest(".dot").dataset.slide);

  dots[currdot].classList.remove("active__dot");
  clearInterval(intervalId);
  changeBackground(currSlide);

  dots[currSlide - 1].classList.add("active__dot");
  currdot = currSlide - 1;
});
