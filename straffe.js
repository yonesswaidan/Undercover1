document.addEventListener('DOMContentLoaded', () => {
    const punishments = [
        "Skriv en kærlighedssang og syng den højt for gruppen.",
        "Dans rundt om rummet som en kylling i 2 minutter.",
        "Fortæl en vittighed, indtil alle griner.",
        "Lav 10 armbøjninger.",
        "Stå på et ben i 1 minut uden at falde."
    ];
    const cardSelection = document.querySelector('.card-selection');

    // Funktion til at afsløre straffen ved klik
    function revealPunishment(event) {
        const card = event.target;
        const index = Array.from(cardSelection.children).indexOf(card);
        if (punishments[index]) {
            card.textContent = punishments[index];
            card.removeEventListener('click', revealPunishment);
        }
    }

    // Opret kortene og tilføj event listeners
    punishments.forEach((punishment, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.textContent = `Straf ${index + 1}`;
        card.addEventListener('click', revealPunishment);
        cardSelection.appendChild(card);
    });
});
