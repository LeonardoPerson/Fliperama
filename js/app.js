//Controle da inicialização do jogo
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
		this.x = -90 //posição horizontal do inimigo iniciando no canto esquerdo da tela
		this.y = y; //posição vertical e fixa do inimigo
		this.velocidade = velocidade; //velocidade do inimigo
    	this.sprite = 'images/enemy-bug.png';
	}
	//Atualiza a posição do inimigo
	update(dt){
			for(let i = this.x + this.velocidade * dt; i <= 500; i++){
			this.render(i);	//fazendo o inimigo se movimentar por meio do looping
			this.colisao(i); //tratamento da colisão
			if(i >= 490 && i <= 500){
				i = -90 + this.velocidade * dt;
				this.render(i);	//inimigo voltando à posição inicial para que a iteração acima possa reiniciar
			}
			break;
		}
	}
	//Método que gerencia a colisão, trabalha em conjunto com o método update(dt)
	colisao(x){
		if(((x > -5 && x < 0) && (player.x === 3) && (player.y === this.y)) ||
		  ((x > 59 && x < 63) && (player.x === 103) && (player.y === this.y)) ||
		  ((x > 159 && x < 163) && (player.x === 203) && (player.y === this.y)) ||
		  ((x > 259 && x < 263) && (player.x === 303) && (player.y === this.y)) ||
		  ((x > 359 && x < 363) && (player.x === 403) && (player.y === this.y))){
			player.y = player.update();
		}
	}
	//Desenhando o inimigo na tela após confirmação obtida da variável início
	render(movimento){
		if(this.inicio === true){
			if(movimento === undefined){
				ctx.drawImage(Resources.get(this.sprite), this.x = this.x, this.y);
			}else{
				ctx.drawImage(Resources.get(this.sprite), this.x = movimento, this.y);
			}
		}
	}
}
//-----------------------------------------------------------------------------------------------------------
class Player extends Gerenciador{
	constructor(inicio){
		super(inicio);
		this.x = 203;
		this.y = 400;
		this.sprite = 'images/char-boy.png';
		this.pontos = 0;
		document.getElementById("conteudo").value = this.pontos;
	}
	//Atualiza com a posição inicial do jogador
	update(){
		return 400;
	}
	//Desenhando o inimigo na tela após confirmação obtida da variável início
	render(x, y) {
		if(this.inicio === true){
    	  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    	}
	}
	//Configuração da direção a ser percorrida pelo jogador
	handleInput(seta){
		if((seta === 'left')&&(this.x >= 4)){
			this.render(this.x = this.x - 100, this.y);
		}
		if((seta === 'up')&&(this.y >= 50)){
			this.render(this.x, this.y = this.y - 83);
			if(this.y <= -15){
				this.pontos += 1;
				alert("Total de pontos: " + this.pontos);
				this.render(this.x, this.y = this.update());
			}
		}
		if((seta === 'right')&&(this.x <= 303)){
			this.render(this.x = this.x + 100, this.y);
		}
		if((seta === 'down')&&(this.y <= 350)){
			this.render(this.x, this.y = this.y + 83);
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



