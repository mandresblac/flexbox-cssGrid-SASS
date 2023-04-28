const { src, dest, watch, series, parallel } = require("gulp");

// CSS y SASS
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

// Imagenes
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");

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

function imagenes() {
    return src("src/img/**/*")
        .pipe(imagemin({ optimizationLevel: 3 }))
        .pipe(dest('build/img'))
        
}

function versionWebp() {
    const opciones = {
        quality: 50
    }
    return src("src/img/**/*.{png,jpg}")
        .pipe(webp(opciones))
        .pipe(dest("build/img"))
}

function versionAvif() {
    const opciones = {
        quality: 50
    }
    return src("src/img/**/*.{png,jpg}")
        .pipe(avif(opciones))
        .pipe(dest("build/img"))
}

function dev() {
    watch("src/scss/**/*.scss", css); // watch toma 2 valores, 1- a que le tiene que poner atención, 2- que funcion va a ejecutar.
    watch("src/img/**/*", imagenes);
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;

// series - Se inicia una tarea y hasta que finaliza inicia la siguiente.
// parallel - Todas inician al mismo tiempo.
exports.default = series(imagenes, versionWebp, versionAvif, css, dev);
