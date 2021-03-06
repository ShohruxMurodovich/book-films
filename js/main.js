var elList = document.querySelector(".list");
var elBookList = document.querySelector(".book__list");
let elDarkBtn = document.querySelector(".dark-mode");
let elBody = document.querySelector(".body");

const localBook = JSON.parse(window.localStorage.getItem("list"));
let bookedFilms = localBook || [];

newLists(bookedFilms, elBookList);




function renderFilms(arr, element){
  element.innerHTML = "";
  arr.forEach(films => {
    var newItem = document.createElement("li");
    var newImg = document.createElement("img");
    var newHeading = document.createElement("h3");
    var newText = document.createElement("p");
    var newBtn = document.createElement("button");


    newHeading.textContent = films.title;
    newText.textContent = films.overview.split(" ").slice(0 ,10).join(" ") + "...";
    newBtn.textContent = "Bookmark";
    newBtn.dataset.dataId = films.id;



    newItem.setAttribute("class", "list__item");
    newImg.setAttribute("src", films.poster);
    newImg.setAttribute("class", "list__img");
    newBtn.setAttribute("class" , "book__btn");



    newItem.appendChild(newImg);
    newItem.appendChild(newHeading);
    newItem.appendChild(newText);
    newItem.appendChild(newBtn);
    element.appendChild(newItem);

  });



}

function renderGenes(arr , element){


  var renderGeners = [];

  arr.forEach((films) => {

    films.genres.forEach(genre => {
      if(!renderGeners.includes(genre)){
        renderGeners.push(genre)
      }
    })
  })
  renderGeners.forEach(genre => {
    const newOption = document.createElement("option");
    newOption.value = genre;
    newOption.textContent = genre;
    element.appendChild(newOption);
  })

}


function newLists (arr, element){

  element.innerHTML = "";

  arr.forEach(e => {
    let elBookItem = document.createElement("li");
    let elRemoveBtn = document.createElement("button");
    elBookItem.textContent = e.title;
    elRemoveBtn.textContent = "Remove";
    elRemoveBtn.dataset.dataId = e.id;
    elBookItem.setAttribute("class", "bookmark__item");
    elRemoveBtn.setAttribute("class", "bookmark__btn");
    window.localStorage.setItem("list", JSON.stringify(bookedFilms));
    elBookList.appendChild(elBookItem);
    elBookItem.appendChild(elRemoveBtn);

  })

}


elList.addEventListener("click", evt=>{
  if(evt.target.matches(".book__btn")){
    let btnId = evt.target.dataset.dataId;
    let searchBtn = films.find(e=> e.id === btnId)
    if(!bookedFilms.includes(searchBtn)){
      bookedFilms.push(searchBtn);
    }
  }
  window.localStorage.setItem("list", JSON.stringify(bookedFilms))
  newLists(bookedFilms , elBookList)
})


let inpSearch = document.querySelector(".search-film");

inpSearch.addEventListener("input", searching =>{

  elList.innerHTML = "";

  let filmName = films.filter(name => {

      let nameLower = name.title.toLowerCase();

      if (nameLower.includes(inpSearch.value)) return name;

  })
  window.localStorage.setItem("list", JSON.stringify(bookedFilms))
  renderFilms(filmName, elList)
});





elBookList.addEventListener("click", evt => {
  if(evt.target.matches(".bookmark__btn")){
    let btnIdSecond = evt.target.dataset.dataId;
    let findArr = bookedFilms.findIndex(films => films.id == btnIdSecond);
    bookedFilms.splice(findArr, 1);
    window.localStorage.setItem("list", JSON.stringify(bookedFilms))
    newLists(bookedFilms,elBookList);
  }

})


form.addEventListener("submit", evt =>{
  evt.preventDefault();

  const selectVal = select.value;

  let filterFilms = selectVal == "all" ? films : films.filter(element => element.genres.includes(selectVal))  ;

  if(selectVal === "all"){
    filterFilms = films;
  }else{
    filterFilms = films.filter(element => element.genres.includes(selectVal));
  }


  window.localStorage.setItem("list", JSON.stringify(bookedFilms))
  renderFilms(filterFilms, elList);
})




renderFilms(films, elList);

renderGenes(films , select);

elDarkBtn.addEventListener("click" , () => {
  elBody.classList.toggle("dark");
});