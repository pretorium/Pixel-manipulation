const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');
const canvasSize = (function canvasSize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    return canvasSize
})();

const drawRect = ()=>{
    context.fillStyle = 'white';
    context.fillRect(20, 20, 50, 50);
}


window.addEventListener('resize', ()=>{
    canvasSize();
});

const mouse = {
    x: null,
    y: null,
}
let isDrawing = false;


const createCircle = ()=>{
    //draw circles
    context.beginPath();
    context.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2);
    
    context.fillStyle = 'blue';
    context.fill();
    
    context.strokeStyle='white';
    context.stroke();
    //end drawed circle
    context.closePath();
}


canvas.addEventListener('mousedown', (e)=>{
    isDrawing = true;
});
canvas.addEventListener('mouseup', (e)=>{
    isDrawing = false;
});
//Paint brush
canvas.addEventListener('mousemove', (e)=>{
    if(isDrawing){
        mouse.x = e.x;
        mouse.y = e.y
        createCircle();
    }
});
