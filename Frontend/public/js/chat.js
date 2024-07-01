let selectedGame = '';

function startChat(game) {
    selectedGame = game;
    document.getElementById('game-title').textContent = game;
    document.querySelector('.game-selection').style.display = 'none';
    document.getElementById('chat-container').style.display = 'block';
    loadMessages();
}

function loadMessages() {
    fetch(`/api/messages?game=${selectedGame}`)
        .then(response => response.json())
        .then(messages => {
            const chatBox = document.getElementById('chat-box');
            chatBox.innerHTML = '';
            messages.forEach(message => {
                const messageElement = document.createElement('div');
                messageElement.textContent = `${message.username}: ${message.text}`;
                chatBox.appendChild(messageElement);
            });
        });
}

function sendMessage(event) {
    event.preventDefault();
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value;
    if (message.trim() === '') return;

    fetch('/api/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ game: selectedGame, text: message })
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            messageInput.value = '';
            loadMessages();
        } else {
            alert('Erreur lors de l\'envoi du message');
        }
    });
}
