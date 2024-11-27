window.onload = function () {

    var animacionActiva = false;


    var fondo = new Image();
    fondo.src = "./assets/img/img_background-day.png";

    const canvas = document.getElementById('miCanvas');
    const ctx = canvas.getContext('2d');
    const gravedad = 2; // Gravedad 
    let marcador=0;
    // Constructor de Pajaro
    function Pajaro() {
        this.r = 30;
        this.x = 250;
        this.y = 150; // Posición inicial del pájaro
        this.salto = 6; // Cantidad de posiciones que sube al saltar
        this.enSalto = false; // Controla si está en salto
    }


    Suelo.prototype.imagen = new Image();
    Suelo.prototype.imagen.src = "./assets/img/img_base.png";
    Suelo.prototype.audio = new Audio("./assets/sound/audio point.ogg");

    // Definir las imágenes del pájaro
    Pajaro.prototype.imagenSalto = new Image();
    Pajaro.prototype.imagenSalto.src = "./assets/img/img_yellowbird-downflap.png";

    Pajaro.prototype.imagenCaida = new Image();
    Pajaro.prototype.imagenCaida.src = "./assets/img/img_yellowbird-upflap.png";

    Pajaro.prototype.imagenIntermedia = new Image();
    Pajaro.prototype.imagenIntermedia.src = "./assets/img/img_yellowbird-midflap.png";
    // Inicializar la imagen actual del pájaro
    Pajaro.prototype.imagen = Pajaro.prototype.imagenIntermedia;

    //  Pajaro.prototype.audio = new Audio("./assets/sound/audio point.ogg");


    // Método para dibujar el pájaro
    Pajaro.prototype.dibujar = function () {
        ctx.drawImage(this.imagen, this.x - this.r, this.y - this.r, this.r * 2, this.r * 2);

    };


    // Método para actualizar la posición del pájaro
    Pajaro.prototype.actualizar = function () {
        if (this.enSalto) {
            this.y -= this.salto; // Subir al saltar
        } else {
            this.y += gravedad; // Aplicar gravedad constante
        }

        // Limitar al borde superior del canvas
        if (this.y - this.r < 0) {
            this.y = this.r; // Ajustar la posición al borde superior
        }
        // Limitar al borde inferior (suelo)
        if (this.y + this.r >= suelo.y) {
            this.y = suelo.y - this.r; // Ajustar la posición al borde
            animacionActiva = false;  // Detener la animación
            console.log("Colisión con el suelo");
        }

    };


    // Clase Suelo
    function Suelo() {
        this.ancho = 1280;
        this.alto = 140;
        this.x = 0;
        this.y = 720 - this.alto;
    }

    Suelo.prototype.dibujar = function () {
        ctx.fillStyle = "#F5F5DC";
        ctx.drawImage(this.imagen, this.x, this.y, this.ancho, this.alto);
    };

    // Crear una instancia de Suelo y Pajaro
    const suelo = new Suelo();
    const pajaro = new Pajaro();

    // Constante para el límite de borrado
    const LIMITEBORRADO = -60;

    // Array para almacenar los obstáculos
    let columnas = [];
    // Función para generar un nuevo obstáculo
    function generarObstaculo(anchoCanvas, altoCanvas) {
        columnas.push(new Obstaculo(anchoCanvas, altoCanvas));
    }

    // Inicializar el primer obstáculo
    generarObstaculo(canvas.width, canvas.height);

    // Función para actualizar y dibujar los obstáculos
    function actualizarObstaculos(ctx, anchoCanvas, altoCanvas, velocidad) {
        // Actualizar y dibujar cada obstáculo
        for (let i = 0; i < columnas.length; i++) {
            columnas[i].actualizar(velocidad);
            columnas[i].dibujar(ctx);
        }
        // Log las coordenadas de la primera columna
        if (columnas.length > 0) {
            console.log(`Coordenadas de la columna[0]: x=${columnas[0].posicionX}, y=${columnas[0].posicionY}`);
            console.log(marcador);
        }


        // Eliminar obstáculos que han pasado el límite de borrado
        columnas = columnas.filter(obstaculo => obstaculo.posicionX > LIMITEBORRADO);

        // Generar un nuevo obstáculo si la primera columna ha pasado cierta posición
        if (columnas.length > 0 && columnas[0].posicionX < 500 && !columnas[0].generadoNuevo) {
            generarObstaculo(anchoCanvas, altoCanvas);
            
            columnas[0].generadoNuevo = true; // Marcar que se ha generado un nuevo obstáculo
        }
        if ( columnas[0].posicionX < 220 && columnas[0].posicionX > 219) {
            marcador = marcador+1;
        }
    }



    // Método para dibujar los elementos
    function dibujar() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
        ctx.drawImage(fondo, 0, 0, canvas.width, canvas.height - 140); // Dibujar el fondo
        suelo.dibujar();  // Dibujar el suelo
        pajaro.dibujar(); // Dibujar el pájaro
        actualizarObstaculos(ctx, canvas.width, canvas.height, 3.5); //Actualizar y dibujar los obstáculos
    }

    // Detectar eventos de teclado
    document.addEventListener("keydown", activaMovimiento, false);
    document.addEventListener("keyup", desactivaMovimiento, false);

    function activaMovimiento(evt) {
        if ((evt.keyCode === 38 || evt.keyCode === 32) && !pajaro.enSalto) { // Flecha arriba o espacio
            if (pajaro.y - pajaro.r > 0) { // Evitar salir del techo
                pajaro.enSalto = true; // Iniciar el salto
                pajaro.imagen = pajaro.imagenSalto; // Cambiar a la imagen de salto
            }
        }
    }


    function desactivaMovimiento(evt) {
        if ((evt.keyCode === 38 || evt.keyCode === 32)) { // Flecha arriba o espacio
            pajaro.imagen = pajaro.imagenIntermedia; // Cambiar a la imagen intermedia
            pajaro.enSalto = false; // Detener el salto
            pajaro.imagen = pajaro.imagenCaida; // Cambiar a la imagen de caída
        }
    }


    // Iniciar la animación
    document.getElementById('botonInicio').addEventListener('click', function () {
        animacionActiva = true;
        const intervalo = setInterval(function () {
            if (animacionActiva) {
                pajaro.actualizar(); // Actualizar la posición del pájaro
                dibujar();           // Dibujar los elementos
            } else {
                clearInterval(intervalo); // Detener la animación al chocar con el suelo
            }
        }, 1000 / 120); // 60 FPS
    });
};
