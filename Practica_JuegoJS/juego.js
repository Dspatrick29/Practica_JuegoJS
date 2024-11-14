window.onload = function () {
    let canvas, ctx;
    var suelo;
    var yArriba = false;
    var animacionActiva = true;
    canvas = document.getElementById("miCanvas");


    // Constructor de Pajaro
    function Pajaro() {
        this.r = 40;
        this.resetearVariables();
    }
    //Metodo para inicializar la posicion del pajaro
    Pajaro.prototype.resetearVariables = function () {
        this.x = 250;
        this.y = 150;
        this.velocidad = 0;
        this.gravedad = 0.5;
        this.salto = -10;
    };
    //Metodo para dibujar el pajaro
    Pajaro.prototype.dibujar = function () {
        ctx.fillStyle = "orange";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
    };
    //Metodo para actualizar la posicion del pajaro
    Pajaro.prototype.actualizar = function () {
        if (yArriba) {
            pajaro.saltar();
        } else {
            pajaro.y += 2.5;
        }
         // Limitar al borde inferior (canvas.height - suelo.y - this.r)
    // Limitar al borde inferior (canvas.height - suelo.y - this.r)
    if (this.y + this.r >=  suelo.y) {
        this.y =  suelo.y - this.r;
        this.velY = 0; // Detener la velocidad de caída
        animacionActiva = false;
    console.log("colision");
    }
    };
    Pajaro.prototype.saltar = function () {
        this.y += this.salto;
    };


    suelo = new Suelo();
    const pajaro = new Pajaro();
    function dibujar() {


        ctx = canvas.getContext("2d");
        suelo.dibujar();
        pajaro.dibujar();

    }
    dibujar();

    function Suelo() {
        this.ancho = 1280;
        this.alto = 140;
        this.x = 0;
        this.y = 720 - this.alto;
        this.dibujar = function () {
            ctx.fillStyle = "#F5F5DC"
            ctx.fillRect(this.x, this.y, this.ancho, this.alto)
        }
    }


    document.addEventListener("keydown", activaMovimiento, false);
    document.addEventListener("keyup", desactivaMovimiento, false);



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

    function desactivaMovimiento(evt) {
        switch (evt.keyCode) {
            case 38:
                yArriba = false;
                break;
            case 32:
                yArriba = false;
                break;
        }
    }


    setInterval(function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dibujar();
        if (animacionActiva) {
         
        pajaro.actualizar();   
        }
    }, 1000 / 60);













}