function sayHello(){
  var response = prompt('What is your name?');
  alert('Hello ' + response + ',welcome to the game!');
  alert('游戏玩法：色彩敏感度测试，找到不一样的它吧！\n\n规则：\n. 点击不一样的方块\n. 每轮辨别难度会不断增加。\n. 你能坚持到第几关呢？');
};
document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('container');
    const roundDisplay = document.getElementById('round');
    const scoreDisplay = document.getElementById('score');
    const message = document.getElementById('message');
    let round = 1;
    let score = 0;
    let differentBoxIndex;
    const rounds = [9, 16, 25, 36,49,64,81];

    function getRandomColor(){
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return `rgb(${r}, ${g}, ${b})`;
    }

    function getSimilarColor(baseColor,difference){
      const [r,g,b] = baseColor.match(/\d+/g).map(Number);
      const newR = Math.min(255,Math.max(0,r + difference));
      const newG = Math.min(255,Math.max(0,g + difference));
      const newB = Math.min(255,Math.max(0,b + difference));
      return `rgb(${newR},${newG},${newB})`
    }

    function initGame(){
      const boxCount = rounds[round - 1];
      const gridSize = Math.sqrt(boxCount);
      container.innerHTML = '';
      container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
      container.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
      const baseColor = getRandomColor();
      container.style.backgroundColor = baseColor;
      const colorDifference = 60 - (round - 1) * 8;
      const differentColor = getSimilarColor(baseColor, colorDifference);
      for (let i = 0; i < boxCount; i++){
          const box = document.createElement('div');
          box.classList.add('box');
          box.style.backgroundColor = baseColor;
          container.appendChild(box);
      }
      setDifferentBox(differentColor);
      roundDisplay.textContent = round;
      scoreDisplay.textContent = score;
      restart.style.display = 'none';
    }

    function setDifferentBox(differentColor) {
        const boxes = document.querySelectorAll('.box');
        differentBoxIndex = Math.floor(Math.random() * boxes.length);
        boxes[differentBoxIndex].style.backgroundColor = differentColor;
        boxes.forEach((box, index) => {
            box.addEventListener('click', function () {
                handleBoxClick(index);
            });
        });
    }

    function handleBoxClick(index) {
      const boxes = document.querySelectorAll('.box');
      if (index === differentBoxIndex) {
            message.textContent = '正确！';
            message.style.color = 'green';
            boxes[index].style.backgroundColor = 'green';
            score += 10;
            setTimeout(nextRound, 1000);
        }
      else {
            message.textContent = '错误！';
            message.style.color = 'red';
            boxes[index].style.backgroundColor = 'red';
        }
    }

    function nextRound() {
      if (round < rounds.length) {
            round++;
            initGame();
        }
      else {
            message.textContent = `游戏结束！你的最终得分是 ${score} 分。`;
            restart.style.display = 'block';
        }
    }
    const restart = document.getElementById('restart');
    restart.addEventListener('click', function () {
        round = 1;
        score = 0;
        initGame();
    });
    initGame();
  });
