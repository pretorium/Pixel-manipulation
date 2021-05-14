const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth * 0.98;
canvas.height = window.innerHeight * 0.97;

let particlesArray = [];

//handle mouse
const mouse = {
    x: null,
    y: null,
    radius: 150
}

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});

ctx.fillStyle = 'white';
ctx.font = '30px Verdana';
ctx.fillText('Word', 10, 40);
ctx.strokeStyle = 'white';
ctx.strokeRect(0, 0, 100, 60)
const data = ctx.getImageData(0, 0, 100, 600);

class Particle{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = 3;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
    }
    draw(){
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    update(){
        //Calular la distancia o hipotenusa 
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        //pitagoras
        let distances = Math.sqrt(dx * dx + dy * dy);
        if(distances < 100){
            this.size = 30;
        }else{
            this.size = 3;
        }

    }
}

function init(){
    particlesArray = [];
    for(let i = 0; i < 500; i++){
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particlesArray.push(new Particle(x, y));
    }
}
init();

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < particlesArray.length; i++){
        particlesArray[i].draw();
        particlesArray[i].update();
    }
    requestAnimationFrame(animate);
}
animate()
