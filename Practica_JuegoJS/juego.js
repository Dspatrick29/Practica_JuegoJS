
window.onload = function () {
 
    var animacionActiva = false;
    var juegoIniciado = false;
    var vidas = 3; // Contador de vidas

    var fondo = new Image();
    fondo.src = "./assets/img/img_background-day.png";

    const canvas = document.getElementById('miCanvas');
    const ctx = canvas.getContext('2d');


    // Array para almacenar los obstáculos
    let columnas = [];
    
    /* El valor de gravedad, velocidad y salto han sido puestos usando Chrome
        actualizar valores para otros navegadores
    */

    let gravedad = 1; // Gravedad del juego
    let velocidadObstaculo = 1.5; // Velocidad de los obstáculos
    let salto = 2.5; // Cantidad de posiciones que sube al saltar


    let marcador = 0;
    // Constructor de Pajaro
    function Pajaro() {
        this.r = 30;
        this.x = 250;
        this.y = 150; // Posición inicial del pájaro
        this.salto = salto; // Cantidad de posiciones que sube al saltar
        this.enSalto = false; // Controla si está en salto
    }

    Suelo.prototype.imagen = new Image();
    Suelo.prototype.imagen.src = "./assets/img/img_base.png";

    // Incluir el archivo de sonidos
    const sonidos = new Sonidos();

    // Incluir el archivo de colisiones

    // Definir las imágenes del pájaro
    Pajaro.prototype.imagenSalto = new Image();
    Pajaro.prototype.imagenSalto.src = "./assets/img/img_yellowbird-downflap.png";

    Pajaro.prototype.imagenCaida = new Image();
    Pajaro.prototype.imagenCaida.src = "./assets/img/img_yellowbird-upflap.png";

    Pajaro.prototype.imagenIntermedia = new Image();
    Pajaro.prototype.imagenIntermedia.src = "./assets/img/img_yellowbird-midflap.png";
    // Inicializar la imagen actual del pájaro
    Pajaro.prototype.imagen = Pajaro.prototype.imagenIntermedia;

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
            animacionActiva = false;  
            sonidos.reproducirColision();
            console.log("Colisión con el suelo");
            perderVida();
            // Reiniciar la posición del pájaro para que no se quede en el suelo
            this.y = 250; 
            this.x = 250;
        }

        // Verificar colisiones con los obstáculos
        for (let i = 0; i < columnas.length; i++) {
            if (colisiona(this, columnas[i])) {
                animacionActiva = false;  
                sonidos.reproducirColision(); 
                console.log("Colisión con un obstáculo");
                perderVida();
                break; // Salir del bucle una vez que se detecta una colisión
                // Sin el break, se seguirían detectando colisiones con otros obstáculos
            }
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
          //  console.log(`Coordenadas de la columna[0]: x=${columnas[0].posicionX}, y=${columnas[0].posicionY}`);
            console.log(marcador);
        }

        // Eliminar obstáculos que han pasado el límite de borrado
        columnas = columnas.filter(obstaculo => obstaculo.posicionX > LIMITEBORRADO);

        // Generar un nuevo obstáculo si la primera columna ha pasado cierta posición
        if (columnas.length > 0 && columnas[0].posicionX < 500 && !columnas[0].generadoNuevo) {
            generarObstaculo(anchoCanvas, altoCanvas);
            columnas[0].generadoNuevo = true; // Marcar que se ha generado un nuevo obstáculo
        }
        if (columnas[0].posicionX < 220 && columnas[0].posicionX > 219 - velocidad) {
            marcador = marcador + 1;
            sonidos.reproducirPunto(); // Reproducir sonido de punto
            document.getElementById('marcador').innerText = marcador;
        }
    }

    // Método para dibujar los elementos
    function dibujar() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
        ctx.drawImage(fondo, 0, 0, canvas.width, canvas.height - 140); // Dibujar el fondo
        suelo.dibujar();  // Dibujar el suelo
        pajaro.dibujar(); // Dibujar el pájaro
        actualizarObstaculos(ctx, canvas.width, canvas.height, velocidadObstaculo); //Actualizar y dibujar los obstáculos
    }

    // Detectar eventos de teclado
    document.addEventListener("keydown", activaMovimiento, false);
    document.addEventListener("keyup", desactivaMovimiento, false);

    function activaMovimiento(evt) {
        if (juegoIniciado && (evt.keyCode === 38 || evt.keyCode === 32) && !pajaro.enSalto) { // Flecha arriba o espacio
            if (pajaro.y - pajaro.r > 0) { // Evitar salir del techo
                pajaro.enSalto = true; // Iniciar el salto
                pajaro.imagen = pajaro.imagenSalto; // Cambiar a la imagen de salto
                sonidos.reproducirSalto(); // Reproducir sonido de salto
            }
        }
    }

    function desactivaMovimiento(evt) {
        if (juegoIniciado && (evt.keyCode === 38 || evt.keyCode === 32)) { // Flecha arriba o espacio
            pajaro.imagen = pajaro.imagenIntermedia; // Cambiar a la imagen intermedia
            pajaro.enSalto = false; // Detener el salto
            pajaro.imagen = pajaro.imagenCaida; // Cambiar a la imagen de caída
        }
    }

    // Función para perder una vida
    function perderVida() {
        vidas--;
        if (vidas > 0) {
            document.getElementById('botonInicio').disabled = false; // Habilitar el botón de inicio
            juegoIniciado = false; // Marcar que el juego ha terminado
            alert(`Te quedan ${vidas} vidas`);
            document.getElementById('vidas').innerText = vidas;
            eliminarObstaculos(); // Eliminar todos los obstáculos
            generarObstaculo(canvas.width, canvas.height); // Generar un nuevo obstáculo
        } else {
            alert(`Juego terminado: Puntuación total: ${marcador}`);
            guardarRecord(marcador); // Guardar el record
            document.getElementById('vidas').innerText = 3;
            document.getElementById('marcador').innerText = 0;
            resetJuego();
        }
    }

    // Función para eliminar todos los obstáculos
    function eliminarObstaculos() {
        columnas = [];
    }

    // Función para reiniciar el juego
    function resetJuego() {
        vidas = 3;
        marcador = 0;
        velocidadObstaculo = 1.5;
        salto = 2.5;
        gravedad = 1;
        columnas = [];
        generarObstaculo(canvas.width, canvas.height);
        document.getElementById('botonInicio').disabled = false; // Habilitar el botón de inicio
        juegoIniciado = false; // Marcar que el juego ha terminado
        mostrarRecords(); // Mostrar los records
    }

    // Iniciar la animación
    document.getElementById('botonInicio').addEventListener('click', function () {
        if (!juegoIniciado) {
            juegoIniciado = true;
            animacionActiva = true;
            this.disabled = true; // Deshabilitar el botón de inicio
            const intervalo = setInterval(function () {
                if (animacionActiva) {
                    pajaro.actualizar(); // Actualizar la posición del pájaro
                    dibujar();           // Dibujar los elementos
                } else {
                    clearInterval(intervalo); // Detener la animación al chocar con el suelo
                }
            }, 1000 / 120); // 60 FPS

            // Incrementar la velocidad de los obstáculos cada 5 segundos
            const incrementoVelocidad = setInterval(function () {
                if (animacionActiva) {
                    velocidadObstaculo += 0.5; // Incrementar la velocidad
                    salto += 0.5; // Incrementar la cantidad de salto
                    if (gravedad < 5) {
                        gravedad += 0.5; // Incrementar la gravedad
                    }
                } else {
                    clearInterval(incrementoVelocidad); 
                }
            }, 5000); // Cada 5 segundos
        }
    });

    // Función para guardar el record en el almacenamiento local
    function guardarRecord(marcador) {
        let nombre = prompt("Introduce tu nombre:");
        let records = JSON.parse(localStorage.getItem('records')) || []; // Obtener los records del almacenamiento local
        records.push(`${nombre} : ${marcador}`); // Añadir el nuevo record
        records.sort((a, b) => {
            let scoreA = parseInt(a.split(' : ')[1]); // Uso el split para separar el nombre del score
            let scoreB = parseInt(b.split(' : ')[1]); 
            return scoreB - scoreA;
        }); // Ordenar de mayor a menor
        records = records.slice(0, 5); // Limitar a 5 records
        localStorage.setItem('records', JSON.stringify(records));
    }

    // Función para mostrar los records
    function mostrarRecords() {
        const listaRecords = document.getElementById('listaRecords');
        listaRecords.innerHTML = '';
        let records = JSON.parse(localStorage.getItem('records')) || [];
        records.forEach(record => {
            const li = document.createElement('li');
            li.textContent = record;
            listaRecords.appendChild(li);
        });
    }

    // Mostrar los records al cargar la página
    mostrarRecords();
};
