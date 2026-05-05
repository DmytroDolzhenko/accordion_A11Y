const slider = document.getElementById('volume-slider');
const track = document.getElementById('track');
const fill = document.getElementById('fill');
const valueIndicator = document.querySelector('.value-indicator');

let currentVolume = 50;
let lastVolume = 50;
let isDragging = false;

function updateVolume(val) {
    currentVolume = Math.min(Math.max(val, 0), 100);
    
    slider.setAttribute('aria-valuenow', currentVolume);
    
    let textValue = `${currentVolume} відсотків`;
    if (currentVolume === 0) textValue = "Без звуку";
    if (currentVolume === 100) textValue = "Максимальна гучність";
    slider.setAttribute('aria-valuetext', textValue);

    slider.style.left = `${currentVolume}%`;
    fill.style.width = `${currentVolume}%`;
    valueIndicator.textContent = `${currentVolume}%`;
}


function handleMove(e) {
    if (!isDragging) return;

    const rect = track.getBoundingClientRect();
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    
    const x = clientX - rect.left;
    const percentage = Math.round((x / rect.width) * 100);
    
    updateVolume(percentage);
}

function startDragging(e) {
    isDragging = true;
    slider.focus();
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', stopDragging);
    document.addEventListener('touchmove', handleMove);
    document.addEventListener('touchend', stopDragging);
    
    handleMove(e);
}

function stopDragging() {
    isDragging = false;
    document.removeEventListener('mousemove', handleMove);
    document.removeEventListener('mouseup', stopDragging);
    document.removeEventListener('touchmove', handleMove);
    document.removeEventListener('touchend', stopDragging);
}

slider.addEventListener('mousedown', startDragging);
track.addEventListener('mousedown', startDragging);

slider.addEventListener('touchstart', startDragging, { passive: false });
track.addEventListener('touchstart', startDragging, { passive: false });


slider.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowRight': case 'ArrowUp': updateVolume(currentVolume + 2); break;
        case 'ArrowLeft': case 'ArrowDown': updateVolume(currentVolume - 2); break;
        case 'PageUp': updateVolume(currentVolume + 10); break;
        case 'PageDown': updateVolume(currentVolume - 10); break;
        case 'Home': updateVolume(0); break;
        case 'End': updateVolume(100); break;
        default: return;
    }
    e.preventDefault();
});