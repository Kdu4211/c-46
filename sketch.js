
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
let nave, naveImg;
let asteroide, asteroideImg, asteroideImg2;
let parede1, parede2, parede3, parede4;
let score = 0;
let gameover = false;


var asteroides = [];

function preload(){
	naveImg = loadImage("img/nave.png");
	asteroideImg = loadImage("img/asteroide.png");
	asteroideImg2 = loadImage("img/asteroide.png");
}

function setup() {
	createCanvas(800, 700);


	engine = Engine.create();
	world = engine.world;

	nave = createSprite(350,500,20,20);
	nave.addImage(naveImg);
	nave.scale = 0.2;
	nave.setCollider("circle", 0, 0, 50);

	parede1 = createSprite(400,1,900,20);
	parede2 = createSprite(400,700,900,20);
	parede3 = createSprite(1,350,20,900);
	parede4 = createSprite(800,350,20,900);
	parede1.visible = false;
	parede2.visible = false;
	parede3.visible = false;
	parede4.visible = false;

	
	asteroide = createSprite(1000,20,20,20);
	asteroide.addImage(asteroideImg);
	asteroide.scale = 0.3;

	score = 0;

	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(0);

  fill(255);
  textSize(20);
  text("Score: " + score, 20, 30);

  if (gameover) {
    fill(255, 0, 0);
    textSize(50);
    text("Game Over!", width / 2 - 150, height / 2);
  } else {
  
  nave.collide(parede1);
  nave.collide(parede2);
  nave.collide(parede3);
  nave.collide(parede4);

  moviment();

  destroyNave();

  drawMeteors() 
  createMeteor();
  moveMeteors();

  drawSprites();
}

function moviment(){
	if(keyDown(UP_ARROW)){
		nave.y -=10;
	}
	if(keyDown(DOWN_ARROW)){
		nave.y +=10;
	}
	if(keyDown(LEFT_ARROW)){
		nave.x -=10;
	}
	if(keyDown(RIGHT_ARROW)){
		nave.x +=10;
	}
}


// Função que cria asteroides em intervalos regulares
function createMeteor() {
	if (frameCount % 60 === 0) {
	  // Cria um asteroide como sprite
	  let asteroide = createSprite(
		Math.random() * (width - 30),
		-30,
		30,
		30
	  );
	  // Adiciona a imagem do asteroide
	  asteroide.addImage(loadImage("img/asteroide.png"));
	  asteroide.scale = 0.3;
	  // Atribui uma velocidade aleatória ao asteroide
	  asteroide.speed = Math.random() * 3 + 1;
	  // Adiciona o asteroide ao array
	  asteroides.push(asteroide);
	}
  }
  
  // Função que move os asteroides e remove aqueles que saem da tela
  function moveMeteors() {
	for (let i = asteroides.length - 1; i >= 0; i--) {
	  let asteroide = asteroides[i];
	  asteroide.position.y += asteroide.speed;
  
	  // Remove o asteroide se ele sair da tela
	  if (asteroide.position.y > height) {
		asteroides.splice(i, 1);
		score++;
	  }

	  if (asteroide.collide(parede2)) {
		asteroide.remove();
		score++;
	  }

	}
  }
  
  // Função que desenha os asteroides na tela
  function drawMeteors() {
	for (const asteroide of asteroides) {
	  drawSprite(asteroide);
	}
  }

  function destroyNave() {
	for (let i = asteroides.length - 1; i >= 0; i--) {
	  let asteroide = asteroides[i];
  
	  // Se a nave colidir com um asteroide, game over
	  if (nave.collide(asteroide)) {
		// Aqui você pode adicionar lógica para entrar no modo "game over"
		console.log("Game Over!");
		// Por exemplo, você pode reiniciar o jogo
		resetGame();
	  }
	}
  }
  
  // Função que reinicia o jogo (pode ser personalizada conforme necessário)
  function resetGame() {
	// Aqui você pode adicionar lógica para reiniciar o jogo, como resetar posições, pontuações, etc.
	// Por exemplo, resetar a posição da nave
	nave.position.x = 350;
	nave.position.y = 500;
	score = 0;
	gameover = true;
	for (let i = asteroides.length - 1; i >= 0; i--) {
		asteroides[i].remove();
		asteroides.splice(i, 1);
	}
  }
}
