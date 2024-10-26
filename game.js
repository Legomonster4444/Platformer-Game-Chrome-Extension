const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = {
    x: 50,
    y: 200,
    width: 50,
    height: 50,
    color: 'red',
    dy: 0,
    gravity: 0.5,
    jumpStrength: 10,
    onGround: false
};

const ground = {
    x: 0,
    y: canvas.height - 50,
    width: canvas.width,
    height: 50,
    color: 'green'
};

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawGround() {
    ctx.fillStyle = ground.color;
    ctx.fillRect(ground.x, ground.y, ground.width, ground.height);
}

function updatePlayer() {
    if (player.y + player.height < ground.y) {
        player.dy += player.gravity;
        player.y += player.dy;
        player.onGround = false;
    } else {
        player.dy = 0;
        player.onGround = true;
    }
}

function jump() {
    if (player.onGround) {
        player.dy = -player.jumpStrength;
        player.onGround = false;
    }
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        jump();
    }
});

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGround();
    updatePlayer();
    drawPlayer();
    requestAnimationFrame(gameLoop);
}

gameLoop();