let rules = document.getElementById("rules"); //rules button
let nextId = document.getElementById("next"); //next button
let closeLosingNotice = document.getElementById("closeLosingNotice"); //closeLosingNotice button
let losingNotice = document.getElementById("losingNotice"); //losingNotice
let closeRules = document.getElementById("closeRules"); //close rules button
let rulesNotice = document.getElementById("rulesNotice"); //rules notice
let rockSelected = document.getElementById("rock");
let scissorSelected = document.getElementById("scissor");
let paperSelected = document.getElementById("paper");
let main = document.querySelector("main");
let userScore = document.getElementById("user-score");
let computerScore = document.getElementById("computer-score");

//game score data
let gameScoreData = {
  pc: 0,
  user: 0,
};
let tieUpBorderColor; //variable to change bordecolor on tieup condition
// code to score on page reload start
let getScore = JSON.parse(localStorage.getItem("score"));
console.log(getScore);
if (getScore) {
  computerScore.innerHTML = getScore.pc;
  userScore.innerHTML = getScore.user;
}
// code to score on page reload end
// function to topen rules notice
const openRulesNoice = () => {
  rulesNotice.style.visibility = "visible";
};
// fucnction to close rules notice
const closeRulesFunc = () => {
  rulesNotice.style.visibility = "hidden";
};
// function to close losing notice
const closeLosingNoticeFunc = () => {
  losingNotice.style.visibility = "hidden";
};
const playAgain = () => {
  rules.style.right = "3rem";
  nextId.style.visibility = "hidden";
  main.innerHTML = "";
  return (main.innerHTML = `
      <div class="play">
          <button onclick='playGameStart(id)' id="rock" class="rock btn-choice" data-choice="rock">
            <div><img src="/images/rock.png" alt="" /></div>
            <img src="./images/Line1.png" alt="" class="line1" />
          </button>
          <button onclick='playGameStart(id)' id="scissor" class="scissor btn-choice" data-choice="scissor">
            <div><img src="/images/scissor.png" alt="" /></div>
            <img src="./images/Line2.png" alt="" class="line2" />
          </button>
          <button onclick='playGameStart(id)' id="paper" class="paper btn-choice" data-choice="paper">
            <div><img src="/images/paper.png" alt="" /></div>
            <img src="./images/Line3.png" alt="" class="line3" />
          </button>
        </div>
      `);
};
// function executed when the user click on any of the rock paper scissor
const playGameStart = (id) => {
  let pcChoice = Math.floor(Math.random() * 3 + 1); //generating choice for the pc
  let pcChoiceName; //this varibale is going to store the choice name of pc
  let myChoice = id;
  //   here we assign the pc choice to the varaibale pcChoiceName
  if (pcChoice === 1) {
    pcChoiceName = "rock";
  } else if (pcChoice === 2) {
    pcChoiceName = "scissor";
  } else if (pcChoice === 3) {
    pcChoiceName = "paper";
  }
  // function to change border color
  let changeBorderColor = () => {
    if (tieUpBorderColor === false) {
      if (myChoice === "rock") {
        document.getElementsByClassName("innerWin")[0].style.backgroundColor =
          "#0074b6";
      } else if (myChoice === "paper") {
        document.getElementsByClassName("innerWin")[0].style.backgroundColor =
          "#ffa943";
      } else if (myChoice === "scissor") {
        document.getElementsByClassName("innerWin")[0].style.backgroundColor =
          "#bd00ff";
      }
      if (pcChoiceName === "rock") {
        document.getElementsByClassName("innerLose")[0].style.backgroundColor =
          "#0074b6";
      } else if (pcChoiceName === "paper") {
        document.getElementsByClassName("innerLose")[0].style.backgroundColor =
          "#ffa943";
      } else if (pcChoiceName === "scissor") {
        document.getElementsByClassName("innerLose")[0].style.backgroundColor =
          "#bd00ff";
      }
    }
    if (tieUpBorderColor === true) {
      if (pcChoiceName === "rock") {
        userPickTieUp.style.backgroundColor = "#0074b6";
        pcPickTieUp.style.backgroundColor = "#0074b6";
      } else if (pcChoiceName === "paper") {
        userPickTieUp.style.backgroundColor = "#ffa943";
        pcPickTieUp.style.backgroundColor = "#ffa943";
      } else if (pcChoiceName === "scissor") {
        userPickTieUp.style.backgroundColor = "#bd00ff";
        pcPickTieUp.style.backgroundColor = "#bd00ff";
      }
    }
    tieUpBorderColor = false;
  };
  //   rendering result based on the result of win, lose or tieup
  if (pcChoiceName === myChoice) {
    rules.style.right = "3rem";
    nextId.style.visibility = "hidden";
    // tie up condition
    try {
      main.innerHTML = "";
      return (main.innerHTML = `
    <div class="tieUp">
        <div id='userPickTieUp' class="userPickTieUp">
          <p class="tieUpText">YOU PICKED</p>
          <div>
            <img src="/images/${id}.png" alt="" />
          </div>
        </div>
        <div id='pcPickTieUp' class="pcPickTieUp">
          <p class="tieUpText">PC PICKED</p>
          <div>
            <img src="/images/${pcChoiceName}.png" alt="" />
          </div>
        </div>
        <div class="tieUpResText">
          <h3>TIE UP</h3>
          <button onclick='playAgain()'>REPLAY</button>
        </div>
      </div>
    `);
    } finally {
      tieUpBorderColor = true;
      changeBorderColor();
    }
  } else if (
    (myChoice === "rock" && pcChoiceName === "scissor") ||
    (myChoice === "paper" && pcChoiceName === "rock") ||
    (myChoice === "scissor" && pcChoiceName === "paper")
  ) {
    // winning condition
    rules.style.right = "12rem";
    nextId.style.visibility = "visible";
    let localBroswerDAta = JSON.parse(localStorage.getItem("score"));
    if (
      localBroswerDAta !== null &&
      localBroswerDAta.user !== 0 &&
      localBroswerDAta.user !== null
    ) {
      // getting data local browser and updating ther score
      let scoreData = JSON.parse(localStorage.getItem("score"));
      scoreData.user++;
      localStorage.setItem("score", JSON.stringify(scoreData));
      let updatedScore = JSON.parse(localStorage.getItem("score"));
      userScore.innerHTML = updatedScore.user;
    } else if (gameScoreData.user === 0) {
      gameScoreData.user++;
      localStorage.setItem("score", JSON.stringify(gameScoreData));
      let scoreData = JSON.parse(localStorage.getItem("score"));
      userScore.innerHTML = scoreData.user;
    }
    try {
      main.innerHTML = "";
      return (main.innerHTML = `
    <div class="gameResult winningGame">
        <div class="userPick">
          <div class="fistInner">
            <div class="secondInner">
              <div class="innerWin">
                <div class="resPlay">
                  <img src="./images/${id}.png" alt="" />
                </div>
              </div>
            </div>
          </div>
          <p class="userPickText">YOU PICKED</p>
        </div>
        <div class="computerPick">
          <div class="innerLose">
            <div class="resPlay"><img src="./images/${pcChoiceName}.png" alt="" /></div>
          </div>
          <p class="pcPickText">PC PICKED</p>
        </div>
        <div class="winResultText">
          <h3>YOU WIN</h3>
          <p>AGAINST PC</p>
          <button onclick='playAgain()'>PLAY AGAIN</button>
        </div>
      </div>
    `);
    } finally {
      changeBorderColor();
    }
  } else if (
    (myChoice === "scissor" && pcChoiceName === "rock") ||
    (myChoice === "rock" && pcChoiceName === "paper") ||
    (myChoice === "paper" && pcChoiceName === "scissor")
  ) {
    rules.style.right = "3rem";
    nextId.style.visibility = "hidden";
    // losing condition
    let localBroswerDAta = JSON.parse(localStorage.getItem("score"));
    if (
      localBroswerDAta !== null &&
      localBroswerDAta.pc !== 0 &&
      localBroswerDAta.pc !== null
    ) {
      // getting data local browser and updating ther score
      let scoreData = JSON.parse(localStorage.getItem("score"));
      scoreData.pc++;
      localStorage.setItem("score", JSON.stringify(scoreData));
      let updatedScore = JSON.parse(localStorage.getItem("score"));
      computerScore.innerHTML = updatedScore.pc;
    } else if (gameScoreData.pc === 0) {
      gameScoreData.pc++;
      localStorage.setItem("score", JSON.stringify(gameScoreData));
      let scoreData = JSON.parse(localStorage.getItem("score"));
      computerScore.innerHTML = scoreData.pc;
    }
    try {
      main.innerHTML = "";
      return (main.innerHTML = `
    <div class="gameResult losingGame">
        <div class="computerPick">
          <div class=" innerLose">
            <div class="resPlay"><img src="./images/${pcChoiceName}.png" alt="" /></div>
          </div>
          <p class="pcPickText">PC PICKED</p>
        </div>
        <div class="userPick">
          <div class="fistInner">
            <div class="secondInner">
              <div class="innerWin">
                <div class="resPlay">
                  <img src="./images/${id}.png" alt="" />
                </div>
              </div>
            </div>
          </div>
          <p class="userPickText">YOU PICKED</p>
        </div>
        <div class="winResultText">
          <h3>YOU LOST</h3>
          <p>AGAINST PC</p>
          <button onclick='playAgain()'>PLAY AGAIN</button>
        </div>
      </div>
    `);
    } finally {
      changeBorderColor();
    }
  }
};
rules.onclick = openRulesNoice;
closeRules.onclick = closeRulesFunc;
closeLosingNotice.onclick = closeLosingNoticeFunc;
rockSelected.onclick = () => playGameStart(rockSelected.id);
scissorSelected.onclick = () => playGameStart(scissorSelected.id);
paperSelected.onclick = () => playGameStart(paperSelected.id);
