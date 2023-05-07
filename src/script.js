const dino = document.querySelector('.dino');

const background = document.querySelector('.background');

let position = 0;
let isJumping = false;
let isGameOver = false;
let points = 0;
let speed = 6000;
let level = 1;


function handleKeyUp(event){
    if (event.keyCode === 32){
      if (!isJumping){
        jump();  
      }  
      
    }
}

function jump(){
  isJumping = true; 

  let upInterval = setInterval( () => {
     if (position >= 150){
        clearInterval(upInterval);
        
        let downInterval = setInterval(() => {
           if (position <= 0) {
              clearInterval(downInterval);
              isJumping = false;
           } else {
             position -= 20;
             dino.style.bottom = position + 'px';
           } 
        }, 20);

     } else {
        position += 20;
        dino.style.bottom = position + 'px';
     } 
  }, 20); 

};

function createCactus(){
   const cactus = document.createElement('div');
   const placar = document.getElementById('placar');
   const nivel = document.getElementById('nivel');
   let cactusPosition = 1000;
   let randomtime = Math.random() * speed;

   if (isGameOver) return;


   points += 10;

   if(points % 100 == 0) {
       speed -= 1000;
       level += 1;
   }

   placar.innerHTML = '<strong> Pontos: ' + points + '</strong>';
   nivel.innerHTML = '<strong> Nível: ' + level + '</strong>';
     

   cactus.classList.add('cactus');
   background.appendChild(cactus);
   cactus.style.left = cactusPosition + 'px';

   let leftTimer = setInterval(() => {
      if (cactusPosition < -60){
         clearInterval(leftTimer);
         background.removeChild(cactus);
      } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60){
        clearInterval(leftTimer);
        document.body.innerHTML = '<h1 class="game-over"> Fim de jogo: ' + points + ' pontos </h1>';
        isGameOver = true; 
      } else { 
         cactusPosition -= 10;
         cactus.style.left = cactusPosition + 'px';
      } 


   }, 20);

   
   setTimeout(createCactus, randomtime);
}


createCactus();
document.addEventListener('keyup', handleKeyUp);
