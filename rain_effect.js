const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 500;

const myImage = new Image();
myImage.src = 'flor.jpg';
myImage.onload = ()=>{
    ctx.drawImage(myImage, 0, 0, canvas.width, canvas.height);

    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
        
    let particlesArray = [];
    const numberOfParticles = 5000;

    let mappedImage = [];

    for(let y = 0; y < canvas.height; y++){
        let row = [];
        for(let x = 0; x < canvas.width; x++){
            //ESTA FORMULA RECORRE TODA LA DATA Y CONSIGUE EL VALOR ROJO DE CADA FILA
            const red = pixels.data[(y * 4 * pixels.width) + (x * 4)];
            const green = pixels.data[(y * 4 * pixels.width) + (x * 4 + 1)];
            const blue = pixels.data[(y * 4 * pixels.width) + (x * 4 + 2)];
            const brightness = calculateRelativeBrightness(red, green, blue);
            const cell = [
                cellBrightness = brightness,
            ];
            row.push(cell);
        }
        mappedImage.push(row);
    }

    //Esta funcion es para hacer una correccion visial a los colores para el ojo humano, 
    //no es estrictamente necesaria
    function calculateRelativeBrightness(red, green, blue){
        return Math.sqrt(
            (red * red) * 0.299 + 
            (green * green) * 0.587 +
            (blue * blue) * 0.144
        )/100;
    }

    class Particles {
        constructor(){
            this.x = Math.random() * canvas.width;
            this.y = 0;
            this.speed = 0;
            this.velocity = Math.random() * 0.5;
            this.size = Math.random() * 1.5 + 1;
            this.positionY = Math.floor(this.y);
            this.positionX = Math.floor(this.x);
        }
        update(){
            this.positionY = Math.floor(this.y);
            this.positionX = Math.floor(this.x);
            this.speed = mappedImage[this.positionY][this.positionX][0];

            let movement = (3.5 - this.speed) + this.velocity;

            this.y += movement;
            if(this.y >= canvas.height){
                this.y = 0;
                this.x = Math.random() * canvas.width;
            }
        }
        draw(){
            ctx.beginPath();
            // ctx.fillStyle = ['blue', 'white', 'red'][(Math.floor(Math.random() * 2) + 1)-1];
            ctx.fillStyle = 'white';
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init(){
        for(let i = 0; i < numberOfParticles; i++){
            particlesArray.push(new Particles);
        }
    }
    init();

    function animate(){
        // ctx.drawImage(myImage, 0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 0.05;
        ctx.fillStyle = 'rgb(0,0,0)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.globalAlpha = 0.2;
        for(let i = 0; i < particlesArray.length; i++){
            particlesArray[i].update();
            ctx.globalAlpha = particlesArray[i].speed * 0.1;
            particlesArray[i].draw();
        }
        requestAnimationFrame(animate);
    }
    animate();
}