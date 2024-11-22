// Description: Clase que representa un obstáculo en el juego.
function Obstaculo(anchoCanvas, altoCanvas) {
    this.ancho = 50;
    this.alto = altoCanvas;
    this.alturaHueco = 200;
    this.posicionX = anchoCanvas;
    this.posicionY = Math.floor(Math.random() * (altoCanvas - this.alturaHueco)) - 80;
    //this.imagen = new Image();
    //this.imagen.src = "./assets/img/img_pipe-green.png";


}

    // Constante para el límite de borrado
    const LIMITEBORRADO = -60;

    let columnas = [];

    Obstaculo.prototype.parteSuperior = new Image();
    Obstaculo.prototype.parteSuperior.src = "./assets/img/img_pipe-greenSUP.png";

    Obstaculo.prototype.parteInferior = new Image();
    Obstaculo.prototype.parteInferior.src = "./assets/img/img_pipe-green.png";
    // Inicializar la imagen actual del pájaro
    Obstaculo.prototype.imagen = Obstaculo.prototype.parteSuperior;


    Obstaculo.prototype.dibujar = function (ctx) {
        ctx.fillStyle = 'black';
        // Dibujar rectángulo superior
        ctx.drawImage(this.imagen, this.posicionX, 0, this.ancho, this.posicionY);
        ctx.save();
        Obstaculo.prototype.imagen = Obstaculo.prototype.parteInferior;
        // Dibujar rectángulo inferior
        ctx.drawImage(this.imagen, this.posicionX, this.posicionY + this.alturaHueco, this.ancho, this.alto - (this.posicionY + this.alturaHueco));
        Obstaculo.prototype.imagen = Obstaculo.prototype.parteSuperior;
    };

    Obstaculo.prototype.actualizar = function (velocidad) {
        this.posicionX -= velocidad;
    }

