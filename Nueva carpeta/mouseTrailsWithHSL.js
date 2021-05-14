const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');
const canvasSize = (function canvasSize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    return canvasSize
})();

//color spectrum in HSL colour
let hue = 0;

const drawRect = ()=>{
    context.fillStyle = 'white';
    context.fillRect(20, 20, 50, 50);
}
drawRect()


window.addEventListener('resize', ()=>{
    canvasSize();
    drawRect()
});

const mouse = {
    x: null,
    y: null,
}

const particlesArray = [];

canvas.addEventListener('mousemove', (e)=>{
    mouse.x = e.x;
    mouse.y = e.y
    for(let i = 0; i < 5; i++){
        particlesArray.push(new Particle);
    }
});


class Particle {
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `hsl(${hue}, 100%, 50%)`;
    }
    draw(){
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);        
        context.fillStyle = this.color;
        context.fill();
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.size > 0.1 ) this.size -= 0.01;
    }
}

function handleParticles(){
    for(let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();
        //remove invisible particles
        if(particlesArray[i].size <= 0.1){
            particlesArray.splice(i, 1);
            //as we remove one element from the array we have to reduce the index
            i--;
        }
    }
}

function animate(){
    // context.clearRect(0, 0, canvas.width, canvas.height);

    //this print a black box over the canvas every time, which gives a trail effect on each particle
    context.fillStyle = 'rgba(0,0,0,0.02)';
    context.fillRect(0,0,canvas.width,canvas.height);

    handleParticles();
    
    //we increase the hue
    hue++;
    requestAnimationFrame(animate);
}
animate();