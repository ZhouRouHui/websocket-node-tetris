let nextData = [
    [2, 2, 0, 0],
    [0, 2, 2, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
];

let gameData = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 2, 0, 0, 0, 0],
];

let nextDivs = [];
let gameDivs = [];

let initGame = function () {
  for (let i = 0; i < gameData.length; i++) {
    let gameDiv = [];
    for (let j = 0; j < gameData[i].length; j++) {
      let node = document.createElement('div');
      node.className = 'none';
      node.style.top = (i * 20) + 'px';
      node.style.left = (j * 20) + 'px';
      document.getElementById('game').appendChild(node);
      gameDiv.push(node)
    }
    gameDivs.push(gameDiv);
  }
};

let initNext = function () {
  for (let i = 0; i < nextData.length; i++) {
    let nextDiv = [];
    for (let j = 0; j < nextData[i].length; j++) {
      let node = document.createElement('div');
      node.className = 'none';
      node.style.top = (i * 20) + 'px';
      node.style.left = (j * 20) + 'px';
      document.getElementById('next').appendChild(node);
      nextDiv.push(node)
    }
    nextDivs.push(nextDiv);
  }
};

let refreshGame = function () {
  for (let i = 0; i < gameData.length; i++) {
    for (let j = 0; j < gameData[i].length; j++) {
      if (gameData[i][j] === 0) {
        gameDivs[i][j].className = 'none';
      } else if (gameData[i][j] === 1) {
        gameDivs[i][j].className = 'done';
      } else if (gameData[i][j] === 2) {
        gameDivs[i][j].className = 'current';
      }
    }
  }
};

let refreshNext = function () {
  for (let i = 0; i < nextData.length; i++) {
    for (let j = 0; j < nextData[i].length; j++) {
      if (nextData[i][j] === 0) {
        nextDivs[i][j].className = 'none';
      } else if (nextData[i][j] === 1) {
        nextDivs[i][j].className = 'done';
      } else if (nextData[i][j] === 2) {
        nextDivs[i][j].className = 'current';
      }
    }
  }
};

// 执行初始化和刷新函数
initGame();
initNext();
refreshGame();
refreshNext();