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
        let drawed = false;
        for(let j = i; j < particlesArray.length; j++){
            //X axis
            const dx = particlesArray[i].x - particlesArray[j].x;
            //Y axis
            const dy = particlesArray[i].y - particlesArray[j].y;            
            //Pythagorean Theorem Hypotenuse = SquareRoot(dx*dx + dy*dy) or sqrt.hypot
            const distance = Math.hypot(dx, dy);
            
            if(distance < 100){
                console.log('here')
                context.beginPath();
                context.moveTo(particlesArray[i].x, particlesArray[i].y);
                context.lineTo(particlesArray[j].x, particlesArray[j].y);
                context.strokeStyle = particlesArray[i].color;
                context.lineWidth = particlesArray[i].size / 10;
                context.stroke();
                context.closePath();
                drawed = true;
            }
        }
        
        //remove invisible particles
        if(particlesArray[i].size <= 0.1){
            particlesArray.splice(i, 1);
            //as we remove one element from the array we have to reduce the index
            //this has to be at the end of the loop
            i--;
        }

    }
}

function animate(){
    context.clearRect(0, 0, canvas.width, canvas.height);

    handleParticles();
    
    //we increase the hue
    hue++;
    requestAnimationFrame(animate);
}
animate();