// Description: Clase que representa un obstáculo en el juego.
function Obstaculo(anchoCanvas, altoCanvas) {
    this.ancho = 50;
    this.alto = altoCanvas;
    this.alturaHueco = 200;
    this.posicionX = anchoCanvas;
    this.posicionY = Math.floor(Math.random() * (altoCanvas - this.alturaHueco))-140;
     this.imagen = new Image();
    this.imagen.src = "./assets/img/img_pipe-green.png";

}


Obstaculo.prototype.dibujar = function(ctx) {
    ctx.fillStyle = 'black';
    // Dibujar rectángulo superior
    ctx.fillRect(this.posicionX, 0, this.ancho, this.posicionY);
    // Dibujar rectángulo inferior
    ctx.drawImage(this.imagen,this.posicionX, this.posicionY + this.alturaHueco, this.ancho, this.alto - (this.posicionY + this.alturaHueco));
    
};

Obstaculo.prototype.actualizar = function(velocidad) {
    this.posicionX -= velocidad;
}

