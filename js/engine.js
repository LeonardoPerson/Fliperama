/* Engine.js
 * Este arquivo fornece a funcionalidade de loop de jogos (entidades de atualização e renderização),
 * desenha o tabuleiro inicial do jogo na tela e, em seguida, chama os métodos update e
 * Render no seu player e objetos inimigos (definidos em seu app.js).
 *
 * Um mecanismo de jogo funciona desenhando a tela inteira do jogo várias vezes,
 * Como um flipbook que você pode ter criado quando criança. Quando seu jogador se move
 * a tela, pode parecer que apenas a imagem / personagem está se movendo ou sendo
 * desenhado, mas esse não é o caso. O que realmente está acontecendo é toda a "cena"
 * está sendo desenhado repetidamente, apresentando a ilusão de animação.
 *
 * Este mecanismo torna o objeto de contexto (ctx) disponível globalmente para fazer
 * Escrevendo app.js um pouco mais simples para trabalhar.
 */
var Engine = (function(global){
    /* Predefine as variáveis ​​que usaremos nesse escopo,
     * cria o elemento canvas, pega o contexto 2D para aquela tela
     * define a altura / largura do elemento da tela e adicione-o ao DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;
    canvas.width = 505;
    canvas.height = 570;
    doc.body.appendChild(canvas);
    /* Esta função serve como ponto de partida para o próprio loop do jogo
     * e manipula corretamente os métodos de atualização e renderização.
     */
    function main(){
        /* Adquira a nossa informação delta de tempo que é necessária se o seu jogo
         * requer animação suave. Porque todos os processos de computador
         * instruções em diferentes velocidades, precisamos de um valor constante que
         * seria o mesmo para todos (independentemente da rapidez com que
         * computador é) - hora do viva!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Chama nossas funções de atualização / renderização, passa o tempo delta para
         * nossa função de atualização, pois pode ser usada para animações suaves.
         */
        update(dt);
        render();
        /* Define nossa variável lastTime que é usada para determinar o tempo delta
         * para a próxima vez que esta função for chamada.
         */
        lastTime = now;
        /* Use a função requestAnimationFrame do navegador para chamar isso
         * funciona novamente assim que o navegador conseguir desenhar outro quadro.
         */
        win.requestAnimationFrame(main);
    }

    /* Esta função faz algumas configurações iniciais que só devem ocorrer uma vez,
     * particularmente definindo a variável lastTime que é necessária para o
     * loop de jogo.
     */
    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    /* Esta função é chamada por main (nosso loop de jogo) e ele mesmo chama todos
     * das funções que podem precisar atualizar os dados da entidade. Baseado em como
     * você implementa sua detecção de colisão (quando duas entidades ocupam o
     * mesmo espaço, por exemplo, quando seu personagem deve morrer), você pode encontrar
     * a necessidade de adicionar uma chamada de função adicional aqui. Por enquanto, saímos
     * Comentou - você pode ou não querer implementar este
     * funcionalidade desta maneira (você poderia apenas implementar a detecção de colisão
     * nas próprias entidades dentro do seu arquivo app.js).
     */
    function update(dt) {
        updateEntities(dt);
        // checkCollisions();
    }
    /* Isso é chamado pela função de atualização e percorre todos os
     * objetos dentro de sua matriz allEnemies conforme definido em app.js e chamadas
     * seus métodos update (). Em seguida, ele chamará a função de atualização para o seu
     * objeto do jogador. Esses métodos de atualização devem focar puramente na atualização
     * os dados / propriedades relacionados ao objeto. Faça o seu desenho na sua
     * renderiza métodos.
     */
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }
    /* Esta função inicialmente desenha o "nível do jogo", ele irá chamar
     * a função renderEntities. Lembre-se, esta função é chamada de
     * tick do jogo (ou loop do motor do jogo) porque é assim que os jogos funcionam -
     * eles são flipbooks criando a ilusão de animação, mas na realidade
     * Eles estão apenas desenhando a tela inteira repetidamente.
     */
    function render() {
        /* Este array contém o URL relativo para a imagem usada
         * para essa linha específica do nível do jogo.
         */
        var rowImages = [
                'images/water-block.png',   // Top row is water
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;
        // Before drawing, clear existing canvas
        ctx.clearRect(0,0,canvas.width,canvas.height);
        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 */
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }
        renderEntities();
    }
    /* Esta função é chamada pela função render e é chamada em cada jogo
     * Carraça. Sua finalidade é, então, chamar as funções de renderização que você definiu
     * em seu inimigo e entidades de jogador dentro de app.js
     */
    function renderEntities() {
        /* Faz um loop por todos os objetos dentro da matriz allEnemies e chama
         * a função de renderização que você definiu.
         */
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });
        player.render();
    }

    /* Esta função não faz nada, mas poderia ter sido um bom lugar para
     * lidar com os estados de redefinição do jogo - talvez um novo menu de jogo ou um game over screen
     * esse tipo de coisa. É chamado apenas uma vez pelo método init ().
     */
    function reset(){
    }
    /* Vá em frente e carregue todas as imagens que sabemos que precisaremos
     * desenhe nosso nível de jogo. Em seguida, defina init como o método de retorno de chamada, para que quando
     * Todas estas imagens estão devidamente carregadas. O nosso jogo será iniciado.
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png'
    ]);
    Resources.onReady(init);
    /* Atribui o objeto de contexto da tela à variável global (a janela
     * objeto quando executado em um navegador para que os desenvolvedores possam usá-lo mais facilmente
     * de dentro de seus arquivos app.js.
     */
    global.ctx = ctx;
})(this);
