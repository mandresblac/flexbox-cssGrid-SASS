const { src, dest, watch, series, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

function css(done) {
    // Compilar sass
    // Pasos: 1 - Identificar archivo
    src("src/scss/app.scss")
        // Pasos: 2 - Compilar archivo
        .pipe( sass() )
        .pipe( postcss([ autoprefixer() ]) )
        // Pasos: 3 - Guardar archivo u hoja de estilos .css compilada
        .pipe( dest("build/css") );
    
    done();
}

function dev() {
    watch("src/scss/app.scss", css); // watch toma 2 valores, 1- a que le tiene que poner atención, 2- que funcion va a ejecutar.
}

exports.css = css;
exports.dev = dev;

// series - Se inicia una tarea y hasta que finaliza inicia la siguiente.
// parallel - Todas inician al mismo tiempo.
exports.default = series(css, dev);
