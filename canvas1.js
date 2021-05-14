const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 500;
//Creamos el elemento canvas y asignamos mismo alto y ancho que en los estilos

//creamos una imagen
const image1 = new Image();
image1.src = 'paisaje.jpg';
image1.onload = ()=>{
    //esperamos la carga y la dibujamos en nuestro lienzo
    ctx.drawImage(image1, 0, 0);
    const scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    console.log(scannedImage);

    const scannedData = scannedImage.data;

    //recorremos nuestra imagen escaneada y calculamos el promedio de color en cada pixel
    for(let i = 0; i < scannedData.length/2; i+= 4){
        const total = scannedData[i] + scannedData[i+1] + scannedData[i+2];
        const averageColorValue = total/3;
        scannedData[i] = averageColorValue;
        scannedData[i+1] = averageColorValue;
        scannedData[i+2] = averageColorValue;
    }

    //reemplazamos la data de la imagen original
    scannedImage.data = scannedData;
    ctx.putImageData(scannedImage, 0, 0)
}