function Sonidos() {
    this.salto = new Audio("./assets/sound/audio_wing.ogg");
    this.punto = new Audio("./assets/sound/audio_point.ogg");
    this.colision = new Audio("./assets/sound/audio_hit.ogg");
}

Sonidos.prototype.reproducirSalto = function() {
    this.salto.currentTime = 0; // Reiniciar el sonido
    this.salto.play();
};

Sonidos.prototype.reproducirPunto = function() {
    this.punto.currentTime = 0; 
    this.punto.play();
};

Sonidos.prototype.reproducirColision = function() {
    this.colision.currentTime = 0; 
    this.colision.play();
};
