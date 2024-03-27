document.addEventListener('DOMContentLoaded', () => {
    const numPlayersInput = document.getElementById('numPlayers');
    const numUndercoversInput = document.getElementById('numUndercovers');
    const startSetupBtn = document.getElementById('startSetupBtn');

    startSetupBtn.addEventListener('click', async () => {
        const numPlayers = parseInt(numPlayersInput.value, 10);
        const numUndercovers = parseInt(numUndercoversInput.value, 10);

        if (numUndercovers > numPlayers) {
            alert('Antallet af undercovers kan ikke være større end antallet af spillere.');
            return;
        }

        const playerNames = [];
        for (let i = 1; i <= numPlayers; i++) {
            const playerName = prompt(`Indtast navn for Spiller ${i}:`);
            if (playerName) playerNames.push(playerName.trim());
        }

        // Sørg for, at alle spillernavne er indsamlet før vi går videre
        if (playerNames.length === numPlayers) {
            const playerNamesParam = encodeURIComponent(JSON.stringify(playerNames));
            window.location.href = `shuffle.html?numPlayers=${numPlayers}&numUndercovers=${numUndercovers}&playerNames=${playerNamesParam}`;
        } else {
            alert('Noget gik galt ved indsamling af spillernavne.');
        }
    });
});
