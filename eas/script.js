const cursorDot = document.createElement('div'); cursorDot.id = 'cursor-dot';
const cursorRing = document.createElement('div'); cursorRing.id = 'cursor-ring';
document.body.appendChild(cursorDot); document.body.appendChild(cursorRing);

let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
let ringX = mouseX, ringY = mouseY;

document.addEventListener('mousemove', (e) => { 
    mouseX = e.clientX; mouseY = e.clientY; 
    cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`; 
});

function animateCursor() {
    ringX += (mouseX - ringX) * 0.2; ringY += (mouseY - ringY) * 0.2;
    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) ${document.body.classList.contains('hovering') ? 'rotate(45deg)' : ''}`;
    requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .interactive-el').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});

const spotlights = document.createElement('div');
spotlights.className = 'spotlights-container';
spotlights.innerHTML = '<div class="spotlight sp-1"></div><div class="spotlight sp-2"></div><div class="spotlight sp-3"></div>';
document.body.prepend(spotlights);

// ÉTINCELLES DE SUPPORTERS (Bleu, Rouge, Blanc, Marron)
const sparkCanvas = document.createElement('canvas'); 
sparkCanvas.style.position = 'fixed'; sparkCanvas.style.top = '0'; sparkCanvas.style.left = '0'; 
sparkCanvas.style.width = '100%'; sparkCanvas.style.height = '100%'; sparkCanvas.style.zIndex = '-3'; sparkCanvas.style.pointerEvents = 'none';
document.body.prepend(sparkCanvas);
const sCtx = sparkCanvas.getContext('2d');
let sparks = [];
const psgColors = ['#004170', '#DA291C', '#ffffff', '#a87b51']; 

function resizeSparks() { sparkCanvas.width = window.innerWidth; sparkCanvas.height = window.innerHeight; }
resizeSparks(); window.addEventListener('resize', resizeSparks);

for(let i=0; i<60; i++) {
    sparks.push({
        x: Math.random() * sparkCanvas.width, y: Math.random() * sparkCanvas.height,
        length: Math.random() * 10 + 5, speed: Math.random() * 2 + 1, angle: -Math.PI / 4,
        color: psgColors[Math.floor(Math.random() * psgColors.length)]
    });
}

function drawSparks() {
    sCtx.clearRect(0, 0, sparkCanvas.width, sparkCanvas.height);
    sCtx.lineWidth = 1.5;
    sparks.forEach(p => {
        p.x += Math.cos(p.angle) * p.speed; p.y += Math.sin(p.angle) * p.speed;
        if(p.x > sparkCanvas.width || p.y < 0) { p.x = Math.random() * sparkCanvas.width - 100; p.y = sparkCanvas.height + 100; }
        sCtx.strokeStyle = p.color;
        sCtx.beginPath(); sCtx.moveTo(p.x, p.y); sCtx.lineTo(p.x - Math.cos(p.angle)*p.length, p.y - Math.sin(p.angle)*p.length); sCtx.stroke();
    });
}

// ONDE SONORE (Dégradé Bleu -> Marron -> Rouge)
const waveCanvas = document.createElement('canvas'); 
waveCanvas.id = 'soundwave'; document.body.prepend(waveCanvas);
const wCtx = waveCanvas.getContext('2d');

function resizeWave() { waveCanvas.width = window.innerWidth; waveCanvas.height = window.innerHeight * 0.3; }
resizeWave(); window.addEventListener('resize', resizeWave);

let time = 0;
function animateAll() {
    drawSparks();
    
    wCtx.clearRect(0, 0, waveCanvas.width, waveCanvas.height);
    wCtx.beginPath();
    
    let gradient = wCtx.createLinearGradient(0, 0, waveCanvas.width, 0);
    gradient.addColorStop(0, "rgba(0, 65, 112, 0.6)");  // Bleu PSG
    gradient.addColorStop(0.5, "rgba(139, 69, 19, 0.5)"); // Marron Cuir
    gradient.addColorStop(1, "rgba(218, 41, 28, 0.6)");   // Rouge PSG
    
    wCtx.strokeStyle = gradient;
    wCtx.lineWidth = 2.5;
    
    for(let i = 0; i < waveCanvas.width; i += 4) {
        let baseWave = Math.sin(i * 0.01 + time) * 15 + Math.sin(i * 0.03 - time * 1.5) * 5;
        let distanceToCenter = Math.abs(i - waveCanvas.width / 2);
        let spike = 0;
        if(distanceToCenter < 200) {
            spike = (200 - distanceToCenter) * Math.abs(Math.sin(time * 3)) * 0.5;
            if (i % 8 === 0) spike = -spike;
        }
        let y = waveCanvas.height / 2 + baseWave + spike;
        if(i === 0) wCtx.moveTo(i, y); else wCtx.lineTo(i, y);
    }
    wCtx.stroke();
    
    time += 0.03;
    requestAnimationFrame(animateAll);
}
animateAll();

function goToPage(url) { document.body.classList.add('fade-out'); setTimeout(() => { window.location.href = url; }, 500); }

document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const rotateX = ((e.clientY - rect.top - rect.height/2) / (rect.height/2)) * -10;
        const rotateY = ((e.clientX - rect.left - rect.width/2) / (rect.width/2)) * 10;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    card.addEventListener('mouseleave', () => card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`);
});