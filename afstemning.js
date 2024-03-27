document.addEventListener('DOMContentLoaded', () => {
    // Hent gemte data fra sessionStorage
    const playerCardMappingStr = sessionStorage.getItem('playerCardMapping');

    // Tjek for fejl
    if (!playerCardMappingStr) {
        console.error('Fejl: Ingen spillerkort-data fundet.');
        return;
    }

    // Parse playerCardMappingStr til et objekt
    let playerCardMapping = JSON.parse(playerCardMappingStr);
    let mrWhitePlayerName = '';
    let numMrWhiteFound = 0;

    const playerList = document.getElementById('player-list');

    // Funktion til at kontrollere, om Mr. White har vundet
    function checkMrWhiteWin() {
        const numMrWhite = Object.values(playerCardMapping).reduce((total, cards) => total + (cards.includes('Mr. White') ? 1 : 0), 0);
        const numNormalPlayers = Object.keys(playerCardMapping).length - numMrWhite;

        return numMrWhite > numNormalPlayers;
    }

    // Funktion til at kontrollere, om spillet skal slutte
    function checkEndGame() {
        const numMrWhite = Object.values(playerCardMapping).reduce((total, cards) => total + (cards.includes('Mr. White') ? 1 : 0), 0);
        const numNormalPlayers = Object.keys(playerCardMapping).length - numMrWhite;

        if (numMrWhite === 0) {
            // Håndter situationen, når alle "Mr. White" spillere er stemt ud
            handleAllMrWhiteVotedOut();
        }

        if (checkMrWhiteWin()) {
            // Håndter situationen, når "Mr. White" har vundet
            handleMrWhiteWin();
        }

        if (numNormalPlayers === numMrWhite) {
            // Håndter situationen, når der er lige antal normale spillere og "Mr. White"
            handleEqualPlayers();
        }
    }

    // Funktion til at håndtere spillet, når alle "Mr. White" spillere er stemt ud
    function handleAllMrWhiteVotedOut() {
        let endGameMessage = 'Alle "Mr. White" spillere er stemt ud.';
        if (mrWhitePlayerName !== '') {
            endGameMessage += `\n${mrWhitePlayerName} var "Mr. White".`;
        }

        alert(`Spillet er slut! ${endGameMessage}`);

        // Gem dataene og send dem videre til guess.html
        sessionStorage.setItem('endGameMessage', endGameMessage);
        sessionStorage.setItem('playerCardMapping', JSON.stringify(playerCardMapping));

        // Omdiriger til guess.html
        window.location.href = 'guess.html';
    }

    // Funktion til at håndtere spillet, når "Mr. White" har vundet
    function handleMrWhiteWin() {
        // Omdiriger til straffe.html
        window.location.href = 'straffe.html';
    }

    // Funktion til at håndtere spillet, når der er lige antal normale spillere og "Mr. White"
    function handleEqualPlayers() {
        // Omdiriger til straffe.html
        window.location.href = 'straffe.html';
    }

    // Loop gennem hver spiller og opret HTML-elementer med spillernavnene og de tilhørende kort
    Object.keys(playerCardMapping).forEach(playerName => {
        const playerCards = playerCardMapping[playerName];
        const hasMrWhite = playerCards.includes('Mr. White');
        if (hasMrWhite) {
            mrWhitePlayerName = playerName; // Gem 'Mr. White' spillerens navn
            numMrWhiteFound++;
        }

        // Opret et <li> element for hver spiller
        const playerItem = document.createElement('li');
        playerItem.classList.add('player-item');

        // Opret et <span> element for spillernavnet
        const playerNameSpan = document.createElement('span');
        playerNameSpan.textContent = playerName;
        playerItem.appendChild(playerNameSpan);

        // Opret en knap for at stemme spilleren ud
        const playerButton = document.createElement('button');
        playerButton.classList.add('player-button');
        playerButton.textContent = 'Stem ud';
        playerButton.addEventListener('click', () => {
            const confirmDelete = confirm(`Er du sikker på, at du vil stemme ${playerName} ud?`);
            if (confirmDelete) {
                // Fjern spilleren fra DOM'en
                playerItem.remove();
                // Fjern spilleren fra playerCardMapping
                delete playerCardMapping[playerName];
                // Hvis alle 'Mr. White' spillere er blevet stemt ud, eller hvis antallet af normale spillere er det samme som antallet af 'Mr. White' spillere, så slutter spillet
                if (hasMrWhite) {
                    // Vis en pop-up-skærm, der angiver, at spilleren havde Mr. White kortet
                    alert(`${playerName} havde Mr. White kortet.`);
                    numMrWhiteFound--;
                    checkEndGame(); // Kontroller om spillet skal slutte efter at en "Mr. White" spiller er blevet stemt ud
                } else {
                    // Hvis der blev stemt en normal spiller ud, skal vi også tjekke, om spillet skal slutte
                    alert(`${playerName} blev stemt ud.`);
                    checkEndGame();
                }
            }
        });
        playerItem.appendChild(playerButton);

        // Tilføj det nye <li> element til listen over spillere
        playerList.appendChild(playerItem);
    });

    // Kontroller om spillet skal slutte ved start
    checkEndGame();
});
