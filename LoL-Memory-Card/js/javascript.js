// Sound
class AudioController {
	constructor() {
		this.bgMusic = new Audio('Audio/bgMusic.mp3');
		this.flipSound = new Audio('Audio/flip.wav');
		this.matchSound = new Audio('Audio/match.wav');
		this.victorySound = new Audio('Audio/victory.mp3');
		this.loseSound = new Audio('Audio/defeat.mp3');
		this.bgMusic.volume = 0.5;
		this.bgMusic.loop = true;
	}
	startMusic() {
		this.bgMusic.play();
	}
	stopMusic() {
		this.bgMusic.pause();
		this.bgMusic.currentTime = 0;
	}
	flip() {
		this.flipSound.play();
	}
	match() {
		this.matchSound.play();
	}
	victory() {
		this.stopMusic();
		this.victorySound.play();
	}
	gameOver() {
		this.stopMusic();
		this.loseSound.play();
	}
}

function ready() {
	let overlays = Array.from(document.getElementsByClassName('overlay-text')); 
	const cards = document.querySelectorAll('.memory-card');

	let hasFlippedCard = false;
	let firstCard, secondCard;

	let lockCard = false;

	let ticker = document.getElementById('turns');
	let timer = document.getElementById('time-remaining');
	
	let click = 0;
	ticker.innerText = click;

	let timeRemaining = 100;
	timer.innerText = timeRemaining;
	
	let matchedCards = [];

	// Sound
	let audioController = new AudioController();
	
	overlays.forEach(overlay => {
		overlay.addEventListener('click', () => {
			overlay.classList.remove('visible');
			// Background Music
			startGame();

			
			let countDown = startCountDown();
			
			function startCountDown () {
				return setInterval(() => {
					timeRemaining--;
					timer.innerText = timeRemaining;

					if (timeRemaining == 0) {
						gameOver();
					}
					
				},1000)
			}
			
			function startGame () {
				audioController.startMusic();
				click = 0;
				ticker.innerText = click;

				timeRemaining = 100;
				timer.innerText = timeRemaining;
				hideCards();

			}	

			function gameOver () {
				clearInterval(countDown);
				audioController.gameOver();
				document.getElementById('game-over-text').classList.add('visible');
			}

			function victory () {
				clearInterval(countDown);
				audioController.victory();
				document.getElementById('victory-text').classList.add('visible');

			}

			function hideCards () {
				cards.forEach(card => {
					card.classList.remove('flip');
				})
			}

			function flipCard() {
				// Sound
				audioController.flip();
				
				if (lockCard) {

					return;
				}
				// Double click
				if (this === firstCard) return;

				this.classList.add("flip");
				
				if (!hasFlippedCard) {
					// First Click
					hasFlippedCard = true;
					firstCard = this;

					click++;
					ticker.innerText = click;
					//console.log(click);

					//console.log(hasFlippedCard, firstCard);
					
					return;
				} 
				// Second Click
				secondCard = this;
				// console.log(hasFlippedCard, secondCard)

				//Matching?!
				checkMatch();
			}

			function checkMatch() {
				let isMatch = firstCard.dataset.name === secondCard.dataset.name
				// Do card match?
				isMatch ? disableCards() : unFlipCards();
			}

			function disableCards () {
				setTimeout(function () {
					audioController.match(); 
				}, 500)
				
				cardMatch(firstCard,secondCard);
				
				firstCard.removeEventListener("click", flipCard);
				secondCard.removeEventListener("click", flipCard);

				resetCard();
			}

			function cardMatch (firstCard,secondCard) {
				matchedCards.push(firstCard);
				matchedCards.push(secondCard);
				console.log(matchedCards.length);
				if (matchedCards.length % cards.length == 0) {
					victory();
				}
			}

			function unFlipCards () {
				lockCard = true;

				setTimeout(function() {
					firstCard.classList.remove('flip');
					secondCard.classList.remove('flip');

					resetCard();
				},1500)	
			}

			function resetCard() {

				[hasFlippedCard, lockCard] = [false, false];
				[firstCard, secondCard] = [null, null]; 
			}

			cards.forEach(card => card.addEventListener("click", flipCard));

			(function shuffle () {
				cards.forEach(card => {
					let randomCards = Math.floor(Math.random() * 16);
					card.style.order = randomCards;
				})
			}) ();
		})
	})	
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoader", ready());
} else {
	ready();
}



