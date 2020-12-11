const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
var somClique = document.getElementById('t_clique');
var somVitoria = document.getElementById('t_vitoria');
var somDerrota = document.getElementById('t_derrota');
var somAcerto = document.getElementById('t_acerto');
var somFalha = document.getElementById('t_falha');

function flipCard() {
    if(lockBoard) {
        return
    }
    if(this === firstCard) {
        return
    }
    this.classList.add('flip');  //* adiciona classe uma unica vez*//
    // this.classList.toggle('flip'); tira e adiciona classe mais de 1 vez
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        somClique.play();
        return;
    }
    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
}


cards.forEach((card) => {
    card.addEventListener('click', flipCard)
})

function checkForMatch() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        somAcerto.play();
        disableCards();
        return
    }
    somFalha.play();
    unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500)
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// (function shuffle () {
//     cards.forEach((card) => {
//         let randomPosition = Math.floor(Math.random() * 12);
//         card.style.order = randomPosition;
//     })
// })();

function vitoria() {
    somVitoria.play();
    alert('Muito Bem. Voce é fera mesmo hein?\nClique em ok para Jogar uma nova partida');
    window.location.reload();

}
function derrota() {
    somDerrota.play();
    alert('Que Peninha! Não foi dessa vez!\nQuem sabe voce se da bem na próxima partida');
    window.location.reload();
}




function newGame() {
    alert('Bem Vindo ao Jogo da Memória! \nQuero ver se voce é bom de memória mesmo! \nClique em OK para começar!');
    (function shuffle () {
        cards.forEach((card) => {
            let randomPosition = Math.floor(Math.random() * 12);
            card.style.order = randomPosition;
        })
    })();
}
newGame();