document.addEventListener('DOMContentLoaded', () => {
    const wordPlaceholder = document.getElementById('word-placeholder');
    const guessInput = document.getElementById('guess-input');
    const submitGuessBtn = document.getElementById('submit-guess');
    const resultMessage = document.getElementById('result');
    const otherPlayersCardsContainer = document.getElementById('other-players-cards');

    // Gør teksten usynlig ved at tilføje en klasse
    otherPlayersCardsContainer.classList.add('invisible'); 

    // Hent gemte data fra sessionStorage
    const playerCardMappingStr = sessionStorage.getItem('playerCardMapping');

    // Tjek for fejl
    if (!playerCardMappingStr) {
        console.error('Fejl: Ingen spillerkort-data fundet.');
        return;
    }

    // Parse playerCardMappingStr til et objekt
    const playerCardMapping = JSON.parse(playerCardMappingStr);

    // Hent kortene for de andre spillere
    const currentPlayerName = "Dit spiller navn"; // Udskift "Dit spiller navn" med dit eget spillernavn
    const otherPlayersCards = Object.keys(playerCardMapping)
                                .filter(playerName => playerName !== currentPlayerName) // Fjern den nuværende spillers kort
                                .flatMap(playerName => playerCardMapping[playerName]); // Saml alle kortene fra de andre spillere i én liste

    // Vis kortene for de andre spillere
    otherPlayersCards.forEach(card => {
        const cardItem = document.createElement('p');
        cardItem.textContent = card;
        otherPlayersCardsContainer.appendChild(cardItem);
    });

    // Event listener for submitting guess
    submitGuessBtn.addEventListener('click', () => {
        const guess = guessInput.value.trim().toLowerCase(); // Konverter gættet til små bogstaver for at gøre sammenligningen tilfældighed
        if (guess === '') {
            alert('Please enter your guess.');
            return;
        }

        // Vis en besked om, hvorvidt gættet er korrekt eller forkert
        if (otherPlayersCards.some(card => card.toLowerCase() === guess)) {
            resultMessage.textContent = 'Congratulations! Your guess was correct.';
        } else {
            resultMessage.textContent = 'Sorry, your guess was incorrect.';
        }

        // Omdiriger til straffe.html
        setTimeout(() => {
            window.location.href = 'straffe.html';
        }, 5000); // 5000 ms = 5 sekunder
    });
});

