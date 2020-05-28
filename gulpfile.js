const VIEWS = "./dist/";
const FILES = "./dist/files";
const SCSS = "./src/scss/**";
const JS = "./src/js/**";
const PUG = "./src/views/**";
const gulp     = require("gulp"),
  scss         = require("gulp-sass"),
  browserSync  = require("browser-sync").create(),
  minify       = require("gulp-minify"),
  rollup       = require("gulp-better-rollup"),
  babel        = require("rollup-plugin-babel"),
  resolve      = require("rollup-plugin-node-resolve"),
  commonjs     = require("rollup-plugin-commonjs"),
  concat       = require("gulp-concat"),
  pug          = require("gulp-pug"),
  clean        = require("gulp-clean");


gulp.task("scss" , _ => (
  gulp.src(SCSS)
  .pipe(scss())
  .pipe(gulp.dest(FILES))
  .pipe(browserSync.reload({
    stream: true
  }))
))

gulp.task("js" , _ => (
  gulp.src(JS)
  .pipe(rollup({ plugins: [babel(), resolve(), commonjs()] }, 'umd'))
  .pipe(concat("index.js"))
  .pipe(gulp.dest(FILES))
  .pipe(browserSync.reload({
    stream: true
  }))
))

gulp.task("pug" , _ => (
  gulp.src(PUG)
  .pipe(pug({
    doctype: "html",
    pretty: 0
  }))
  .pipe(gulp.dest(VIEWS))
  .pipe(browserSync.reload({
    stream: true
  }))
))

gulp.task("browser" , _ => (
  browserSync.init({
    server: {
      baseDir : './dist'
    }
  })
))

gulp.task("watch" , _ => {
  gulp.watch(SCSS , gulp.series("scss"))
  gulp.watch(JS , gulp.series("js"))
  gulp.watch(PUG , gulp.series("pug"))
})

gulp.task("remove" , _ => (
  gulp.src("./dist")
  .pipe(clean())
))

gulp.task("default" , gulp.series("pug" , "scss" , "js"))
gulp.task("dev" , gulp.parallel("default", "watch" , "browser"))