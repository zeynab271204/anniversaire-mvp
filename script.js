// Curseur dynamique[cite: 7]
const dot = document.createElement('div'); dot.id = 'cursor-dot';
const ring = document.createElement('div'); ring.id = 'cursor-ring';
document.body.appendChild(dot); document.body.appendChild(ring);

document.addEventListener('mousemove', (e) => {
    dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    ring.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

// Effet Tilt 3D sur les cartes[cite: 7]
document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(1000px) rotateY(${x * 20}deg) rotateX(${y * -20}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateY(0) rotateX(0) scale(1)`;
    });
});

function goToPage(url) {
    document.body.style.opacity = '0';
    setTimeout(() => { window.location.href = url; }, 500);
}