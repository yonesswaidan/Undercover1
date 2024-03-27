document.addEventListener('DOMContentLoaded', function() {
    const startGameBtn = document.getElementById('startGameBtn');
    const instructionsBtn = document.getElementById('instructionsBtn');
    const aboutBtn = document.getElementById('aboutBtn');

    startGameBtn.addEventListener('click', function() {
        window.location.href = 'game.html';
    });

    instructionsBtn.addEventListener('click', function() {
        window.location.href = 'instructions.html';
    });

    aboutBtn.addEventListener('click', function() {
        window.location.href = 'about.html';
    });
});
