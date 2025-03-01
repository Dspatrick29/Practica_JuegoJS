
// La logica detras de las colisiones del juego Flappy Bird es bastante simple.
// El juego tiene dos tipos de colisiones: una con el suelo y otra con los obstáculos.
// Para detectar si el pájaro colisiona con el suelo, simplemente comprobamos si la posición y del pájaro es mayor que la altura del canvas.


function colisiona(pajaro, obstaculo) {
    // Ver si hay colisión con el rectángulo superior
    if (pajaro.x + pajaro.r > obstaculo.posicionX &&
        pajaro.x - pajaro.r < obstaculo.posicionX + obstaculo.ancho &&
        pajaro.y - pajaro.r < obstaculo.posicionY) {
        return true;
    }
    /*
    pajaro.x + pajaro.r > obstaculo.posicionX: 
        Comprueba si el borde derecho del pájaro está a la derecha del borde izquierdo del obstáculo.
    pajaro.x - pajaro.r < obstaculo.posicionX + obstaculo.ancho: 
        Verifica si el borde izquierdo del pájaro está a la izquierda del borde derecho del obstáculo.
    pajaro.y - pajaro.r < obstaculo.posicionY: 
        Verifica si el borde superior del pájaro está por encima del borde superior del obstáculo.
            Si todas se cumplen, el pájaro ha colisionado con el rectángulo superior del obstáculo.
*/

    // Ver si hay colisión con el rectángulo inferior
    if (pajaro.x + pajaro.r > obstaculo.posicionX &&
        pajaro.x - pajaro.r < obstaculo.posicionX + obstaculo.ancho &&
        pajaro.y + pajaro.r > obstaculo.posicionY + obstaculo.alturaHueco) {
        return true;
    }
    /* 
    pajaro.x + pajaro.r > obstaculo.posicionX: 
        Verifica si el borde derecho del pájaro está a la derecha del borde izquierdo del obstáculo.
    pajaro.x - pajaro.r < obstaculo.posicionX + obstaculo.ancho: 
        Verifica si el borde izquierdo del pájaro está a la izquierda del borde derecho del obstáculo.
    pajaro.y + pajaro.r > obstaculo.posicionY + obstaculo.alturaHueco: 
        Verifica si el borde inferior del pájaro está por debajo del borde inferior del hueco del obstáculo.
            Si todas se cumplen, el pájaro ha colisionado con el rectángulo inferior del obstáculo. 
            */

    return false;
}


