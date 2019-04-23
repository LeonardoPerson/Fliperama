//Controle da inicialização do jogo
'use strict'
class Gerenciador{
	constructor(inicio){
		this.inicio = inicio;
	}
	//Confirmação do usuário sobre iniciar o jogo
	confirmaJogo(){
		return this.inicio = confirm("Deseja iniciar o jogo?");
	}
}
//-----------------------------------------------------------------------------------------------------------
class Enemy extends Gerenciador{
	constructor(y, velocidade, inicio){
		super(inicio);
		this.width = 101;//largura horizontal entre o meio de um bloco e outro
		this.interval = this.width / 2;	//metade da largura horizontal de um bloco
		this.initial_x = -101;//posição horizontal do inimigo iniciando no canto esquerdo da tela
		this.x = this.initial_x;//variável que terá a modificação constante de valor, permitindo o movimento
		this.width_max = 550;//posição final do inimigo
		this.fixed_y = y;//posição vertical e fixa do inimigo
		this.velocidade = velocidade;//velocidade do inimigo, somado com a variável x, compõem o movimento
		this.sprite = 'images/enemy-bug.png';
	}
	//Atualiza a posição do inimigo
	update(dt){
		for(let i = this.x + this.velocidade * dt; i <= this.width_max; i++){
			this.render(i);	//fazendo o inimigo se movimentar por meio do looping
			this.colisao(i); //tratamento da colisão
			if(i >= this.width_max - this.interval && i <= this.width_max){
				i = this.initial_x + this.velocidade * dt;
				this.render(i);	//inimigo voltando à posição inicial para que a iteração for possa reiniciar
			}
			break;
		}
	}
	//Método que gerencia a colisão, trabalha em conjunto com o método update(dt)
	colisao(x){
		if(((x > -this.interval && x < this.interval) && (player.x === 0) && (player.y === this.fixed_y)) ||
		  ((x > this.interval && x < this.interval*3) && (player.x === player.width) && (player.y === this.fixed_y)) ||
		  ((x > this.interval*3 && x < this.interval*5) && (player.x === player.width*2) && (player.y === this.fixed_y)) ||
		  ((x > this.interval*5 && x < this.interval*7) && (player.x === player.width*3) && (player.y === this.fixed_y)) ||
		  ((x > this.interval*7 && x < this.interval*9) && (player.x === player.width*4) && (player.y === this.fixed_y))){
			player.y = player.update();
		}
	}
	//Desenhando o inimigo na tela após confirmação obtida da variável início
	render(movimento){
		if(this.inicio === true){
			if(movimento === undefined){
				ctx.drawImage(Resources.get(this.sprite), this.x = this.x, this.fixed_y);
			}else{
				ctx.drawImage(Resources.get(this.sprite), this.x = movimento, this.fixed_y);
			}
		}
	}
}
//-----------------------------------------------------------------------------------------------------------
class Player extends Gerenciador{
	constructor(inicio){
		super(inicio);
		this.initial_x = 202;
		this.initial_y = 400;
		this.x = this.initial_x;
		this.y = this.initial_y;
		this.width = 101;
		this.heigth = 83
		this.width_min = 0;
		this.width_max = 404;
		this.heigth_min = 50;
		this.heigth_max = 400;
		this.sprite = 'images/char-boy.png';
		this.pontos = 0;
		document.getElementById("conteudo").value = this.pontos;
	}
	//Atualiza com a posição inicial do jogador
	update(){
		return this.initial_y;
	}
	//Desenhando o inimigo na tela após confirmação obtida da variável início
	render(x, y) {
		if(this.inicio === true){
    	  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    	}
	}
	//Configuração da direção a ser percorrida pelo jogador
	handleInput(seta){
		if((seta === 'left')&&(this.x > this.width_min)){
			this.render(this.x = this.x - this.width, this.y); //Indo para a esquerda
		}
		//---------------------------------------------------------------------
		if((seta === 'up')&&(this.y >= this.heigth_min)){
			this.render(this.x, this.y = this.y - this.heigth); //Indo pra cima
			if(this.y <= this.heigth_min){
				this.pontos += 1;
				alert("Total de pontos: " + this.pontos); // Em uma determinada posição pra cima, a pontuação tem incremento
				this.render(this.x, this.y = this.update()); //O jogador é realocado na posição de partida
			}
		}
		//----------------------------------------------------------------------
		if((seta === 'right')&&(this.x < this.width_max)){
			this.render(this.x = this.x + this.width, this.initial_y); //Indo pra direita
		}
		//----------------------------------------------------------------------
		if((seta === 'down')&&(this.y < this.heigth_max)){
			this.render(this.x, this.y = this.y + this.heigth); //Indo pra baixo
		}
		document.getElementById("conteudo").value = this.pontos;
	}
}
//-----------------------------------------------------------------------------------------------------------
//Intanciando os objetos
const gerenciador = new Gerenciador();
const confirmacao = gerenciador.confirmaJogo(); //Confirmando se o usuário deseja iniciar o jogo
const player = new Player(confirmacao);
const enemy1 = new Enemy(68, 50, confirmacao);
const enemy2 = new Enemy(68, 150, confirmacao);
const enemy3 = new Enemy(68, 250, confirmacao);
const enemy4 = new Enemy(151, 300, confirmacao);
const enemy5 = new Enemy(151, 150, confirmacao);
const enemy6 = new Enemy(151, 125, confirmacao);
const enemy7 = new Enemy(234, 225, confirmacao);
const enemy8 = new Enemy(234, 125, confirmacao);
const enemy9 = new Enemy(234, 175, confirmacao);
const allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8, enemy9];
// Isso capta as teclas pressionadas e envia as chaves para o seu método Player.handleInput()
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});



