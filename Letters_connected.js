const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth * 0.98;
canvas.height = window.innerHeight * 0.97;

let particlesArray = [];
let adjustX = 20;
let adjustY = 20;
let word = 'H';
let maxDistance = 30;
let radius = 70;

//handle mouse
const mouse = {
    x: null,
    y: null,
    radius
}

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});

ctx.fillStyle = 'white';
ctx.font = '30px Verdana';
ctx.fillText(word, 10, 40);
ctx.strokeStyle = 'white';
ctx.strokeRect(0, 0, 100, 60)
const textCoordinates = ctx.getImageData(0, 0, canvas.width, canvas.height);

class Particle{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = 3;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 40) + 2;
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
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;

        //calcular distancia maxima
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;

        //we use density so each particle has diferent "density", more natural
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;
        
        if(distance < mouse.radius){
            //Si cambiamos el signo +- atraemos o alejamos
            this.x -= directionX;
            this.y -= directionY;
            // this.size = 30;
        }else{
            if(this.x !== this.baseX){
                let dx = this.x - this.baseX;
                this.x -= dx/10;
            }
            if(this.x !== this.baseY){
                let dy = this.y - this.baseY;
                this.y -= dy/10;
            }
        }

    }
}

function init(){
    particlesArray = [];

    for (let y = 0, y2 = textCoordinates.height; y < y2; y++){

        for(let x = 0, x2 = textCoordinates.width; x < x2; x++){
            //(y * 4 * data.width) + (x * 4 ) + 3 
            //cicla por la data en cada fila y toma el 4to elemento
            if(textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4 ) + 3] > 128){
                let positionX = x;
                let positionY = y;
                particlesArray.push(new Particle(positionX * adjustX, positionY * adjustY));
            }
        }

    }

    // for(let i = 0; i < 500; i++){
    //     let x = Math.random() * canvas.width;
    //     let y = Math.random() * canvas.height;
    //     particlesArray.push(new Particle(x, y));
    // }
}
init();

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < particlesArray.length; i++){
        particlesArray[i].draw();
        particlesArray[i].update();
    }
    connect();
    requestAnimationFrame(animate);
}
animate()

//To conect each particle
function connect(){
    let opacityValue = 1;

    for (let a = 0; a < particlesArray.length; a++){
        for(let b = a; b < particlesArray.length; b++){
            
            //Calular la distancia o hipotenusa 
            let dx = particlesArray[a].x - particlesArray[b].x;
            let dy = particlesArray[a].y - particlesArray[b].y;
            //pitagoras       
            let distance = Math.sqrt(dx * dx + dy * dy);

            if(distance < maxDistance){
                //calculamos la opacidad segun la distancia, el divisor debe ser el mismo que la distancai maxima
                opacityValue = 1 - (distance/maxDistance);
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue})`;
                //Dibujamos una linea entre los 2 puntos
                ctx.lineWidth = 2;
                ctx.beginPath();
                //Punto inicial
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                //Punto continuo
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }

        }
    }

}