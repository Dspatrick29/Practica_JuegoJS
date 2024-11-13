window.onload = function () {
    let canvas, ctx;
    var suelo;

    canvas = document.getElementById("miCanvas");

    suelo = new Suelo();

    function dibujar() {


        ctx = canvas.getContext("2d");
        suelo.dibujar();
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

}