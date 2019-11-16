const gulp = require("gulp");
const sass = require("gulp-sass");
const minifyCss = require("gulp-minify-css");
const rename = require("gulp-rename");
const connect = require("gulp-connect");

gulp.task("copy-html", function(){
    return gulp.src("*.html")
    .pipe(gulp.dest("dist/"))
    .pipe(connect.reload());
})

gulp.task("scripts", function(){
    return gulp.src(["*.js", "!gulpfile.js"])
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload());
})

gulp.task("sass", function(){
    return gulp.src("stylesheet/index.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCss())
    .pipe(rename("index.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})



gulp.task("data", function(){
    return gulp.src(["*.json", "!package.json"])
    .pipe(gulp.dest("dist/json"))
    .pipe(connect.reload());
})

gulp.task("images", function(){
    return gulp.src("images/*.{png,jpg,gif}")
    .pipe(gulp.dest("dist/img"))
    .pipe(connect.reload());
})


gulp.task("build", ["copy-html", "scripts", "sass", "data", "images"], function(){
    console.log("执行成功");
})

gulp.task("watch", function(){
    gulp.watch("*.html", ["copy-html"]);
    gulp.watch(["*.js", "!gulpfile.js"], ["scripts"]);
    gulp.watch("stylesheet/index.scss", ["sass"]);
    gulp.watch(["*.json", "!package.json"], ["data"]);
    gulp.watch("images/*.{png,jpg}", ["images"]);

})

gulp.task("server", function(){
    connect.server({
        root : "dist",
        port : 1234,
        livereload : true
    })
})

gulp.task("default", ["watch", "server"])
