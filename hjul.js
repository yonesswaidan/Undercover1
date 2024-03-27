document.addEventListener('DOMContentLoaded', () => {
    const wheelCanvas = document.getElementById('wheel');
    const spinBtn = document.getElementById('spin-btn');
    const finalValue = document.getElementById('final-value');

    let playerNames = [];
    const urlParams = new URLSearchParams(window.location.search);

    try {
        playerNames = JSON.parse(decodeURIComponent(urlParams.get('playerNames') || '[]'));
        if (!Array.isArray(playerNames) || playerNames.length === 0) {
            throw new Error('playerNames er ikke en array eller er tom.');
        }
    } catch (error) {
        console.error('Fejl ved parsing af spiller navne:', error);
        finalValue.textContent = 'Ingen gyldige spiller navne fundet. Kontroller URL-parameteren.';
        spinBtn.disabled = true;
        return; // Tidlig return for at stoppe yderligere eksekvering hvis der er en fejl
    }

    // Opret hjuldata med spillernavnene
    const data = playerNames.map(() => 1); // Alle navne får samme 'vægt'
    const backgroundColors = playerNames.map((_, i) => i % 2 === 0 ? '#8b35bc' : '#b163da'); // Vekslende baggrundsfarver

    // Initialiser hjulet med Chart.js
    const wheelChart = new Chart(wheelCanvas, {
        type: 'pie',
        data: {
            labels: playerNames,
            datasets: [{
                data: data,
                backgroundColor: backgroundColors,
            }],
        },
        options: {
            responsive: true,
            animation: { duration: 0 },
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false },
                datalabels: {
                    color: '#ffffff',
                    anchor: 'end',
                    align: 'start',
                    offset: -10,
                    font: {
                        size: 14,
                    },
                    formatter: (value, context) => context.chart.data.labels[context.dataIndex],
                },
            },
        },
    });

    spinBtn.addEventListener('click', () => {
        spinBtn.disabled = true; // Deaktiver knappen under spin
        const randomIndex = Math.floor(Math.random() * playerNames.length);
        finalValue.textContent = 'Spinder...';
        setTimeout(() => {
            const startingPlayer = playerNames[randomIndex];
            finalValue.textContent = startingPlayer + ' skal starte!';
            spinBtn.disabled = false;
            showPopup(startingPlayer);
        }, 2000); // 2 sekunders forsinkelse for at simulerer spinning
    });

    function showPopup(startingPlayer) {
        // Vis en pop-up med spillerens navn
        if (confirm(`${startingPlayer} skal starte! Klik OK for at gå videre til afstemningssiden.`)) {
            initiateVoting(startingPlayer);
        } else {
            spinBtn.disabled = false;
        }
    }

    function initiateVoting(playerName) {
        // Omdiriger til afstemningssiden med spilleren, der skal starte spillet
        window.location.href = `afstemning.html?playerNames=${encodeURIComponent(JSON.stringify(playerNames))}&startingPlayer=${encodeURIComponent(playerName)}`;
    }
});
