const canvas = document.getElementById('draw-canvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('color-picker');
const lineWidth = document.getElementById('line-width');
const clearBtn = document.getElementById('clear-btn');


function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}
window.addEventListener('resize', resize);
resize();

let drawing = false;


function startPosition(e) {
    drawing = true;
    draw(e); 
}

function finishedPosition() {
    drawing = false;
    ctx.beginPath(); 
}

function draw(e) {
    if (!drawing) return;
    
    ctx.lineWidth = lineWidth.value;
    ctx.lineCap = 'round';
    ctx.strokeStyle = colorPicker.value;


    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}


canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', finishedPosition);
canvas.addEventListener('mousemove', draw);


canvas.addEventListener('touchstart', (e) => { e.preventDefault(); startPosition(e.touches[0]); });
canvas.addEventListener('touchend', finishedPosition);
canvas.addEventListener('touchmove', (e) => { e.preventDefault(); draw(e.touches[0]); });

clearBtn.addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height));
document.getElementById('save-btn').addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'signature.png';
    link.href = canvas.toDataURL();
    link.click();
});