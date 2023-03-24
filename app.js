//CALCULATOR
let resultToDisplay = 0;
let resultDisplayed = document.querySelector('.screen__result');
resultDisplayed.textContent = resultToDisplay;

//THEME TOGGLE
let app = document.querySelector('.app');
let dot = document.querySelector('.toggle__dot');
let choiceZones = document.querySelectorAll('.toggle__choice');
let theme = 1;

for(let i=0; i<choiceZones.length; i++){
  choiceZones[i].addEventListener('click', () =>{
    theme = i+1;
    app.setAttribute("data-theme", i+1);
    dot.style.left = (26*i + 3)+'px';
  })
}
