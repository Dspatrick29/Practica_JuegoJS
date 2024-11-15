window.onload = function () {
    let canvas;
    var suelo;
    var yArriba = false;
    var animacionActiva = true;
    canvas = document.getElementById("miCanvas");
    const ctx = canvas.getContext('2d');


    // Constructor de Pajaro
    function Pajaro() {
        this.r = 40;
        this.resetearVariables();
    }
    
    // Método para inicializar la posición del pájaro
    Pajaro.prototype.resetearVariables = function () {
        this.x = 250;
        this.y = 150;
        this.velocidad = 0;  // Velocidad inicial
        this.gravedad = 0.5;  // Fuerza de gravedad
        this.salto = -10;  // Fuerza del salto (valor negativo para que suba)
        this.velocidadMaxima = 1;  // Velocidad máxima al caer
    };

    // Método para dibujar el pájaro
    Pajaro.prototype.dibujar = function () {
        ctx.fillStyle = "orange";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
    };

  
    
    // Método para dibujar el pájaro
    Pajaro.prototype.dibujar = function () {
        ctx.fillStyle = "orange";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
    };

    
    // Método para actualizar la posición del pájaro
    Pajaro.prototype.actualizar = function () {
        // Si el usuario presiona para saltar
        if (yArriba) {
            this.velocidad = this.salto; // Reiniciar la velocidad al saltar
            yArriba = false; // Desactivar el salto tras aplicarlo
        } else {
            // Aplicar gravedad solo si no hay salto
            this.velocidad += this.gravedad;

            // Limitar la velocidad máxima de caída
            if (this.velocidad > this.velocidadMaxima) {
                this.velocidad = this.velocidadMaxima;
            }
        }

        // Actualizar la posición en función de la velocidad
        this.y += this.velocidad;

        // Limitar al borde inferior (suelo)
        if (this.y + this.r >= suelo.y) {
            this.y = suelo.y - this.r; // Ajustar la posición al borde
            this.velocidad = 0; // Detener el movimiento
            animacionActiva = false; // Detener la animación
            console.log("Colisión con el suelo");
        }
    };


    // Crear el objeto su
    suelo = new Suelo();
    const pajaro = new Pajaro();

    // Método para dibujar los elementos
    function dibujar() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);  // Limpiar el canvas
        suelo.dibujar();  // Dibujar el suelo
        pajaro.dibujar();  // Dibujar el pájaro
    }

    // Constructor del suelo
    function Suelo() {
        this.ancho = 1280;
        this.alto = 140;
        this.x = 0;
        this.y = 720 - this.alto;
        this.dibujar = function () {
            ctx.fillStyle = "#F5F5DC";
            ctx.fillRect(this.x, this.y, this.ancho, this.alto);
        };
    }

    // Detectar eventos de teclado
    document.addEventListener("keydown", activaMovimiento, false);
   // document.addEventListener("keyup", desactivaMovimiento, false);


    function activaMovimiento(evt) {
        switch (evt.keyCode) {
            case 38:
                yArriba = true;
                break;
            case 32:
                yArriba = true;
                break;
        }
    }
/*
    function desactivaMovimiento(evt) {
        switch (evt.keyCode) {
            case 38:
                yArriba = false;
                break;
            case 32:
                yArriba = false;
                break;
        }
    }*/
// Iniciar la animación
document.getElementById('botonInicio').addEventListener('click', function () {
    animacionActiva = true;
    const intervalo = setInterval(function () {
        if (animacionActiva) {
            pajaro.actualizar(); // Actualizar la posición del pájaro
            dibujar(); // Dibujar los elementos
        } else {
            clearInterval(intervalo); // Detener la animación al chocar con el suelo
        }
    }, 1000 / 60); // 60 FPS
});
















}