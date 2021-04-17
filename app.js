//define variable
const body = document.querySelector(`body`);
const sld = document.querySelector(`.slidebar`);
const animeList = document.querySelector(`.animelist`);
let previousslide = document.querySelector(`#firstslide`);

//add event lishnars
sld.addEventListener("click", slider);
document.addEventListener("scroll", scrollhide);

//functions

function slider(e) {
  const b = previousslide.childNodes;
  const c = e.target.childNodes;
  console.log(previousslide);
  console.log(c[1]);

  const currentslide = e.target;
  currentslide.style.width = `85%`;
  c[1].style.display = `block`;
  previousslide.style.width = `5%`;

  previousslide = currentslide;
  setTimeout(() => {
    console.log(`timeout is working`);
    c[1].style.display = `block`;

    c[1].style.opacity = `1`;
    b[1].style.opacity = `0`;
  }, 800);
  b[1].style.display = `none`;
}

function scrollhide() {
  const navbttn = document.querySelector(`.customnavbttn`);
  const yPosition =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0;
  if (yPosition > 300) {
    navbttn.style.display = `block`;
  } else {
    navbttn.style.display = `none`;
  }
}

function circleanimation() {
  const circles = [...document.querySelectorAll(`.circle`)];
  circles.forEach((circle) => {
    circle.style.animationName = `circlesanimate`;
  });
  console.log(circles);
}
//function to fetch data

function animedata() {
  const promise = fetch(
    "https://simpleanime.p.rapidapi.com/anime/list/recent",
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "6485a298ccmsh50c49557d180251p144e64jsn5cd0c942dacd",
        "x-rapidapi-host": "simpleanime.p.rapidapi.com",
      },
    }
  )
    .then((res) => res.json())
    .then((anime) => {
      console.log(anime.data);
      anime.data.forEach((animedetail) => {
        const list = document.createElement("div");
        list.innerHTML = `
                          <div class="animeli">
                            <div class="titleimg">
                               <img src="${animedetail.cover}" alt="">
                               <p style = "display: none">${animedetail.vid_id}</p>
                            </div>
                           
                                <h2>${animedetail.title}</h2>
                                <p>${animedetail.date}</p>
                            
                           </div>
                          `;
        animeList.appendChild(list);
      });
      const animes = [...document.querySelectorAll(`.titleimg`)];
      console.log(animes);
      animes.forEach((anime) => {
        anime.addEventListener(`click`, showdetail);
      });
    });
}
function showdetail(e) {
  console.log(e.target.children[2]);
}

//calling functions

animedata();
circleanimation();
