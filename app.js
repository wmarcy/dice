/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//
	var scroes, roundScore, activePlayer, gamePlaying;
	//Initialize game
	init();

	
	// defines a listener and creates an Anonymous function for the roll button
	document.querySelector('.btn-roll').addEventListener('click',function(){
		if(gamePlaying){
			// 1. Random number
			var	dice  = Math.floor(Math.random()*6) + 1
			
			// 2. Display the result
			var diceDOM = document.querySelector('.dice');
			diceDOM.style.display = 'block';
			diceDOM.src = 'dice-' + dice + '.png';
			
			// 3. Update the round score IF the rolled number was NOT a 1
			if(dice !== 1){
				// Add score
				roundScore += dice;
				document.querySelector('#current-' + activePlayer).textContent = roundScore;
			} else {
				// Next Player
				nextPlayer();
			}//End if dice === 1	
		}//End if gamePlaying	
	}); //End event listener for roll the dice
	
	// defines a listner and creates an Anonymous function for the hold button
	document.querySelector('.btn-hold').addEventListener('click', function(){
		if(gamePlaying){
			//Add current score to players global score
			scores[activePlayer] += roundScore;
			
			// Update the UI
			document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

			// Check if player won the game
			if (scores[activePlayer] >= 20) {
				document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
				document.querySelector('.dice').style.display = 'none';
				document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
				document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
				gamePlaying = false;

			}else{		
				// Next Player
				nextPlayer();		
			}
		}//End if Game Playing
	});

	// define a listener and create and call the init function notice no () only called on click
	document.querySelector('.btn-new').addEventListener('click', init);
	
	// function to advance the next player
	function nextPlayer(){
			activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
			roundScore = 0;
			
			//0 out the screen score
			document.getElementById('current-0').textContent = '0';
			document.getElementById('current-1').textContent = '0';
			
			//toggles the active class on and off for the player 
			document.querySelector('.player-0-panel').classList.toggle('active');
			document.querySelector('.player-1-panel').classList.toggle('active');
			
			// Hide the dice 
			document.querySelector('.dice').style.display = 'none';			
	}
	
	function init(){
		gamePlaying = true;
		scores = [0,0];
		roundScore = 0;
		activePlayer = 0;
		
		document.querySelector('.dice').style.display = 'none';
		
		// we can also do this with getElementById - its a bit faster
		document.getElementById('score-0').textContent = 0;
		document.getElementById('score-1').textContent = 0;
		document.getElementById('current-0').textContent = 0;
		document.getElementById('current-1').textContent = 0;	
		document.getElementById('name-0').textContent = 'Player 1';	
		document.getElementById('name-1').textContent = 'Player 2';	
		document.querySelector('.player-0-panel').classList.remove('winner');
		document.querySelector('.player-1-panel').classList.remove('winner');
		document.querySelector('.player-0-panel').classList.remove('active');
		document.querySelector('.player-1-panel').classList.remove('active');
		document.querySelector('.player-0-panel').classList.add('active');		
	}	
	
	
	
	
	
	
	
	
	
	
	
	