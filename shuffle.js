document.addEventListener('DOMContentLoaded', () => {
    let playerCardMapping = {};
    let currentPlayerIndex = -1; // Start med -1 så første spiller starter korrekt

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function createCardButton(card) {
        const cardButton = document.createElement('button');
        cardButton.textContent = "Klik for at vælge"; // Standardtekst
        cardButton.classList.add('card');
        cardButton.setAttribute('data-card', card);
        return cardButton;
    }

    function updateHeaderForNextPlayer(playerNames) {
        currentPlayerIndex = (currentPlayerIndex + 1) % playerNames.length;
        const header = document.querySelector('header');
        header.innerHTML = `<h1>${playerNames[currentPlayerIndex]}, vælg et kort</h1>`;
    }

    function cardSelected(card, playerNames) {
        const playerName = playerNames[currentPlayerIndex];
        playerCardMapping[playerName] = playerCardMapping[playerName] || [];
        playerCardMapping[playerName].push(card);
    
        // Vis en pop-up-skærm med valgt kortinformation
        alert(`${playerName} har valgt: ${card}`);
    
        updateHeaderForNextPlayer(playerNames);
    
        if (Object.keys(playerCardMapping).length === playerNames.length) {
            sessionStorage.setItem('playerCardMapping', JSON.stringify(playerCardMapping));
            window.location.href = 'afstemning.html';
        }
    }
    

    function startCardSelection(numPlayers, playerNames, numUndercovers) {
        const cardSelection = document.querySelector('.card-selection');
        const words = ["Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grape", "Honeydew", "Kiwi", "Lemon"];
        const commonWord = words[Math.floor(Math.random() * words.length)];

        let cards = new Array(numUndercovers).fill("Mr. White").concat(new Array(numPlayers - numUndercovers).fill(commonWord));
        
        shuffleArray(cards);

        updateHeaderForNextPlayer(playerNames);

        cards.forEach((card) => {
            const cardButton = createCardButton(card);
            cardSelection.appendChild(cardButton);
            cardButton.addEventListener('click', function() {
                cardSelected(this.getAttribute('data-card'), playerNames);
                this.remove();
            });
        });
    }

    function initGameFromURLParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const numPlayers = parseInt(urlParams.get('numPlayers'), 10);
        const numUndercovers = parseInt(urlParams.get('numUndercovers'), 10);
        const playerNames = JSON.parse(urlParams.get('playerNames') || '[]');

        if (!isNaN(numPlayers) && Array.isArray(playerNames) && playerNames.length === numPlayers && !isNaN(numUndercovers)) {
            startCardSelection(numPlayers, playerNames, numUndercovers);
        } else {
            console.error('Fejl: Ugyldige spillerdetaljer i URL-parametrene.');
        }
    }

    initGameFromURLParams();
});
