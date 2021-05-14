const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 500;
const gradient1 = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient1.addColorStop(0.2, 'pink');
gradient1.addColorStop(0.3, 'red');
gradient1.addColorStop(0.4, 'orange');
gradient1.addColorStop(0.5, 'yellow');
gradient1.addColorStop(0.6, 'green');
gradient1.addColorStop(0.7, 'turquoise');
gradient1.addColorStop(0.8, 'violet');

const letters = ['F','I','R','E'];
let switcher = 1;
let counter = 0;

//intervalo para cambiar cuando sea multiplo de 12 el contador
setInterval(()=>{
    counter++;
    if (counter % 12 === 0){
        switcher *= -1;
    }
}, 500);

const myImage = new Image();
myImage.src = 'fuego.jpg';
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
                cellColor = `rgb(${red}, ${green}, ${blue})`,
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
            this.angle = 0;
            this.letter = letters[Math.floor(Math.random() * letters.length)];
            this.random = Math.random();
        }
        update(){
            this.positionY = Math.floor(this.y);
            this.positionX = Math.floor(this.x);

            if((mappedImage[this.positionY]) && mappedImage[this.positionX]){
                this.speed = mappedImage[this.positionY][this.positionX][0];
            }

            let movement = (3.5 - this.speed) + this.velocity;

            this.angle += this.speed/20;

            //cambiamos el tama;o segun el brillo
            this.size = this.speed * 2.5;
            /*
            if(switcher === 1){
                ctx.globalCompositeOperation = 'luminosity';
            }else{
                ctx.globalCompositeOperation = 'lighter';
            }
            if(counter % 10 === 0){
                this.x = Math.random() * canvas.width;
                this.y = 0;
            }*/

            //Here we can change the angle
            this.y -= movement;
            this.x += movement + Math.sin(this.angle) * 2;

            if(this.y <= 0){
                this.y = canvas.height;
                this.x = Math.random() * canvas.width;
            }
            if(this.x >= canvas.width){
                this.x = 0;
                this.y = Math.random() * canvas.height;
            }
        }
        draw(){
            ctx.beginPath();
            // ctx.fillStyle = ['blue', 'white', 'red'][(Math.floor(Math.random() * 2) + 1)-1];
            // ctx.fillStyle = 'white';

            //use original color            
            if((mappedImage[this.positionY]) && mappedImage[this.positionX]){
                ctx.fillStyle = mappedImage[this.positionY][this.positionX][1];
                ctx.strokeStyle = mappedImage[this.positionY][this.positionX][1];
            }            

            //use the gradient as color
            // ctx.fillStyle = gradient1;

            //Use a circle
            // ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

            //use a rectangle
            // ctx.strokeRect(this.x, this.y, this.size *3, this.size * 3);

            //use a random letter
            // ctx.fillText(this.letter, this.x, this.y)

            //use random letters or circle
            ctx.font = '20px Arial'; //set leter font
            if(this.random < 0.5) ctx.fillText(this.letter, this.x, this.y);
            else ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            
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
            // ctx.globalAlpha = 1;
            particlesArray[i].draw();
        }
        requestAnimationFrame(animate);
    }
    animate();
}